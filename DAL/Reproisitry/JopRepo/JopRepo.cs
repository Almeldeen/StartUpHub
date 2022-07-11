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
                var data = await db.InternShips.FindAsync(id);
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

        public async Task<List<InternAppliedCompanyVM>> GetAllAppliedIntern(int intershipid)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userManager.FindByNameAsync(username).Result.Id;
                var data = await db.InternApplaieds.Where(a => a.InternShip.UserId == userid && a.InternShipId == intershipid).Select(x => new InternAppliedCompanyVM { InternId = x.InternId, FullName = x.Intern.User.FullName, jopTitile = x.Intern.User.jopTitile, Nationality = x.Intern.Nationality, Birthday = x.Intern.Birthday, College = x.Intern.College, CV = x.Intern.CV, Gender = x.Intern.Gender, State = x.State, ProfileImage = x.Intern.User.ProfileImage, availableToWork = x.Intern.availableToWork }).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {

                return null;
            }
            
        }

        public async Task<List<JopVM>> GetAllJop()
        {
            var data = await db.InternShips.Select(a => new JopVM { id = a.InternShipId, title = a.title, startDate = a.StartDate, endDate = a.EndDate, content = a.Content, fieldId = a.Field.FieldId, fieldName = a.Field.FieldName, userId = a.User.Id, skillls = a.Skills.Select(a => new SkillsVM { SkillsId = a.SkillsId, Name = a.Name }).ToList(),questions=a.InternShipQuestions.Select(x=> new InternShipQuestionsVM { QId=x.QId,QContent=x.QContent}).ToList() }).ToListAsync();
            return data;
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
    }
}
