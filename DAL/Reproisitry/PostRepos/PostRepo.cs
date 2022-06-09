using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.Swagger;
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
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                data.UserId = userMangger.FindByNameAsync(username).Result.Id;
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
        public async Task<ResponseVM<PostVM>> GetAllPostAsync(int pagenum, int pagesize)
        {
            try
            {
                if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var UserId = userMangger.FindByNameAsync(username).Result.Id;
                    var data = await db.Posts.Skip(pagesize * (pagenum - 1)).Take(pagesize).Select(a => new PostVM
                    {
                        PostId = a.PostId,
                        Content = a.Content,
                        FieldId = a.Field.FieldId,
                        FieldName = a.Field.FieldName,
                        UserId = a.User.Id,
                        UserImg = a.User.ProfileImage,
                        UserJobTitle = a.User.jopTitile,
                        UserName = a.User.UserName,
                        likes = a.Likes.Select(x => new PostLikesVM
                        {
                            userFullName = x.User.UserName,
                            userId = x.UserId,
                            userImg = x.User.ProfileImage,
                            userJobTitle = x.User.jopTitile,
                        }).ToList(),
                        PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList(),
                    }).ToListAsync();
                    ResponseVM<PostVM> response = new ResponseVM<PostVM>();
                    response.Data = data;
                    response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Posts.CountAsync() / pagesize));
                    response.CurrentPage = pagenum;
                    return response;
                }
                return null;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        public async Task<ResponseVM<PostVM>> GetUserPostsAsync(int pagenum,int pagesize)
        {
            try
            {
                if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var UserId = userMangger.FindByNameAsync(username).Result.Id;
                    var data = await db.Posts.Where(x=> x.UserId==UserId).Skip(pagesize*(pagenum-1)).Take(pagesize).Select(a => new PostVM
                    {
                        PostId = a.PostId,
                        Content = a.Content,
                        FieldId = a.Field.FieldId,
                        FieldName = a.Field.FieldName,
                        UserId = a.User.Id,
                        UserImg = a.User.ProfileImage,
                        UserJobTitle = a.User.jopTitile,
                        UserName = a.User.UserName,
                        likes = a.Likes.Select(x => new PostLikesVM
                        {
                            userFullName = x.User.UserName,
                            userId = x.UserId,
                            userImg = x.User.ProfileImage,
                            userJobTitle = x.User.jopTitile,
                        }).ToList(),
                        PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList(),
                    }).ToListAsync();
                    ResponseVM<PostVM> response = new ResponseVM<PostVM>();
                    response.Data = data;
                    response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Posts.Where(x => x.UserId == UserId).CountAsync() / pagesize));
                    response.CurrentPage = pagenum;
                    return response;
                }
                return null;
            }
            catch (Exception ex)
            {

                return null;
            }
           
          
        }

        public async Task<PostVM> GetByIdPostAsync(int id)
        {
            var data = await db.Posts.Where(a => a.PostId == id).Select(a => new PostVM { PostId = a.PostId, Content = a.Content, FieldId = a.Field.FieldId, FieldName = a.Field.FieldName, UserId = a.User.Id, PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList() }).FirstOrDefaultAsync();
            return data;
        }
    }
}
