using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.JopServicess
{
   public interface IJopServices
    {
        public Task<JopVM> AddJop(JopVM jop);
        public Task<int> DeleteJop(int id);
        public Task<ResponseVM<JopVM>> GetAllJop(string companyId, int page, int pageSize);
        public Task<JopVM> GetJopDetails(int jopId);
        public Task<List<JopVM>> SearchJop(string name);
        public Task<bool> ChangeState(int InternShipId, string InternId, string State);
        public Task<ResponseVM<InternAppliedCompanyVM>> GetAllAppliedIntern(int InternShipId, int page, int pageSize);
        public  Task<CompanySimpleStatsVM> SimpleStats();
        public  Task<InternApplaied_VM> GetApllaiedJopById(int internShipId, string internId);
        public Task<InternProfile_VM> GetProfile(string userId);
        public Task<bool> UpdateProfile(UpdateInternVM updateIntern);

    }
}
