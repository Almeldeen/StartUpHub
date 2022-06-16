using AutoMapper;
using DAL.Data;
using DAL.Models;
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

        public async Task<bool> FollowBack(string ReciveId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userId = userManager.FindByNameAsync(username).Result.Id;
                var follow = new Follow() { FollowReceiverId = userId, FollowSenderId = ReciveId };
                await db.Follows.AddAsync(follow);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public async Task<List<Follower_VM>> Followers( )
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userId = userManager.FindByNameAsync(username).Result.Id;
                
                var followers =await db.Follows.Where(x => x.FollowReceiverId == userId).Select(x => new Follower_VM { id = x.FollowSenderId, img = x.FollowSender.ProfileImage, name = x.FollowSender.UserName, jobTitle = x.FollowSender.jopTitile }).ToListAsync();
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
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userId = userManager.FindByNameAsync(username).Result.Id;

                var followering =await db.Follows.Where(x => x.FollowSenderId == userId).Select(x => new Follower_VM { id = x.FollowReceiverId, img = x.FollowReceiver.ProfileImage, name = x.FollowReceiver.UserName, jobTitle = x.FollowReceiver.jopTitile}).ToListAsync();
                return followering;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> SendFollow(string ReciveId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userId = userManager.FindByNameAsync(username).Result.Id;
                var follow = new Follow() { FollowReceiverId = ReciveId, FollowSenderId = userId };
                await db.Follows.AddAsync(follow);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {

                return false;
            }
           
        }

        public async Task<bool> UnFollow(string ReciveId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userId = userManager.FindByNameAsync(username).Result.Id;
                var data = await db.Follows.Where(a => a.FollowSenderId == userId && a.FollowReceiverId == ReciveId).FirstOrDefaultAsync();
                db.Follows.Remove(data);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {

                return false;
            }
          

        }
    }
}
