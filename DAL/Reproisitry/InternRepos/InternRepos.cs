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
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userManager.FindByNameAsync(username).Result.Id;
                var data = mapper.Map<InternApplaied>(internApplaied);
                data.InternId = userid;
                data.State = "PENDING";
                data.Createdate = DateTimeOffset.Now;
                await db.InternApplaieds.AddAsync(data);
                var res = await db.SaveChangesAsync();
                if (res < 0)
                {
                    return null;
                }
                if (internApplaied.answers.Count > 0)
                {

                    var answers = new List<InternApplaiedQAnswers>();
                    foreach (var item in internApplaied.answers)
                    {
                        answers.Add(new InternApplaiedQAnswers { InternId = userid, InternShipId = internApplaied.InternShipId, QId = item.QId, QAnswer = item.answer });
                    }
                    await db.InternApplaiedQAnswers.AddRangeAsync(answers);
                    res += await db.SaveChangesAsync();

                }
                if (res > 0)
                {
                    internApplaied.InterenId = userid;
                    internApplaied.userId = await db.InternShips.Where(x => x.InternShipId == internApplaied.InternShipId).Select(x => x.UserId).FirstOrDefaultAsync();
                    return internApplaied;
                }
                return null;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public async Task<string> ChangePhoto(string path, string type)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = await userManager.FindByNameAsync(username);
                if (type == "Profile")
                {
                    user.ProfileImage = path;
                }
                else if (type == "Cover")
                {
                    user.CoverImage = path;
                }
                var res = await userManager.UpdateAsync(user);
                if (res.Succeeded)
                {
                    return path;
                }
                return null;
            }
            catch (Exception ex)
            {

                return ex.Message;
            }

        }

        public async Task<InternApplaied_VM> GetApllaiedJopById(int internShipId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userManager.FindByNameAsync(username).Result.Id;
                var data = await db.InternApplaieds.Where(x => x.InternShipId == internShipId && x.InternId == userid).Select(x => new InternApplaied_VM
                {
                    InterenId = x.InternId,
                    InternShipId = x.InternShipId,
                    State = x.State,
                    skills = x.InternShip.Skills.Select(x => new SkillsVM { SkillsId = x.SkillsId, Name = x.Name }).ToList(),
                    startDate = x.InternShip.StartDate,
                    answers = x.internApplaiedQAnswers.Select(x => new InternApplaiedQAnswersVM { question = x.InternShipQuestions.QContent, answer = x.QAnswer }).ToList(),
                    appliedCount = x.InternId.Count(),
                    companyImg = x.InternShip.User.ProfileImage,
                    companyJobTitle = x.InternShip.User.jopTitile,
                    companyName = x.InternShip.User.FullName,
                    content = x.InternShip.Content,
                    endDate = x.InternShip.EndDate,
                    fieldName = x.InternShip.Field.FieldName,
                    internEmail = x.Intern.User.Email,
                    internId = x.InternId,
                    internName = x.Intern.User.FullName,
                    title = x.InternShip.title,
                    userId = x.InternShip.UserId,
                    appliedByUser=x.InternId==userid,
                    CV=x.Intern.CV,
                }).FirstOrDefaultAsync();
                return data;
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public async Task<List<InternApplaied_VM>> GetApplaiedJops()
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userId = userManager.FindByNameAsync(username).Result.Id;
            var data = await db.InternApplaieds.Where(x => x.InternId == userId).Select(x => new InternApplaied_VM { InterenId = x.InternId, InternShipId = x.InternShipId, State = x.State, companyName = x.InternShip.User.FullName, userId = x.InternShip.UserId, title = x.InternShip.title }).ToListAsync();
            return data;
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
                        data = await db.Interns.Where(x => x.UserId == user.Id).Select(x => new InternProfile_VM
                        {
                            InterenId = x.InternId,
                            followersCount = x.User.FollowsSender.Count(),
                            followingCount = x.User.FollowsReceiver.Count(),
                            about = x.User.Bio,
                            address = x.User.Location,
                            jobTitle = x.User.jopTitile,
                            field = new FieldVM { FieldId = x.User.FieldId, FieldName = x.User.Field.FieldName },
                            mobile = x.User.PhoneNumber,
                            FullName = x.User.FullName,
                            UserImg = x.User.ProfileImage,
                            userRole = role[0],
                            education = x.Educations.Select(x => new Education_VM
                            {
                                degree = x.Degree,
                                educationID = x.EducationID,
                                endDate = x.EndDate,
                                interenId = x.InternId,
                                fieldOfStudy = x.FieldOfStudy,
                                school = x.School,
                                startDate = x.StartDate,
                                studentActivities = x.StudentActivities,
                            }).FirstOrDefault(),
                            skills = x.Skills.Select(x => new SkillsVM { SkillsId = x.SkillsId, Name = x.Name }).ToList(),
                            availableToWork = x.availableToWork,
                            birthdate = x.Birthday,
                            CV = x.CV,
                            coverImg = x.User.CoverImage,
                        }).FirstOrDefaultAsync();
                    }
                    else
                    {

                        data = await db.Interns.Where(x => x.UserId == userId).Select(x => new InternProfile_VM
                        {
                            InterenId = x.InternId,
                            followersCount = x.User.FollowsSender.Count(),
                            followingCount = x.User.FollowsReceiver.Count(),
                            about = x.User.Bio,
                            address = x.User.Location,
                            jobTitle = x.User.jopTitile,
                            mobile = x.User.PhoneNumber,
                            field = new FieldVM { FieldId = x.User.FieldId, FieldName = x.User.Field.FieldName },
                            FullName = x.User.FullName,
                            UserImg = x.User.ProfileImage,
                            followedHim = x.User.FollowsSender.Any(a => a.FollowSenderId == user.Id),
                            followedMe = x.User.FollowsReceiver.Any(a => a.FollowReceiverId == user.Id),
                            userRole = role[0],
                            education = x.Educations.Select(x => new Education_VM
                            {
                                degree = x.Degree,
                                educationID = x.EducationID,
                                endDate = x.EndDate,
                                interenId = x.InternId,
                                fieldOfStudy = x.FieldOfStudy,
                                school = x.School,
                                startDate = x.StartDate,
                                studentActivities = x.StudentActivities,
                            }).FirstOrDefault(),
                            skills = x.Skills.Select(x => new SkillsVM { SkillsId = x.SkillsId, Name = x.Name }).ToList(),
                            availableToWork = x.availableToWork,
                            birthdate = x.Birthday,
                            CV = x.CV,
                            coverImg = x.User.CoverImage,
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

        public async Task<List<ApplicationUser>> SearchUser(string name)
        {
            var data = await db.Users.Where(w => w.UserName.Contains(name) || w.FullName.Contains(name)).ToListAsync();
            return data;
        }

        public async Task<InternApplaied_VM> UpdateInternApplaied(InternApplaied_VM internApplaied)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userManager.FindByNameAsync(username).Result.Id;
                var data = mapper.Map<InternApplaied>(internApplaied);
                data.InternId = userid;
                var oldInternApplaied = await db.InternApplaieds.Where(w => w.InternId == userid && w.InternShipId == internApplaied.InternShipId).SingleOrDefaultAsync();
                data.internApplaiedQAnswers = oldInternApplaied.internApplaiedQAnswers;
                db.Entry(data).State = EntityState.Modified;
                var res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return internApplaied;
                }
                else
                {
                    return null;
                }

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
                    user.Email = updateIntern.email == null ? user.Email : updateIntern.email;
                    user.Bio = updateIntern.about == null ? user.Bio : updateIntern.about;
                    user.Location = updateIntern.address;
                    user.jopTitile = updateIntern.jobTitle;
                    user.FieldId = updateIntern.fieldId;
                    user.PhoneNumber = updateIntern.mobile;
                    user.FullName = updateIntern.fullName == null ? user.FullName : updateIntern.fullName;
                    var result = await userManager.UpdateAsync(user);
                    if (!result.Succeeded)
                    {
                        return false;
                    }
                    var intern = await db.Interns.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();

                    intern.Birthday = updateIntern.birthdate;
                    intern.availableToWork = updateIntern.availableToWork;
                    if (updateIntern.CVPath!=null)
                    {
                        intern.CV = updateIntern.CVPath;
                    }
                    
                    if (updateIntern.skills != null)
                    {
                        var skils = await db.InternSkills.Where(x => x.Intern.UserId == user.Id).ToListAsync();
                        if (skils != null)
                        {
                            db.InternSkills.RemoveRange(skils);
                            await db.SaveChangesAsync();
                        }

                        List<InternSkills> internSkills = new List<InternSkills>();
                        foreach (var item in updateIntern.skills)
                        {
                            internSkills.Add(new InternSkills { InternId = intern.InternId, SkillsId = (int)item });
                        }
                        await db.InternSkills.AddRangeAsync(internSkills);
                    }

                    if (updateIntern.education != null)
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
        public async Task<internSimpleStatsVM> SimpleStats()
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await userManager.FindByNameAsync(username);
            var data = await db.Interns.Where(x => x.UserId == user.Id).Select(x => new internSimpleStatsVM
            {
                articleCount = x.User.Posts.Count(),
                followers = x.User.FollowsSender.Count(),
                following = x.User.FollowsReceiver.Count(),
                jobTitle = x.User.jopTitile,
                internshipRequests = x.InternApplaieds.Count(),
            }).FirstOrDefaultAsync();
            return data;
        }
     
        public async Task<bool> CancelRequest(int InternShipId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = await userManager.FindByNameAsync(username);
                var data = await db.InternApplaieds.Where(x => x.InternShipId == InternShipId && x.InternId == user.Id).FirstOrDefaultAsync();
                db.InternApplaieds.Remove(data);                
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
        public async Task<ResponseVM<JopVM>> SearchJobs(int? fieldid, int page, int pageSize)
        {
            var rnd = new Random();
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = await userManager.FindByNameAsync(username);
                ResponseVM<JopVM> response = new ResponseVM<JopVM>();
                if (fieldid != null)
                {
                    
                    response.Data = await db.InternShips.Where(x => x.FieldId == fieldid).OrderByDescending(x => x.Createdate).Skip(pageSize * (page - 1)).Take(pageSize).Select(a => new JopVM
                    {
                        id = a.InternShipId,
                        title = a.title,
                        startDate = a.StartDate,
                        endDate = a.EndDate,
                        content = a.Content,
                        companyImg=a.User.ProfileImage,
                        companyJobTitle=a.User.jopTitile,
                        companyName=a.User.FullName,
                        Createdate=a.Createdate,
                        appliedByUser=a.InternApplaieds.Any(x=> x.InternId==user.Id),
                        appliedCount=a.InternApplaieds.Count(),
                        fieldId = a.Field.FieldId,
                        fieldName = a.Field.FieldName,
                        userId = a.User.Id,
                        skillls = a.Skills.Select(a => new SkillsVM { SkillsId = a.SkillsId, Name = a.Name }).ToList(),
                        questions = a.InternShipQuestions.Select(x => new InternShipQuestionsVM { QId = x.QId, QContent = x.QContent }).ToList()
                    }).ToListAsync();
                    response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.InternShips.Where(x => x.FieldId == fieldid).CountAsync() / pageSize));

                }
                else
                {
                    response.Data = await db.InternShips.OrderByDescending(x => x.Createdate).Skip(pageSize * (page - 1)).Take(pageSize).Select(a => new JopVM
                    {
                        id = a.InternShipId,
                        title = a.title,
                        startDate = a.StartDate,
                        endDate = a.EndDate,
                        content = a.Content,
                        companyImg = a.User.ProfileImage,
                        companyJobTitle = a.User.jopTitile,
                        companyName = a.User.FullName,
                        Createdate = a.Createdate,
                        appliedByUser = a.InternApplaieds.Any(x => x.InternId == user.Id),
                        appliedCount = a.InternApplaieds.Count(),
                        fieldId = a.Field.FieldId,
                        fieldName = a.Field.FieldName,
                        userId = a.User.Id,
                        skillls = a.Skills.Select(a => new SkillsVM { SkillsId = a.SkillsId, Name = a.Name }).ToList(),
                        questions = a.InternShipQuestions.Select(x => new InternShipQuestionsVM { QId = x.QId, QContent = x.QContent }).ToList()
                    }).ToListAsync();
                    response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.InternShips.CountAsync() / pageSize));

                }
                response.Data = response.Data.OrderBy(item => rnd.Next());
                response.CurrentPage = page;
                return response;
            }
            catch (Exception ex)
            {

                return null;
            }
            
            



        }

    }
}
