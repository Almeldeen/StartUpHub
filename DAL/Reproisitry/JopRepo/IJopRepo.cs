﻿using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.JopRepo
{
    public interface IJopRepo
    {
        public Task<JopVM> AddJop(JopVM jop);
        public Task<int> DeleteJop(int id);
        public Task<List<JopVM>> GetAllJop();
    }
}
