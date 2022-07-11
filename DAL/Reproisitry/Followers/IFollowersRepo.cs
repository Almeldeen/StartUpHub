using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.Followers
{
    public interface IFollowersRepo
    {
        public Task<ResponseVM<Follower_VM> >Followers(int pagenum, int pagesize);
        public Task<ResponseVM<Follower_VM> >Following(int pagenum, int pagesize);
        public Task<ResponseVM<Follower_VM>> GetPeopleToFollow(int pagenum, int pagesize);

        public Task<bool> SendFollow(string ReciveId);
        public Task<bool> FollowBack(string ReciveId);
        public Task<bool> UnFollow(string ReciveId);
    }
}
