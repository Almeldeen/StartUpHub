using BLL.Services.Field;
using DAL.ViewModels;
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
    public class FieldsController : ControllerBase
    {
        private readonly IFieldService service;

        public FieldsController(IFieldService service)
        {
            this.service = service;
        }
        [HttpPost("AddField")]
        public async Task<IActionResult> AddFieldAsync([FromBody] FieldVM field)
        {
            return Ok(await service.AddFieldAsync(field));
        }
        [HttpPut("EditField")]

        public async Task<IActionResult> EditFieldAsync([FromBody] FieldVM field)
        {
            return Ok(await service.EditFieldAsync(field));
        }
        [HttpDelete("DeleteField")]

        public async Task<IActionResult> DeleteFieldAsync(int id)
        {
            return Ok(await service.DeleteFieldAsync(id));

        }
        [HttpGet("GetByIdField")]
        public async Task<IActionResult> GetByIdFieldAsync(int id)
        {
            return Ok(await service.GetByIdFieldAsync(id));

        }
        [HttpGet("GetAllField")]

        public async Task<IActionResult> GetAllFieldAsync()
        {
            return Ok(await service.GetAllFieldAsync());

        }

    }
}
