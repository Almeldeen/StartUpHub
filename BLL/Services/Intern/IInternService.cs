using DAL.Data;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Intern
{
    public interface IInternService
    {
        public Task<InternProfile_VM> GetProfile();
        public Task<bool> UpdateProfile(UpdateInternVM updateIntern);
        public Task<InternApplaied_VM> AddInternApplaied(InternApplaied_VM internApplaied);
        public Task<List<InternApplaied_VM>> GetApplaiedJops();
        public Task<InternApplaied_VM> GetApllaiedJopById(int InternShipId);
        public Task<string> ChangePhoto(IFormFile image , string type);
        public Task<InternApplaied_VM> UpdateInternApplaied(InternApplaied_VM internApplaied);
        public Task<List<ApplicationUser>> SearchUser(string name);
    }
}
