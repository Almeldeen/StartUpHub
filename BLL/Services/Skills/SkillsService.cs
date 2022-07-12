using DAL.Reproisitry.SkillsRepos;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Skills
{
   public  class SkillsService : ISkillsService
    {
        private readonly ISkillsRepo repo;

        public SkillsService(ISkillsRepo repo )
        {
            this.repo = repo;
        }
        public  async Task<SkillsVM> AddSkillsAsync(SkillsVM skills)
        {
            return await repo.AddSkillsAsync(skills);
        }

        public async Task<int> DeleteSkillsAsync(int id)
        {
            return await repo.DeleteSkillsAsync(id);
        }

        public async Task<SkillsVM> EditSkillsAsync(SkillsVM skills)
        {
            return await repo.EditSkillsAsync(skills);
        }

        public async Task<ResponseVM<SkillsVM>> GetAllSkillsAsync(int? feildId, int page, int pageSize)
        {
            return await repo.GetAllSkillsAsync(feildId, page, pageSize);
        }

        public Task<SkillsVM> GetByIdSkillsAsync(int id)
        {
            throw new NotImplementedException();
        }

        //public async Task<SkillsVM> GetAllSkillsAsync(int? feildId, int page, int pageSize)
        //{
        //    return await repo.GetByIdSkillsAsync(feildId, page, pageSize);
        //}
    }
}
