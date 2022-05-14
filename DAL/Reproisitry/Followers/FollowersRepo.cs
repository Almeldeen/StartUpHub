using AutoMapper;
using DAL.Data;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.Followers
{
    public class FollowersRepo : IFollowersRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userManager;

        public FollowersRepo(ApplicationDbContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
        }

        public async Task<Follower_VM> Followers( )
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var data = db.Follows.Where(x => x.FollowReceiverId == userId).Count();
                return null;
            }
            else
            {
                return null;
            }
        }

        public Task<Follower_VM> Following( )
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var data = db.Follows.Where(x => x.FollowSenderId == userId).Count();
                return null;
            }
            else
            {
                return null;
            }
        }
    }
}
