﻿using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Skills
{
    public interface ISkillsService
    {
        public Task<SkillsVM> AddSkillsAsync(SkillsVM skills);
        public Task<SkillsVM> EditSkillsAsync(SkillsVM skills);
        public Task<int> DeleteSkillsAsync(int id);
        public Task<SkillsVM> GetByIdSkillsAsync(int id);
        public Task<ResponseVM<SkillsVM>> GetAllSkillsAsync(int? feildId, int page, int pageSize);
    }
}
