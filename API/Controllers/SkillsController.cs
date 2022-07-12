using BLL.Services.Skills;
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
    public class SkillsController : ControllerBase
    {
        private readonly ISkillsService service;

        public SkillsController(ISkillsService service)
        {
            this.service = service;
        }
        [HttpPost("AddSkills")]
        public async Task<IActionResult> AddSkillsAsync([FromBody] SkillsVM Skills)
        {
            return Ok(await service.AddSkillsAsync(Skills));
        }
        [HttpPut("EditSkills")]

        public async Task<IActionResult> EditSkillsAsync([FromBody] SkillsVM Skills)
        {
            return Ok(await service.EditSkillsAsync(Skills));
        }
        [HttpDelete("DeleteSkill")]

        public async Task<IActionResult> DeleteSkillsAsync(int id)
        {
            return Ok(await service.DeleteSkillsAsync(id));

        }
        [HttpGet("GetByIdSkill")]
        public async Task<IActionResult> GetByIdSkillsAsync(int id)
        {
            return Ok(await service.GetByIdSkillsAsync(id));

        }
        [HttpGet("GetAllSkills")]

        public async Task<IActionResult> GetAllSkillsAsync(int? fieldId,int page,int pageSize)
        {
            return Ok(await service.GetAllSkillsAsync(fieldId, page, pageSize));

        }
    }
}
