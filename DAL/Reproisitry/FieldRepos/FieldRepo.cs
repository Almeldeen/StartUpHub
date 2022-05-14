using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.Reproisitry.FieldRepos;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.FieldRepos
{

    public class FieldRepo : IFieldRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;

        public FieldRepo( ApplicationDbContext db  , IMapper mapper  )
        {
            this.db = db;
            this.mapper = mapper;
        }
        #region Add
        public async Task<FieldVM> AddFieldAsync(FieldVM  field)
        {
            try
            {
                var data = mapper.Map<Field>(field);
                await db.Fields.AddAsync(data);
                var res = await db.SaveChangesAsync();
                if (res >0)
                {
                    field.FieldId = data.FieldId;
                    return field;
                }
                return null;

            }
            catch (Exception ex)
            {

                return null;
            }
        }
        #endregion
        #region Edit
        public async Task<FieldVM> EditFieldAsync(FieldVM field)
        {
            try
            {
                var data = mapper.Map<Field>(field);
                db.Entry(data).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    field.FieldId = data.FieldId;
                    return field;
                }
                return null;
            }
            catch (Exception)
            {

                return null;
            }
        }
        #endregion
        #region Delete
        public async Task<int> DeleteFieldAsync(int id)
        {
            try
            {
                var data = await db.Fields.FindAsync(id);
                db.Fields.Remove(data);
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
        #region GetById
        public async Task<FieldVM> GetByIdFieldAsync(int id)
        {
            
            var data = db.Fields.Where(a => a.FieldId == id).Select(a => new FieldVM { FieldId = a.FieldId, FieldName = a.FieldName }).FirstOrDefault();
            return data;
        }
        #endregion
        #region GetAll
        public async Task<List<FieldVM>> GetAllFieldAsync()
        {
            var data = db.Fields.Select(a => new FieldVM { FieldId = a.FieldId, FieldName = a.FieldName }).ToList();
            return data;
        }
        #endregion
    }
}
