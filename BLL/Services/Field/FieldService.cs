using DAL.Reproisitry.FieldRepos;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Field
{
   
    public class FieldService : IFieldService
    {
        private readonly IFieldRepo repo;

        public FieldService(IFieldRepo repo )
        {
            this.repo = repo;
        }
        public async Task<FieldVM> AddFieldAsync(FieldVM field)
        {
            return await repo.AddFieldAsync(field);
        }

        public async Task<int> DeleteFieldAsync(int id)
        {
            return await repo.DeleteFieldAsync(id);
        }

        public async Task<FieldVM> EditFieldAsync(FieldVM field)
        {
            return await repo.EditFieldAsync(field);
        }

        public async Task<List<FieldVM>> GetAllFieldAsync()
        {
            return await repo.GetAllFieldAsync();
        }

        public async Task<FieldVM> GetByIdFieldAsync(int id)
        {
            return await repo.GetByIdFieldAsync(id);
        }
    }
}
