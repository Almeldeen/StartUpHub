using BLL.Services.Intern;
using DAL.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InternController : ControllerBase
    {
        private readonly InternService _internService;
        private readonly UserManager<ApplicationUser> userManager;

        public InternController(InternService internService, UserManager<ApplicationUser> userManager)
        {
            _internService = internService;
            this.userManager = userManager;
        }

        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile()
        {

            var result = await _internService.GetProfile();
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
