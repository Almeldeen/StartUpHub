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

        public Task<List<Follower_VM>> Followers( )
        {
            return repo.Followers();
        }

        public Task<List<Follower_VM>> Following( )
        {
            return repo.Following();
        }
    }
}
