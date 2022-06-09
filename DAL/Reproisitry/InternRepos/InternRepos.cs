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

        public async Task<InternApplaied_VM> AddInternApplaied(InternApplaied_VM internApplaied)
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            internApplaied.InterenId = userId;
            var data = mapper.Map<InternApplaied>(internApplaied);
            await db.InternApplaieds.AddAsync(data);
            var res = await db.SaveChangesAsync();
            if (res > 0)
            {
                internApplaied.Id = data.Id;
                return internApplaied;
            }
            return null;
        }

        public async Task<InternApplaied_VM> GetApllaiedJopById(int internShipId)
        {
            var data = await db.InternApplaieds.Where(x => x.InternShipId == internShipId).Select(x => new InternApplaied_VM { Id = x.Id, Content = x.Content, InterenId = x.InterenId, InternShipId = x.InternShipId, State = x.State }).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<InternApplaied_VM>> GetApplaiedJops()
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var data = await db.InternApplaieds.Where(x => x.InterenId == userId).Select(x => new InternApplaied_VM { Id = x.Id, Content = x.Content, InterenId = x.InterenId, InternShipId = x.InternShipId, State = x.State }).ToListAsync();
            return data;
        }

        public async Task<InternProfile_VM> GetProfile()
        {
            try
            {
                if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var userid = userManager.FindByNameAsync(username).Result.Id;
                    var data = await db.Interens.Where(x => x.UserId == userid).Select(x => new InternProfile_VM
                    {
                        InterenId = x.InterenId,
                        followersCount = x.Follows.Count(),
                        followingCount = x.Follows.Count(),
                        about = x.User.Description,
                        address = x.User.Location,
                        jobTitle = x.User.jopTitile,
                        //fields= x.f.Where(x => x. == userId).Count(),
                        education = x.Educations.ToList(),
                        skills = x.Skills.ToList(),
                        //availableToWork=x.,
                        birthdate = x.Birthday
                    }).FirstOrDefaultAsync();
                    return data;
                }
                return null;
            }

            catch (Exception ex)
            {

                return null;
            }


        }
        public async Task<bool> UpdateProfile(UpdateInternVM updateIntern)
        {
            try
            {
                if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var user = await userManager.FindByNameAsync(username);
                    user.Email = updateIntern.email;
                    user.Bio = updateIntern.bio;
                    var result = await userManager.UpdateAsync(user);
                    if (!result.Succeeded)
                    {
                        return false;
                    }
                    var skils = await db.InternSkills.Where(x => x.Intern.UserId == user.Id).ToListAsync();
                    var internid = skils.Select(x => x.InternId).FirstOrDefault();
                    db.InternSkills.RemoveRange(skils);
                    List<InternSkills> internSkills = new List<InternSkills>();
                    foreach (var item in updateIntern.skills)
                    {
                        internSkills.Add(new InternSkills { InternId = internid, SkillsId = item });
                    }
                    await db.InternSkills.AddRangeAsync(internSkills);
                    int res = await db.SaveChangesAsync();
                    if (res > 0)
                    {
                        return true;
                    }

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
