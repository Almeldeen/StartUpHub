using BLL.Helper;
using DAL.Reproisitry.PostRepos;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Post
{
    public class PostService : IPostService
    {
        private readonly IPostRepo repo;
        private readonly IHttpContextAccessor httpContextAccessor;

        public PostService(IPostRepo repo, IHttpContextAccessor httpContextAccessor)
        {
            this.repo = repo;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<PostVM> AddPostAsync(PostVM Post)
        {
            if (Post.PostImage.Count>0)
            {
                Post.PostImagePath = new List<string>();
                foreach (var item in Post.PostImage)
                {
                    string FileName = await SaveFiles.SaveFileAsync(item, FilePath.ImagePost);
                    string path = httpContextAccessor.HttpContext.Request.Host.Value + "/IMGsPosts/" + FileName;                    
                    Post.PostImagePath.Add(path);
                }
            }           
            return await repo.AddPostAsync(Post);
        }

        public async Task<int> DeletePostAsync(int id)
        {
            return await repo.DeletePostAsync(id);
        }

        public async Task<PostVM> EditPostAsync(PostVM Post)
        {
            return await repo.EditPostAsync(Post);
        }

        public async Task<ResponseVM<PostVM>> GetAllPostAsync(int pagenum, int pagesize)
        {
            return await repo.GetAllPostAsync(pagenum, pagesize);
        }
        public async Task<ResponseVM<PostVM>> GetUserPostsAsync(int pagenum, int pagesize)
        {
            return await repo.GetUserPostsAsync(pagenum, pagesize);
        }

        public async Task<PostVM> GetByIdPostAsync(int id)
        {
            return await repo.GetByIdPostAsync(id);
        }
    }
}
