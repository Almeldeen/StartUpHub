
using API.HupHelper.SendNotifay;
using BLL.Services.JopServicess;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly IJopServices services;
        private readonly ISendNotification sendNotification;
      

        public CompanyController(IJopServices services, ISendNotification sendNotification
           )
        {
            this.services = services;
            this.sendNotification = sendNotification;
          
        }
        [Authorize(Roles = "COMPANY")]
        [HttpPost("add-job")]
        public async Task<IActionResult> AddJop(JopVM jop)
        {
            try
            {
                var res =await services.AddJop(jop);
                if (res!=null)
                {
                 
                    await sendNotification.SendNewJopNotifcation(jop.id, jop.fieldId,"NEWJOB");
                    return Ok(res);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "COMPANY")]
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
        [Authorize(Roles = "INTERN,COMPANY")]
        [HttpGet("get-jobs")]
        public async Task<IActionResult> GetAllJop(string companyId, int page, int pageSize)
        {
            try
            {
                var res = await services.GetAllJop(companyId,page, pageSize);
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
        [Authorize(Roles = "INTERN,COMPANY")]
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
        [Authorize(Roles = "COMPANY")]
        [HttpPost("change-state")]
        public async Task<IActionResult> ChangeState(int InternShipId, string InternId, string State)
        {
            var result = await services.ChangeState(InternShipId, InternId, State);
            if (result)
            {
                await sendNotification.SendNotifcation(InternId, InternShipId, null, "CHANGSTATE");
                return Ok(result);
            }
            return BadRequest(result);
        }
        [Authorize(Roles = "COMPANY")]
        [HttpGet("GetJobApplicants")]
        public async Task<IActionResult> GetAllAppliedIntern(int InternShipId, int page, int pageSize)
        {
            var result = await services.GetAllAppliedIntern(InternShipId, page, pageSize);
            if (result!=null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [Authorize(Roles = "COMPANY")]
        [HttpGet("simple-stats")]
        public async Task<IActionResult> SimpleStats()
        {
            var result = await services.SimpleStats();
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [Authorize(Roles = "COMPANY")]
        [HttpGet("GetApllaiedJopById")]
        public async Task<IActionResult> GetApllaiedJopById(int internShipId, string internId)
        {
            var result = await services.GetApllaiedJopById(internShipId, internId);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        [Authorize(Roles = "INTERN,COMPANY")]
        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile(string userId)
        {

            var result = await services.GetProfile(userId);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }

        }
        [Authorize(Roles = "COMPANY")]

        [HttpPost("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateInternVM updateIntern)
        {
            try
            {
                var result = await services.UpdateProfile(updateIntern);
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
    }
}
