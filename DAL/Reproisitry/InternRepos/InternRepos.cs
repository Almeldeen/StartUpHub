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
                
                return internApplaied;
            }
            return null;
        }

        public async Task<InternApplaied_VM> GetApllaiedJopById(int internShipId)
        {
            var data = await db.InternApplaieds.Where(x => x.InternShipId == internShipId).Select(x => new InternApplaied_VM {   InterenId = x.InternId, InternShipId = x.InternShipId, State = x.State }).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<InternApplaied_VM>> GetApplaiedJops()
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var data = await db.InternApplaieds.Where(x => x.InternId == userId).Select(x => new InternApplaied_VM {  InterenId = x.InternId, InternShipId = x.InternShipId, State = x.State }).ToListAsync();
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
                    var data = await db.Interns.Where(x => x.UserId == userid).Select(x => new InternProfile_VM
                    {
                        InterenId = x.InternId,
                        followersCount = x.User.FollowsSender.Count(),
                        followingCount = x.User.FollowsReceiver.Count(),
                        about = x.User.Bio,
                        address = x.User.Location,
                        jobTitle = x.User.jopTitile,
                        field=x.User.Field.FieldName,
                        education = x.Educations.Select(x=> new Education_VM 
                        {
                           degree=x.Degree,
                           educationID=x.EducationID,
                           endDate=x.EndDate,
                           interenId=x.InternId,
                           fieldOfStudy=x.FieldOfStudy,
                           school=x.School,
                           startDate=x.StartDate,
                           studentActivities=x.StudentActivities,
                        }).ToList(),
                        skills = x.Skills.Select(x=> new SkillsVM {SkillsId=x.SkillsId,Name=x.Name }).ToList(),                        
                        availableToWork=x.availableToWork,
                        birthdate = x.Birthday,
                        CV=x.CV,
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
                    user.Bio = updateIntern.about;
                    user.Location = updateIntern.address;
                    user.jopTitile = updateIntern.jobTitle;
                    user.FieldId = updateIntern.fields;
                    var result = await userManager.UpdateAsync(user);
                    if (!result.Succeeded)
                    {
                        return false;
                    }
                    var intern = await db.Interns.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
                    intern.Birthday =updateIntern.birthdate;
                    intern.availableToWork =updateIntern.availableToWork;
                    intern.CV = updateIntern.CVPath;
                    if (updateIntern.skills.Count > 0)
                    {
                        var skils = await db.InternSkills.Where(x => x.Intern.UserId == user.Id).ToListAsync();
                    if (skils!=null)
                    {
                        db.InternSkills.RemoveRange(skils);
                        await db.SaveChangesAsync();
                    }
                    
                        List<InternSkills> internSkills = new List<InternSkills>();
                        foreach (var item in updateIntern.skills)
                        {
                            internSkills.Add(new InternSkills { InternId = intern.InternId, SkillsId = item });
                        }
                        await db.InternSkills.AddRangeAsync(internSkills);
                    }

                    if (updateIntern.education.Count>0)
                    {
                        var edu = await db.Educations.Where(x => x.Intern.UserId == user.Id).ToListAsync();
                        if (edu != null)
                        {
                            db.Educations.RemoveRange(edu);
                            await db.SaveChangesAsync();
                        }
                        List<Education> educations = new List<Education>();
                        foreach (var item in updateIntern.education)
                        {
                            educations.Add(new Education
                            {
                                InternId = intern.InternId,
                                School = item.school,
                                StartDate = item.startDate,
                                StudentActivities = item.studentActivities,
                                FieldOfStudy = item.fieldOfStudy,
                                Degree = item.degree,
                                EndDate = item.endDate,
                            });
                        }
                        await db.Educations.AddRangeAsync(educations);
                    }
                    
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
