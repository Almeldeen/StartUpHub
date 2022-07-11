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



        public async Task<ResponseVM<Follower_VM>> Followers(int pagenum, int pagesize)
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userId = userManager.FindByNameAsync(username).Result.Id;

                var followers = await db.Follows.Where(x => x.FollowReceiverId == userId).Skip(pagesize * (pagenum - 1)).Take(pagesize).Select(x => new Follower_VM
                {
                    id = x.FollowSenderId,
                    img = x.FollowSender.ProfileImage,
                    name = x.FollowSender.UserName,
                    jobTitle = x.FollowSender.jopTitile,
                    followedHim = db.Follows.Any(f=> f.FollowSenderId==userId&&f.FollowReceiverId==x.FollowSenderId)==true? true : false,
                    followedMe = true,
                }).ToListAsync();
                foreach (var item in followers)
                {
                    var user = await userManager.FindByIdAsync(item.id);
                    var role = await userManager.GetRolesAsync(user);
                    item.userRole = role[0];
                }
                ResponseVM<Follower_VM> response = new ResponseVM<Follower_VM>();
                response.Data = followers;
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Follows.Where(x => x.FollowReceiverId == userId).CountAsync() / pagesize));
                response.CurrentPage = pagenum;
                return response;
            }
            else
            {
                return null;
            }
        }

        public async Task<ResponseVM<Follower_VM>> Following(int pagenum, int pagesize)
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userId = userManager.FindByNameAsync(username).Result.Id;

                var followering = await db.Follows.Where(x => x.FollowSenderId == userId).Skip(pagesize * (pagenum - 1)).Take(pagesize).Select(x => new Follower_VM
                {
                    id = x.FollowReceiverId,
                    img = x.FollowReceiver.ProfileImage,
                    name = x.FollowReceiver.UserName,
                    jobTitle = x.FollowReceiver.jopTitile,
                    followedMe = db.Follows.Any(f => f.FollowReceiverId == userId && f.FollowSenderId == x.FollowReceiverId) == true ? true : false,
                    followedHim = true,
                }).ToListAsync();
                foreach (var item in followering)
                {
                    var user = await userManager.FindByIdAsync(item.id);
                    var role = await userManager.GetRolesAsync(user);
                    item.userRole = role[0];
                }
                ResponseVM<Follower_VM> response = new ResponseVM<Follower_VM>();
                response.Data = followering;
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Follows.Where(x => x.FollowSenderId == userId).CountAsync() / pagesize));
                response.CurrentPage = pagenum;
                return response;
            }
            else
            {
                return null;
            }
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
        public async Task<ResponseVM<Follower_VM>> GetPeopleToFollow(int pagenum, int pagesize)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user =await userManager.FindByNameAsync(username);
                List<Follower_VM> users = new List<Follower_VM>();
                List<Follower_VM> usersPaging = new List<Follower_VM>();
                var allusers =await userManager.Users.ToListAsync();
                foreach (var item in allusers)
                {
                    if (item.FollowsSender!=null)
                    {
                        if (!item.FollowsSender.Any(x => x.FollowSenderId == user.Id && x.FollowReceiverId == item.Id))
                        {
                            if (await userManager.IsInRoleAsync(item, "INTERN"))
                            {
                                users.Add(new Follower_VM
                                {
                                    userRole = "INTERN",
                                    id = item.Id,
                                    img = item.ProfileImage,
                                    jobTitle = item.ProfileImage,
                                    name = item.FullName,
                                });
                            }
                            else if (await userManager.IsInRoleAsync(item, "COMPANY"))
                            {
                                users.Add(new Follower_VM
                                {
                                    userRole = "COMPANY",
                                    id = item.Id,
                                    img = item.ProfileImage,
                                    jobTitle = item.ProfileImage,
                                    name = item.FullName,
                                });
                            }
                        }
                    }
                    else
                    {
                        if (await userManager.IsInRoleAsync(item, "INTERN"))
                        {
                            users.Add(new Follower_VM
                            {
                                userRole = "INTERN",
                                id = item.Id,
                                img = item.ProfileImage,
                                jobTitle = item.ProfileImage,
                                name = item.FullName,
                            });
                        }
                        else if (await userManager.IsInRoleAsync(item, "COMPANY"))
                        {
                            users.Add(new Follower_VM
                            {
                                userRole = "COMPANY",
                                id = item.Id,
                                img = item.ProfileImage,
                                jobTitle = item.ProfileImage,
                                name = item.FullName,
                            });
                        }
                    }

                }
                ResponseVM<Follower_VM> response = new ResponseVM<Follower_VM>();
                usersPaging.AddRange(users.Where(x => x.userRole == "INTERN").Skip(pagesize * (pagenum - 1)).Take(pagesize).ToList());
                usersPaging.AddRange(users.Where(x => x.userRole == "COMPANY").Skip(pagesize * (pagenum - 1)).Take(pagesize).ToList());
                response.Data = usersPaging;
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)users.Count() / pagesize));
                response.CurrentPage = pagenum;

                return response;
            }
            catch (Exception ex)
            {

                throw;
            }
          
        }
    }
}
