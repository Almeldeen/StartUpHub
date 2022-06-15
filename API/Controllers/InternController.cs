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
        private readonly IInternService _internService;

        public InternController(IInternService internService)
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
        [HttpGet("GetApplaiedJops")]
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
        [HttpGet("GetApllaiedJopById")]
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
