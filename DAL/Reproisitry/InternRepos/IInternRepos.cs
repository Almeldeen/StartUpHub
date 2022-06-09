﻿using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.InternRepos
{
    public interface IInternRepos
    {
        public Task<InternProfile_VM> GetProfile( );
        public Task<InternApplaied_VM> AddInternApplaied(InternApplaied_VM internApplaied);
        public Task<List<InternApplaied_VM>> GetApplaiedJops();
        public Task<InternApplaied_VM> GetApllaiedJopById(int InternShipId);
        public  Task<bool> UpdateProfile(UpdateInternVM updateIntern);
    }
}
