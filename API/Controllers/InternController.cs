using BLL.Helper;
using API.HupHelper.SendNotifay;
using BLL.Services.Intern;
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
    public class InternController : ControllerBase
    {
        private readonly IInternService _internService;
        private readonly ISendNotification sendNotification;

        public InternController(IInternService internService,ISendNotification sendNotification)
        {
            _internService = internService;
            this.sendNotification = sendNotification;
        }
        [Authorize(Roles = "INTERN,COMPANY")]
        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile(string userId)
        {

            var result = await _internService.GetProfile(userId);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }

        }
        [Authorize(Roles = "INTERN")]

        [HttpPost("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateInternVM updateIntern)
        {
            try
            {
                var result = await _internService.UpdateProfile(updateIntern);
                if (result)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
          
            

        }
        [Authorize(Roles = "INTERN")]

        [HttpPost("applyjop")]
        public async Task<IActionResult> AddInternApplaied(InternApplaied_VM internApplaied)
        {

            var result = await _internService.AddInternApplaied(internApplaied);
            if (result != null)
            {

                
                await sendNotification.SendNotifcation(internApplaied.userId, internApplaied.InternShipId, null,"APPLAYJOB");
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "INTERN")]

        [HttpGet("getapplaiedjops")]
        public async Task<IActionResult> GetApplaiedJops()
        {

            var result = await _internService.GetApplaiedJops();
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "INTERN,COMPANY")]
        [HttpGet("getapllaiedjopbyid")]
        public async Task<IActionResult> GetApllaiedJopById(int InternShipId)
        {

            var result = await _internService.GetApllaiedJopById(InternShipId);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "INTERN,COMPANY")]
        [HttpPost("ChangePhoto")]
        public async Task<IActionResult> ChangePhoto([FromForm]IFormFile image ,[FromForm] string type)
        {
            var result = await _internService.ChangePhoto(image , type);
            if (result!=null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [Authorize(Roles = "INTERN")]

        [HttpGet("simple-stats")]
        public async Task<IActionResult> SimpleStats()
        {
            var result = await _internService.SimpleStats();
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }



        [Authorize(Roles = "INTERN")]

        [HttpPost("cancel-request")]
        public async Task<IActionResult> CancelRequest(int InternShipId)
        {
            var result = await _internService.CancelRequest(InternShipId);
            if (result)
            {
                return Ok(result);
            }
            return BadRequest(result);

        }
        [Authorize(Roles = "INTERN")]
        [HttpGet("SearchJobs")]
        public async Task<IActionResult> SearchJobs(int? fieldid, int page, int pageSize)
        {
            var result = await _internService.SearchJobs(fieldid, page, pageSize);
            if (result!=null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
