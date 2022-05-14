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
    public class FieldController : ControllerBase
    {
        private readonly IFieldService service;

        public FieldController(IFieldService service)
        {
            this.service = service;
        }
        public async Task<IActionResult> AddFieldAsync(FieldVM field)
        {
            return Ok(await service.AddFieldAsync(field));
        }
        public async Task<IActionResult> EditFieldAsync(FieldVM field)
        {
            return Ok(await service.EditFieldAsync(field));
        }
        public async Task<IActionResult> DeleteFieldAsync(int id)
        {
            return Ok(await service.DeleteFieldAsync(id));

        }
        public async Task<IActionResult> GetByIdFieldAsync(int id)
        {
            return Ok(await service.GetByIdFieldAsync(id));

        }
        public async Task<IActionResult> GetAllFieldAsync()
        {
            return Ok(await service.GetAllFieldAsync());

        }

    }
}
