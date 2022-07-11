using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.PostRepos
{
    public interface IPostRepo
    {
        public Task<PostVM> AddPostAsync(PostVM post);
        public Task<PostVM> EditPostAsync(PostVM post);
        public Task<int> DeletePostAsync(int id);
        public Task<int> Like(int PostId);
        public Task<int> DisLike(int PostId);
        public Task<CommentVM> Comment(int PostId,string Cotent);
        public Task<CommentVM> EditComment(int PostId, int commentId, string Cotent);
        public Task<int> DeletComment(int commentId,int PostId);
        public Task<int> RateComment(int commentId,int PostId, string type);
        public Task<PostVM> GetByIdPostAsync(int id);
        public Task<TimeLineVM> GetAllPostAsync(int pagenum, int pagesize);
        public Task<ResponseVM<PostVM>> GetUserPostsAsync(string userId, int pagenum, int pagesize);
        public Task<ResponseVM<CommentVM>> GetPostComment(int PostId, int pagenum, int pagesize);
    }
}
