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

namespace DAL.Reproisitry.JopRepo
{
    public class JopRepo : IJopRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userManager;

        public JopRepo(ApplicationDbContext db  , IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
        }
        public async Task<JopVM> AddJop(JopVM jop)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userManager.FindByNameAsync(username).Result.Id;
                var data = mapper.Map<InternShip>(jop);
                data.UserId = userid;
                data.Createdate = DateTimeOffset.Now;
                await db.InternShips.AddAsync(data);
                var res = await db.SaveChangesAsync();
                if (res <=0)
                {
                    return null;
                }
                if (jop.skillls!=null)
                {
                    List<InternShipSkils> jopskills = new List<InternShipSkils>();
                    foreach (var item in jop.skillls)
                    {
                        jopskills.Add(new InternShipSkils { InternShipId = data.InternShipId, SkillsId = item.SkillsId });

                    }
                    await db.InternShipSkils.AddRangeAsync(jopskills);
                }
                if (jop.questions!=null)
                {
                    List<InternShipQuestions> internShipQuestions = new List<InternShipQuestions>();
                    foreach (var item in jop.questions)
                    {
                        internShipQuestions.Add(new InternShipQuestions { InternShipId = data.InternShipId, QContent = item.QContent });

                    }
                    await db.InternShipQuestions.AddRangeAsync(internShipQuestions);
                }
                var result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    jop.id = data.InternShipId;
                    return jop;

                }
                return null;

            }
            catch (Exception ex)
            {

                return null;
            }
        }
           
        public async Task<int> DeleteJop(int id)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userManager.FindByNameAsync(username).Result.Id;
                var internapplay = await db.InternApplaieds.Where(x => x.InternShipId == id && x.InternShip.UserId == userid).ToListAsync();
                var data = await db.InternShips.Where(x=> x.InternShipId==id&&x.UserId==userid).FirstOrDefaultAsync();
                var shipSkils = await db.InternShipSkils.Where(x=> x.InternShipId==id&&x.InternShip.UserId==userid).ToListAsync();
                db.InternApplaieds.RemoveRange(internapplay);
                db.InternShipSkils.RemoveRange(shipSkils);
                db.InternShips.Remove(data);
                var res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return 1 ;
                }
                return 0;
            }
            catch (Exception ex)
            {

                return 0;
            }
            
        }

        public async Task<ResponseVM<InternAppliedCompanyVM>> GetAllAppliedIntern(int InternShipId, int page, int pageSize)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userManager.FindByNameAsync(username).Result.Id;
                ResponseVM<InternAppliedCompanyVM> response = new ResponseVM<InternAppliedCompanyVM>();
                response.Data = await db.InternApplaieds.Where(a => a.InternShip.UserId == userid && a.InternShipId == InternShipId).OrderByDescending(x => x.Createdate).Skip(pageSize * (page - 1)).Take(pageSize)
                    .Select(x => new InternAppliedCompanyVM { InternId = x.InternId, 
                        FullName = x.Intern.User.FullName,
                        jopTitle = x.Intern.User.jopTitile,
                        Nationality = x.Intern.Nationality,
                        Birthday = x.Intern.Birthday, 
                        College = x.Intern.College, 
                        CV = x.Intern.CV,
                        Gender = x.Intern.Gender,
                        State = x.State,
                        ProfileImage = x.Intern.User.ProfileImage,
                        availableToWork = x.Intern.availableToWork
                    }).ToListAsync();
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.InternApplaieds.Where(a => a.InternShip.UserId == userid && a.InternShipId == InternShipId).CountAsync() / pageSize));
                response.CurrentPage = page;
                return response;
            }
            catch (Exception ex)
            {

                return null;
            }
            
        }

        public async Task<ResponseVM<JopVM>> GetAllJop(string companyId, int page, int pageSize)
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userid = userManager.FindByNameAsync(username).Result.Id;
            ResponseVM<JopVM> response = new ResponseVM<JopVM>();
            if (companyId==null)
            {
                response.Data = await db.InternShips.Where(x => x.UserId == userid).OrderByDescending(x => x.Createdate).Skip(pageSize * (page - 1)).Take(pageSize).Select(a => new JopVM
                {
                    id = a.InternShipId,
                    title = a.title,
                    startDate = a.StartDate,
                    endDate = a.EndDate,
                    content = a.Content,
                    fieldId = a.Field.FieldId,
                    fieldName = a.Field.FieldName,
                    userId = a.User.Id,
                    skillls = a.Skills.Select(a => new SkillsVM { SkillsId = a.SkillsId, Name = a.Name }).ToList(),
                    questions = a.InternShipQuestions.Select(x => new InternShipQuestionsVM { QId = x.QId, QContent = x.QContent }).ToList()
                }).ToListAsync();
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.InternShips.Where(x => x.UserId == userid).CountAsync() / pageSize));


            }
            else
            {
                response.Data = await db.InternShips.Where(x => x.UserId == companyId).OrderByDescending(x => x.Createdate).Skip(pageSize * (page - 1)).Take(pageSize).Select(a => new JopVM
                {
                    id = a.InternShipId,
                    title = a.title,
                    startDate = a.StartDate,
                    endDate = a.EndDate,
                    content = a.Content,
                    fieldId = a.Field.FieldId,
                    fieldName = a.Field.FieldName,
                    userId = a.User.Id,
                    skillls = a.Skills.Select(a => new SkillsVM { SkillsId = a.SkillsId, Name = a.Name }).ToList(),
                    questions = a.InternShipQuestions.Select(x => new InternShipQuestionsVM { QId = x.QId, QContent = x.QContent }).ToList()
                }).ToListAsync();
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.InternShips.Where(x => x.UserId == companyId).CountAsync() / pageSize));

            }
            response.CurrentPage = page;
            return response;

        }
        public async Task<JopVM> GetJopDetails (int jopId)
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userid = userManager.FindByNameAsync(username).Result.Id;
            var data = await db.InternShips.Where(x=> x.InternShipId==jopId).Select(x => new JopVM 
            {
                content = x.Content,
                skillls = x.Skills.Select(x => new SkillsVM { Name = x.Name }).ToList(),
                fieldName = x.Field.FieldName,
                endDate = x.EndDate,
                startDate = x.StartDate,
                companyName = x.User.FullName,
                companyImg = x.User.ProfileImage,
                companyJobTitle = x.User.jopTitile,
                appliedCount = x.InternApplaieds.Count(),
                postType = "jop".ToUpper(),
                id = x.InternShipId,
                questions = x.InternShipQuestions.Select(x => new InternShipQuestionsVM { QId = x.QId, QContent = x.QContent }).ToList(),
                title = x.title,
                userId = x.UserId,
                appliedByUser=x.InternApplaieds.Any(x=> x.Intern.UserId==userid),
            }).FirstOrDefaultAsync();
            return data;
        }

        public async Task<List<JopVM>> SearchJop(string name)
        {
            var data = await db.InternShips.Where(w => w.title.Contains(name)).Select(w => mapper.Map<JopVM>(w)).ToListAsync();
            return data;
        }
        public async Task<bool> ChangeState(int InternShipId, string InternId, string State)
        {
            try
            {
                var data = await db.InternApplaieds.Where(x => x.InternShipId == InternShipId && x.InternId == InternId).FirstOrDefaultAsync();
                data.State = State;
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
        public async Task<CompanySimpleStatsVM> SimpleStats()
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await userManager.FindByNameAsync(username);
            var data = await db.Users.Where(x => x.Id == user.Id).Select(x => new CompanySimpleStatsVM
            {
                articleCount = x.Posts.Count(),
                followers = x.FollowsSender.Count(),
                following = x.FollowsReceiver.Count(),
                jobTitle = x.jopTitile,
                internshipRequests =  db.InternShips.Where(x => x.UserId == user.Id).Count(),
                in_ProgressRequests = db.InternApplaieds.Where(x=> x.InternShip.UserId == user.Id && x.State == "IN_PROGRESS").Count(),
                pendingRequests= db.InternApplaieds.Where(x => x.InternShip.UserId == user.Id &&x.State == "PENDING").Count(),
                
            }).FirstOrDefaultAsync();
            return data;
        }
        public async Task<InternApplaied_VM> GetApllaiedJopById(int internShipId,string internId)
        {
            try
            {
               
                var data = await db.InternApplaieds.Where(x => x.InternShipId == internShipId && x.InternId == internId).Select(x => new InternApplaied_VM
                {
                    InterenId = x.InternId,
                    InternShipId = x.InternShipId,
                    State = x.State,
                    skills = x.InternShip.Skills.Select(x => new SkillsVM { SkillsId = x.SkillsId, Name = x.Name }).ToList(),
                    startDate = x.InternShip.StartDate,
                    answers = x.internApplaiedQAnswers.Select(x => new InternApplaiedQAnswersVM { question = x.InternShipQuestions.QContent, answer = x.QAnswer }).ToList(),
                    appliedCount = x.InternId.Count(),                   
                    content = x.InternShip.Content,
                    endDate = x.InternShip.EndDate,
                    fieldName = x.InternShip.Field.FieldName,
                    internEmail = x.Intern.User.Email,
                    internId = x.InternId,
                    internName = x.Intern.User.FullName,
                    title = x.InternShip.title,
                    userId = x.InternShip.UserId,
                    CV = x.Intern.CV,
                }).FirstOrDefaultAsync();
                return data;
            }
            catch (Exception ex)
            {

                return null;
            }

        }
        public async Task<InternProfile_VM> GetProfile(string userId)
        {
            try
            {
                if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    var data = new InternProfile_VM();
                    var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var user = await userManager.FindByNameAsync(username);
                    var role = await userManager.GetRolesAsync(user);
                    if (userId == null)
                    {
                        data = await db.Users.Where(x => x.Id == user.Id).Select(x => new InternProfile_VM
                        {
                            InterenId = x.Id,
                            followersCount = x.FollowsSender.Count(),
                            followingCount = x.FollowsReceiver.Count(),
                            about = x.Bio,
                            address = x.Location,
                            jobTitle = x.jopTitile,
                            field = new FieldVM { FieldId = x.FieldId, FieldName = x.Field.FieldName },
                            mobile = x.PhoneNumber,
                            FullName = x.FullName,
                            UserImg = x.ProfileImage,
                            userRole = role[0],                         
                            coverImg = x.CoverImage,
                        }).FirstOrDefaultAsync();
                    }
                    else
                    {

                        data = await db.Users.Where(x => x.Id == userId).Select(x => new InternProfile_VM
                        {
                            InterenId = x.Id,
                            followersCount = x.FollowsSender.Count(),
                            followingCount = x.FollowsReceiver.Count(),
                            about = x.Bio,
                            address = x.Location,
                            jobTitle = x.jopTitile,
                            field = new FieldVM { FieldId = x.FieldId, FieldName = x.Field.FieldName },
                            mobile = x.PhoneNumber,
                            FullName = x.FullName,
                            UserImg = x.ProfileImage,
                            userRole = role[0],
                            coverImg = x.CoverImage,
                        }).FirstOrDefaultAsync();
                    }

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
                    user.Bio = updateIntern.about == null ? user.Bio : updateIntern.about;
                    user.Location = updateIntern.address;
                    user.jopTitile = updateIntern.jobTitle;
                    user.PhoneNumber = updateIntern.mobile;
                    user.FullName = updateIntern.fullName == null ? user.FullName : updateIntern.fullName;
                    var result = await userManager.UpdateAsync(user);
                    if (result.Succeeded)
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
