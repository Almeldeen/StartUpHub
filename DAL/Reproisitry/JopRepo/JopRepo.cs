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
                if (jop.skillls.Count>0)
                {
                    List<InternShipSkils> jopskills = new List<InternShipSkils>();
                    foreach (var item in jop.skillls)
                    {
                        jopskills.Add(new InternShipSkils { InternShipId = data.InternShipId, SkillsId = item.SkillsId });

                    }
                    await db.InternShipSkils.AddRangeAsync(jopskills);
                }
                if (jop.questions.Count>0)
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
    }
}
