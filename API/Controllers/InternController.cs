using BLL.Services.Intern;
using DAL.Data;
using DAL.ViewModels;
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

        public InternController(InternService internService)
        {
            _internService = internService;
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
        [HttpGet("applyjop")]
        public async Task<IActionResult> AddInternApplaied(InternApplaied_VM internApplaied)
        {

            var result = await _internService.AddInternApplaied(internApplaied);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("applyjop")]
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
        [HttpGet("applyjop")]
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
    }
}
