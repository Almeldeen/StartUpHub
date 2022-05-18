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
        public Task<Follower_VM> Followers( );
        public Task<Follower_VM> Following( );
    }
}
