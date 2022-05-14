﻿using BLL.Services.Post;
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
    public class PostsController : ControllerBase
    {
        private readonly IPostService service;

        public PostsController(IPostService service)
        {
            this.service = service;
        }
        [HttpPost("AddPost")]
        public async Task<IActionResult> AddPostAsync(PostVM post)
        {
            var res = await service.AddPostAsync(post);
            return Ok(res);
                
        }
    }
}
