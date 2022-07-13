using API.HupHelper.SendNotifay;
using BLL.Hups;
using BLL.Services.Followers;
using DAL.Data;
using DAL.Reproisitry.NotificationRepos;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class FollowersController : ControllerBase
    {
        private readonly IFollowersService _followersService;
        private readonly ISendNotification sendNotification;


        public FollowersController(IFollowersService followersService, ISendNotification sendNotification)
        {
            _followersService = followersService;
            this.sendNotification = sendNotification;
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
                await sendNotification.SendNotifcation(userId, null, null,"FOLLOW");
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
