using BLL.Services.Post;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class PostsController : ControllerBase
    {
        private readonly IPostService service;

        public PostsController(IPostService service)
        {
            this.service = service;
        }
        [HttpPost("AddPost")]
        public async Task<IActionResult> AddPostAsync([FromForm] PostVM post)
        {
            var res = await service.AddPostAsync(post);
            return Ok(res);
                
        }

        //public async Task<IActionResult> EditPostAsync([FromForm] PostVM post)
        //{

        //}
        //public async Task<IActionResult> DeletePostAsync([FromForm] int id)
        //{

        //}
        //public async Task<IActionResult> GetByIdPostAsync([FromForm] int id)
        //{

        //}
        [HttpGet("get-timeline-articles")]
        public async Task<IActionResult> GetAllPostAsync(int page, int pageSize)
        {
            try
            {
                var data = await service.GetAllPostAsync(page, pageSize);
                if (data!=null)
                {
                    return Ok(data);
                }
                return BadRequest(data);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-user-articles")]
        public async Task<IActionResult> GetUserPostsAsync(int page, int pageSize)
        {
            try
            {
                var data = await service.GetUserPostsAsync(page, pageSize);
                if (data != null)
                {
                    return Ok(data);
                }
                return BadRequest(data);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
