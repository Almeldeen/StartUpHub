using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.PostRepos
{
    public class PostRepo : IPostRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;

        public PostRepo( ApplicationDbContext db , IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
        public async Task<PostVM> AddPostAsync(PostVM post)
        {
            try
            {
                var data = mapper.Map<Post>(post);
                await db.Posts.AddAsync(data);
                var res = await db.SaveChangesAsync();
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
            var data = await db.Posts.Select(a => new PostVM { PostId = a.PostId, PostImagePath = a.PostImagePath, Content = a.Content, FieldId = a.Field.FieldId, FieldName = a.Field.FieldName, UserId = a.User.Id }).ToListAsync();
            return data;
        }

        public async Task<PostVM> GetByIdPostAsync(int id)
        {
            var data = await db.Posts.Where(a =>  a.PostId ==id).Select(a => new PostVM { PostId = a.PostId, PostImagePath = a.PostImagePath, Content = a.Content, FieldId = a.Field.FieldId, FieldName = a.Field.FieldName, UserId = a.User.Id }).FirstOrDefaultAsync();
            return data;
        }
    }
}
