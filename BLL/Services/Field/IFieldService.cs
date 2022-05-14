using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Field
{
   public  interface IFieldService
    {
        public Task<FieldVM> AddFieldAsync(FieldVM field);
        public Task<FieldVM> EditFieldAsync(FieldVM field);
        public Task<int> DeleteFieldAsync(int id);
        public Task<FieldVM> GetByIdFieldAsync(int id);
        public Task<List<FieldVM>> GetAllFieldAsync();
    }
}
