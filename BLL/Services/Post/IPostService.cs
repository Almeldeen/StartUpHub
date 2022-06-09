using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Post
{
    public interface IPostService
    {
        public Task<PostVM> AddPostAsync(PostVM post);
        public Task<PostVM> EditPostAsync(PostVM post);
        public Task<int> DeletePostAsync(int id);
        public Task<PostVM> GetByIdPostAsync(int id);
        public Task<ResponseVM<PostVM>> GetAllPostAsync(int pagenum,int pagesize);
        public Task<ResponseVM<PostVM>> GetUserPostsAsync(int pagenum, int pagesize);
    }
}
