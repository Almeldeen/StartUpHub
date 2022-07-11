using BLL.Hups;
using BLL.Services.Followers;
using DAL.Data;
using DAL.Reproisitry.NotificationRepos;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowersController : ControllerBase
    {
        private readonly IFollowersService _followersService;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly INotificationRepo notificationRepo;
        private readonly IHubContext<RealtimeHub> hubContext;

        public FollowersController(IFollowersService followersService,IHttpContextAccessor httpContextAccessor,UserManager<ApplicationUser> userManager,INotificationRepo notificationRepo,
            IHubContext<RealtimeHub> hubContext)
        {
            _followersService = followersService;
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
            this.notificationRepo = notificationRepo;
            this.hubContext = hubContext;
        }
        [HttpGet("get-followers")]
        public async Task<IActionResult> Followers(int pagenum, int pagesize)
        {
            var result = await _followersService.Followers(pagenum,pagesize);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("get-following")]
        public async Task<IActionResult> Following(int pagenum, int pagesize)
        {
            var result = await _followersService.Following(pagenum, pagesize);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("get-people-to-follow")]
        public async Task<IActionResult> GetPeopleToFollow(int pagenum, int pagesize)
        {
            try
            {
                var data = await _followersService.GetPeopleToFollow(pagenum, pagesize);
                if (data != null)
                {
                    return Ok(data);
                }
                return BadRequest(data);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SendFollow")]
        public async Task<IActionResult> SendFollow(string userId)
        {
            var res= await _followersService.SendFollow(userId);
            if (res)
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user =await userManager.FindByNameAsync(username);
                NotificationVM notification = new NotificationVM()
                {
                    Type = "FOLLOW",
                    SenderId = user.Id,
                    ReciverId = userId,
                    UserName = user.FullName,
                    UserImg = user.ProfileImage,
                    Read = false,
                    Content = $"{user.FullName} followed you"
                };
                await notificationRepo.AddNotification(notification);
                await hubContext.Clients.User(userId).SendAsync("GetNotifcation", notification);
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("FollowBack")]
        public async Task<IActionResult> FollowBack(string userId)
        {
            var res = await _followersService.FollowBack(userId);
            if (res)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("UnFollow")]
        public async Task<IActionResult> UnFollow(string userId)
        {
            var res = await _followersService.UnFollow(userId);
            if (res)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
