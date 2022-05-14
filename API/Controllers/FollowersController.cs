using BLL.Services.Followers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowersController : ControllerBase
    {
        private readonly IFollowersService _followersService;
        public FollowersController(IFollowersService followersService)
        {
            _followersService = followersService;
        }
        [HttpGet("get-followers")]
        public async Task<IActionResult> Followers()
        {
            var result = await _followersService.Followers();
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
        public async Task<IActionResult> Following()
        {
            var result = await _followersService.Following();
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
