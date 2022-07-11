﻿using BLL.Hups;
using BLL.Services.Post;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    [Authorize]
    public class PostsController : ControllerBase
    {
        private readonly IPostService service;
        private readonly IHubContext<RealtimeHub> hubContext;

        public PostsController(IPostService service,IHubContext<RealtimeHub> hubContext)
        {
            this.service = service;
            this.hubContext = hubContext;
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
                return BadRequest(res);
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
        public async Task<IActionResult> RateComment(int commentId, int PostId, string type)
        {
            try
            {
                var res = await service.RateComment(commentId, PostId,type);
                if (res > 0)
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
        [HttpPut("updatePost")]
        public async Task<IActionResult> EditPostAsync([FromForm] PostVM post)
        {
            try
            {
                var res = await service.EditPostAsync(post);
                if (res != null)
                {
                    return Ok(res);

                }
                return BadRequest(/*res.error*/);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletePost")]
        public async Task<IActionResult> DeletePostAsync( int id)
        {
            try
            {
                var res = await service.DeletePostAsync(id);
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
        [HttpGet("get-post-details")]
        public async Task<IActionResult> GetByIdPostAsync(int postId)
        {
            try
            {
                var data = await service.GetByIdPostAsync(postId);
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
   
        [HttpGet("get-user-articles")]
        public async Task<IActionResult> GetUserPostsAsync(string userId, int page, int pageSize)
        {
            try
            {
                var data = await service.GetUserPostsAsync(userId,page, pageSize);
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
        [HttpGet("get-comments")]
        public async Task<IActionResult> GetPostComment(int page, int pageSize,int PostId)
        {
            try
            {
                var data = await service.GetPostComment(PostId,page, pageSize);
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
