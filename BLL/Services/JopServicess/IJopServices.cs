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
        public Task<List<JopVM>> GetAllJop();
        public Task<JopVM> GetJopDetails(int jopId);
        public Task<List<JopVM>> SearchJop(string name);
    }
}
