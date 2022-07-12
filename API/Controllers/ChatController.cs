using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Helper.SendNotifay;
using BLL.Services.ChatServices;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly IChatService services;
        private readonly ISendNotification sendNotification;

        public ChatController(IChatService services, ISendNotification sendNotification)
        {
            this.services = services;
            this.sendNotification = sendNotification;
        }
        
        [HttpGet("GetChats")]
        public async Task<IActionResult> GetChat(int page, int pageSize)
        {
            var res= await services.GetChat(page, pageSize);
            if (res!=null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
        [HttpGet("GetMsgsChat")]
        public async Task<IActionResult> GetMsgsChat(int chatId, int page, int pageSize)
        {
            var res = await services.GetMsgsChat(chatId, page, pageSize);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);

        }
        [HttpPost("SendMsg")]
        public async Task<IActionResult> SendMsg(MessageVM messege)
        {

            var res = await services.SendMsg(messege);
            if (res != null)
            {
               await sendNotification.SendMsg(messege);
                return Ok(res);
            }
            return BadRequest(res);
        }
    }
}
