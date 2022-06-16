﻿using DAL.Reproisitry.JopRepo;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.JopServicess
{
   public class JopServices: IJopServices
    {
        private readonly IJopRepo repo;

        public JopServices(IJopRepo repo)
        {
            this.repo = repo;
        }

        public async Task<JopVM> AddJop(JopVM jop)
        {
            return await repo.AddJop(jop);
        }

        public async Task<int> DeleteJop(int id)
        {
            return await repo.DeleteJop(id);
        }

        public async Task<List<JopVM>> GetAllJop()
        {
            return await repo.GetAllJop();
        }
    }
}