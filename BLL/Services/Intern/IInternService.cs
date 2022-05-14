using DAL.ViewModels;
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
    }
}
