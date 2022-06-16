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
        [HttpPost("Like")]
        public async Task<IActionResult> Like(int PostId)
        {
            try
            {
                var res = await service.Like(PostId);
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
        [HttpDelete("DisLike")]
        public async Task<IActionResult> DisLike(int PostId)
        {
            try
            {
                var res = await service.DisLike(PostId);
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
        [HttpPost("Comment")]
        public async Task<IActionResult> Comment(int PostId, string Cotent)
        {
            try
            {
                var res = await service.Comment(PostId, Cotent);
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
        [HttpPut("EditComment")]
        public async Task<IActionResult> EditComment(int PostId, int commentId, string Cotent)
        {
            try
            {
                var res = await service.EditComment(PostId, commentId, Cotent);
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
        [HttpDelete("DeletComment")]
        public async Task<IActionResult> DeletComment(int commentId, int PostId)
        {
            try
            {
                var res = await service.DeletComment(commentId, PostId);
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
        [HttpPut("RateComment")]
        public async Task<IActionResult> RateComment(int commentId, int PostId, char type)
        {
            try
            {
                var res = await service.RateComment(commentId, PostId,type);
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
