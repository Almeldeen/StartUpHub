using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Followers
{
    public interface IFollowersService
    {
        public Task<List<Follower_VM>> Followers( );
        public Task<List<Follower_VM>> Following( );
    }
}
