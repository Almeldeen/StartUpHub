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

namespace DAL.Reproisitry.InternRepos
{
    public class InternRepos : IInternRepos
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userManager;

        public InternRepos(ApplicationDbContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
        }
        public async Task<InternProfile_VM> GetProfile( )
        {
            if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = await userManager.FindByIdAsync(userId);
                var data = db.Users.Where(x => x.Id == userId).Select(x => new InternProfile_VM
                {
                    id = x.Id,
                    followersCount = db.Follows.Where(x => x.FollowReceiverId == userId).Count(),
                    followingCount = db.Follows.Where(x => x.FollowSenderId == userId).Count(),
                    about = x.Description,
                    //fields= db.Interens.Where(x => x. == userId).Count(),
                    birthdate = db.Interens.Where(x=>x.UserId==userId).Select(x=>x.Birthday).FirstOrDefault(),
                    
                });
                return null;
            }
            else
            {
                  return null;   
            }
           
        }
    }
}
