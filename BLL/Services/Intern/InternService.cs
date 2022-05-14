using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Intern
{
    public class InternService : IInternService
    {
        public Task<InternProfile_VM> GetProfile()
        {
            throw new NotImplementedException();
        }
    }
}
