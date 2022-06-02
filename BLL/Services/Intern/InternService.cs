using DAL.Reproisitry.InternRepos;
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
        private readonly IInternRepos repo;

        public InternService(IInternRepos repo)
        {
            this.repo = repo;
        }
        public async Task<InternApplaied_VM> AddInternApplaied(InternApplaied_VM internApplaied)
        {
            return await repo.AddInternApplaied(internApplaied);
        }

        public async Task<InternApplaied_VM> GetApllaiedJopById(int InternShipId)
        {
            return await repo.GetApllaiedJopById(InternShipId);
        }

        public async Task<List<InternApplaied_VM>> GetApplaiedJops()
        {
            return await repo.GetApplaiedJops();
        }

        public async Task<InternProfile_VM> GetProfile()
        {
            return await repo.GetProfile();

        }
    }
}
