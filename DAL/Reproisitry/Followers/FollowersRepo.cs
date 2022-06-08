using AutoMapper;
using DAL.Data;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Follower_VM>> Followers( )
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var data = db.Follows.Where(x => x.FollowReceiverId == userId).Count();
                var followers =await db.Follows.Where(x => x.FollowReceiverId == userId).Select(x => new Follower_VM { id = x.FollowReceiverId, img = x.FollowReceiver.Image, name = x.FollowReceiver.UserName, jobTitle = x.FollowReceiver.jopTitile }).ToListAsync();
                    return followers;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<Follower_VM>> Following( )
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
              
                var followering =await db.Follows.Where(x => x.FollowSenderId == userId).Select(x => new Follower_VM { id = x.FollowSenderId, img = x.FollowSender.Image, name = x.FollowSender.UserName, jobTitle = x.FollowSender.jopTitile}).ToListAsync();
                return followering;
            }
            else
            {
                return null;
            }
        }
    }
}
