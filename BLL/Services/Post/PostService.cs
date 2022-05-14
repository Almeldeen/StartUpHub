using DAL.Reproisitry.PostRepos;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Post
{
    public class PostService :IPostService
    {
        private readonly IPostRepo repo;

        public PostService(IPostRepo repo)
        {
            this.repo = repo;
        }
         public async Task<PostVM> AddPostAsync(PostVM  Post)
        {
            return await repo.AddPostAsync( Post);
        }

        public async Task<int> DeletePostAsync(int id)
        {
            return await repo.DeletePostAsync(id);
        }

        public async Task< PostVM> EditPostAsync( PostVM  Post)
        {
            return await repo.EditPostAsync( Post);
        }

        public async Task<List< PostVM>> GetAllPostAsync()
        {
            return await repo.GetAllPostAsync();
        }

        public async Task< PostVM> GetByIdPostAsync(int id)
        {
            return await repo.GetByIdPostAsync(id);
        }
    }
}
