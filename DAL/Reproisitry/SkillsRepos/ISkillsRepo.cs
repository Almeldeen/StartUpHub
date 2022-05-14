using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.SkillsRepos
{
   public  interface ISkillsRepo
    {
        public Task<SkillsVM> AddSkillsAsync(SkillsVM skills);
        public Task<SkillsVM> EditSkillsAsync(SkillsVM skills);
        public Task<int> DeleteSkillsAsync(int id);
        public Task<SkillsVM> GetByIdSkillsAsync(int id);
        public Task<List<SkillsVM>> GetAllSkillsAsync();
    }
}
