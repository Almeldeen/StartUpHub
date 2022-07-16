using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.HupHelper.SendNotifay;
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
        public async Task<IActionResult> SendMsg([FromBody]MessageVM messege)
        {

            var res = await services.SendMsg(messege);
            if (res != null)
            {
               await sendNotification.SendMsg(res);
                return Ok(res);
            }
            return BadRequest(res);
        }
        [HttpGet("UnReadMsgCount")]
        public async Task<IActionResult> UnReadMsgCount()
        {
            var res = await services.UnReadMsgCount();
            if (res >= 0)
            {
                return Ok(res);
            }
            return BadRequest(res);

        }
        [HttpPost("ReadMsg")]
        public async Task<IActionResult> ReadMsg(int chatId)
        {
            var res = await services.ReadMsg(chatId);
            if (res)
            {
                return Ok(res);
            }
            return BadRequest(res);

        }
        [HttpGet("GetMsgsChatByUserId")]
        public async Task<IActionResult> GetMsgsChatByUserId(string userId, int page, int pageSize)
        {
            var res = await services.GetMsgsChatByUserId(userId, page, pageSize);
            if (res>0)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
    }
}
