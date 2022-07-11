
using BLL.Services.JopServicess;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
    public class CompanyController : ControllerBase
    {
        private readonly IJopServices services;

        public CompanyController(IJopServices services)
        {
            this.services = services;
        }
        [HttpPost("add-job")]
        public async Task<IActionResult> AddJop(JopVM jop)
        {
            try
            {
                var res =await services.AddJop(jop);
                if (res!=null)
                {
                    return Ok(res);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete-job")]
        public async Task<IActionResult> DeleteJop(int id)
        {
            try
            {
                var res = await services.DeleteJop(id);
                if (res != 0)
                {
                    return Ok(res);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-jobs")]
        public async Task<IActionResult> GetAllJop()
        {
            try
            {
                var res = await services.GetAllJop();
                if (res != null)
                {
                    return Ok(res);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetJopDetails")]
        public async Task<IActionResult> GetJopDetails(int jopId)
        {
            try
            {
                var res = await services.GetJopDetails(jopId);
                if (res != null)
                {
                    return Ok(res);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
