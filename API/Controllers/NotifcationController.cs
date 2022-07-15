using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Services.NotificationServicess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotifcationController : ControllerBase
    {
        private readonly INotificationServices services;

        public NotifcationController(INotificationServices services)
        {
            this.services = services;
        }
        [HttpGet("GetNotifications")]
        public async Task<IActionResult> GetAllNotifications(int pagenum, int pagesize)
        {
            var res = await services.GetAllNotifications(pagenum, pagesize);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
        [HttpPost("ReadNotification")]
        public async Task<IActionResult> ReadNotifications(int notificationId)
        {
            var res = await services.ReadNotifications(notificationId);
            if (res)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
        [HttpGet("UnReadNotificationCount")]
        public async Task<IActionResult> UnReadNotificationCount()
        {
            var res = await services.UnReadNotificationCount();
            if (res>0)
            {
                return Ok(res);
            }
            return BadRequest(res);

        }

    }

}
