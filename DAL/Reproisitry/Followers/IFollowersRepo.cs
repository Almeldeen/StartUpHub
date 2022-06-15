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
        public Task<List<Follower_VM> >Followers( );
        public Task<List<Follower_VM> >Following( );
        public Task<bool> SendFollow(string ReciveId);
        public Task<bool> FollowBack(string ReciveId);
    }
}
