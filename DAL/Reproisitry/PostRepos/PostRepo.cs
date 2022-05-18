using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.PostRepos
{
    public class PostRepo : IPostRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userMangger;

        public PostRepo(ApplicationDbContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor,UserManager<ApplicationUser> userMangger)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userMangger = userMangger;
        }
        public async Task<PostVM> AddPostAsync(PostVM post)
        {
            try
            {
                var data = mapper.Map<Post>(post);
                data.UserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                await db.Posts.AddAsync(data);

                var res = await db.SaveChangesAsync();
                if (res <= 0)
                {
                    return null;
                }
                List<ImagePosts> imagePosts = new List<ImagePosts>();
                foreach (var item in post.PostImagePath)
                {
                    imagePosts.Add(new ImagePosts { ImagePath = item, PostId = data.PostId });
                }
                await db.ImagePosts.AddRangeAsync(imagePosts);
                res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    post.PostId = data.PostId;
                    return post;
                }
                return null;

            }
            catch (Exception ex)
            {

                return null;
            }



        }

        public async Task<int> DeletePostAsync(int id)
        {
            try
            {
                var data = await db.Posts.FindAsync(id);
                db.Posts.Remove(data);
                var res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return 1;
                }
                return 0;
            }
            catch (Exception)
            {

                return 0;
            }




        }

        public async Task<PostVM> EditPostAsync(PostVM post)
        {
            try
            {
                var data = mapper.Map<Post>(post);
                db.Entry(data).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    post.PostId = data.PostId;
                    return post;
                }
                return null;
            }



            catch (Exception)
            {

                return null;
            }

        }
        public async Task<List<PostVM>> GetAllPostAsync()
        {
            var data = await db.Posts.Select(a => new PostVM { PostId = a.PostId,
                Content = a.Content,
                FieldId = a.Field.FieldId,
                FieldName = a.Field.FieldName,
                UserId = a.User.Id,
                PostImagePath =a.ImagePosts.Select(x=> x.ImagePath).ToList()
            }).ToListAsync();
            return data;
        }

        public async Task<PostVM> GetByIdPostAsync(int id)
        {
            var data = await db.Posts.Where(a => a.PostId == id).Select(a => new PostVM { PostId = a.PostId, Content = a.Content, FieldId = a.Field.FieldId, FieldName = a.Field.FieldName, UserId = a.User.Id, PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList() }).FirstOrDefaultAsync();
            return data;
        }
    }
}
