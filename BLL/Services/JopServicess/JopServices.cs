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

        public async Task<ResponseVM<JopVM>> GetAllJop(string companyId, int page, int pageSize)
        {
            return await repo.GetAllJop( companyId,page, pageSize);
        }
        public async Task<JopVM> GetJopDetails(int jopId)
        {
            return await repo.GetJopDetails(jopId);

        }
        public async Task<CompanySimpleStatsVM> SimpleStats()
        {
            return await repo.SimpleStats();
        }

        public async Task<List<JopVM>> SearchJop(string name)
        {
            return await repo.SearchJop( name);
        }
        public async Task<bool> ChangeState(int InternShipId, string InternId, string State)
        {
            return await repo.ChangeState(InternShipId, InternId, State);
        }
        public async Task<ResponseVM<InternAppliedCompanyVM>> GetAllAppliedIntern(int InternShipId, int page, int pageSize)
        {
            return await repo.GetAllAppliedIntern(InternShipId, page, pageSize);
        }
        public async Task<InternApplaied_VM> GetApllaiedJopById(int internShipId, string internId)
        {
            return await repo.GetApllaiedJopById(internShipId, internId);

        }
        public async Task<bool> UpdateProfile(UpdateInternVM updateIntern)
        {           
            return await repo.UpdateProfile(updateIntern);
        }
        public async Task<InternProfile_VM> GetProfile(string userId)
        {
            return await repo.GetProfile(userId);

        }
    }
}
