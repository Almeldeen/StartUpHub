using DAL.Reproisitry.Followers;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Followers
{
    public class FollowersService : IFollowersService
    {
        private readonly IFollowersRepo repo;

        public FollowersService(IFollowersRepo repo)
        {
            this.repo = repo;
        }

        public async Task<ResponseVM<Follower_VM>> Followers(int pagenum, int pagesize)
        {
            return await repo.Followers(pagenum, pagesize);
        }

        public async Task<ResponseVM<Follower_VM>> Following(int pagenum, int pagesize)
        {
            return await repo.Following(pagenum, pagesize);
        }
        public async Task<ResponseVM<Follower_VM>> GetPeopleToFollow(int pagenum, int pagesize)
        {
            return await repo.GetPeopleToFollow(pagenum,pagesize);
        }
        public async Task<bool> SendFollow(string ReciveId)
        {
            return await repo.SendFollow(ReciveId);
        }
        public async Task<bool> FollowBack(string ReciveId)
        {
            return await repo.FollowBack(ReciveId);

        }
        public async Task<bool> UnFollow(string ReciveId)
        {
            return await repo.UnFollow(ReciveId);

        }
    }
}
