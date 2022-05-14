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
        public Task<PostVM> GetByIdPostAsync(int id);
        public Task<List<PostVM>> GetAllPostAsync();
    }
}
