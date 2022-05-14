using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.SkillsRepos
{
    public class SkillsRepo : ISkillsRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;

        public SkillsRepo(ApplicationDbContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
        }
        #region Add
        public async Task<SkillsVM> AddSkillsAsync(SkillsVM skills)
        {
            try
            {
                var data = mapper.Map<Skills>(skills);
                await db.Skills.AddAsync(data);
                var res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    skills.SkillsId = data.SkillsId;
                    return skills;
                }
                return null;

            }
            catch (Exception ex)
            {

                return null;
            }
        }
        #endregion
        #region Delete
        public async Task<int> DeleteSkillsAsync(int id)
        {
            try
            {
                var data = await db.Skills.FindAsync(id);
                db.Skills.Remove(data);
                var res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return 1;
                }
                return 0;
            }
            catch (Exception)
            {
                return 0;

            }

        }
        #endregion
        #region Edit
        public async Task<SkillsVM> EditSkillsAsync(SkillsVM skills)
        {
            try
            {
                var data = mapper.Map<Skills>(skills);
                db.Entry(data).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    skills.SkillsId = data.SkillsId;
                    return skills;
                }
                return null;
            }
            catch (Exception)
            {

                return null;
            }
        }
        #endregion
        #region GetAll
        public async Task<List<SkillsVM>> GetAllSkillsAsync()
        {
            var data =await db.Skills.Select(a => new SkillsVM { SkillsId = a.SkillsId, Name = a.Name, FieldId = a.Field.FieldId , FieldName=a.Field.FieldName}).ToListAsync();
            return data;
        }
        #endregion
        #region GetById
        public async Task<SkillsVM> GetByIdSkillsAsync(int id)
        {
            var data =await db.Skills.Where(a => a.SkillsId == id).Select(a => new SkillsVM { SkillsId = a.SkillsId, Name = a.Name, FieldId = a.Field.FieldId , FieldName=a.Field.FieldName }).FirstOrDefaultAsync();
            return data;
        }
        #endregion
    }
}
