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
            try
            {
                if (Post.PostImage != null/*|Post.PostImage.Count>0*/)
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
            catch (Exception ex)
            {

                var p = new PostVM();
                //p.error = ex.Message;
                return p;
            }

        }

        public async Task<int> DeletePostAsync(int id)
        {
            return await repo.DeletePostAsync(id);
        }

        public async Task<PostVM> EditPostAsync(PostVM Post)
        {
            try
            {
                if (Post.PostImage != null)
                {
                    Post.PostImagePath = new List<string>();
                    foreach (var item in Post.PostImage)
                    {
                        string FileName = await SaveFiles.SaveFileAsync(item, FilePath.ImagePost);
                        string path = httpContextAccessor.HttpContext.Request.Host.Value + "/IMGsPosts/" + FileName;
                        Post.PostImagePath.Add(path);
                    }
                }
                return await repo.EditPostAsync(Post);
            }
            catch (Exception ex)
            {

                var p = new PostVM();
                //p.error = ex.Message;
                return p;
            }
         
        }

        public async Task<TimeLineVM> GetAllPostAsync(int pagenum, int pagesize)
        {
            return await repo.GetAllPostAsync(pagenum, pagesize);
        }
        public async Task<ResponseVM<PostVM>> GetUserPostsAsync(string userId, int pagenum, int pagesize)
        {
            return await repo.GetUserPostsAsync(userId,pagenum, pagesize);
        }
        public async Task<ResponseVM<CommentVM>> GetPostComment(int PostId, int pagenum, int pagesize)
        {
            return await repo.GetPostComment(PostId,pagenum, pagesize);

        }
       
        public async Task<PostVM> GetByIdPostAsync(int id)
        {
            return await repo.GetByIdPostAsync(id);
        }

        public async Task<int> Like(int PostId)
        {
            return await repo.Like(PostId);
        }

        public async Task<int> DisLike(int PostId)
        {
            return await repo.DisLike(PostId);
        }

        public async Task<CommentVM> Comment(int PostId, string Cotent)
        {
            return await repo.Comment(PostId, Cotent);
        }

        public async Task<CommentVM> EditComment(int PostId, int commentId, string Cotent)
        {
            return await repo.EditComment(PostId, commentId, Cotent);
        }

        public async Task<int> DeletComment(int commentId, int PostId)
        {
            return await repo.DeletComment(commentId,PostId);
        }

        public async Task<int> RateComment(int commentId, int PostId, string type)
        {
            return await repo.RateComment(commentId,PostId, type);
        }
    }
}
