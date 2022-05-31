using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        

        public JopRepo(ApplicationDbContext db  , IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
           
        }
        public async Task<JopVM> AddJop(JopVM jop)
        {
            try
            {
                var data = mapper.Map<Jop>(jop);
                data.UserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                await db.Jops.AddAsync(data);
                var res = await db.SaveChangesAsync();
                if (res <=0)
                {
                    return null;

                }
                List<JopSkills> jopskills = new List<JopSkills> ();
                foreach (var item in jop.skills)
                {
                    jopskills.Add(new JopSkills { JopId = data.Id, SkillsId = item.SkillsId });

                }
                await db.JopSkills.AddRangeAsync(jopskills);
                var result = await db.SaveChangesAsync();
                if (result > 0)
                {
                    jop.id = data.Id;
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
                var data = await db.Jops.FindAsync(id);
                db.Jops.Remove(data);
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

        public Task<List<JopVM>> GetAllJop()
        {
            throw new NotImplementedException();
        }
    }
}
