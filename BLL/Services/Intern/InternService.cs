using BLL.Helper;
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
        private readonly IHttpContextAccessor httpContextAccessor;

        public InternService(IInternRepos repo, IHttpContextAccessor httpContextAccessor)
        {
            this.repo = repo;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<InternApplaied_VM> AddInternApplaied(InternApplaied_VM internApplaied)
        {
            return await repo.AddInternApplaied(internApplaied);
        }

     

        public async Task<string> ChangePhoto(IFormFile image, string type)
        {
            try
            {
                string Path = string.Empty;
                if (type == "Profile")
                {
                    string FileName = await SaveFiles.SaveFileAsync(image, FilePath.Profile);
                    Path = httpContextAccessor.HttpContext.Request.Host.Value + "/ImagesProfile/" + FileName;
                }
                else if (type == "Cover")
                {
                    string FileName = await SaveFiles.SaveFileAsync(image, FilePath.Cover);
                    Path = httpContextAccessor.HttpContext.Request.Host.Value + "/ImagesCover/" + FileName;

                }


                return await repo.ChangePhoto(Path, type);
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
           

        }

        public async Task<InternApplaied_VM> GetApllaiedJopById(int InternShipId)
        {
            return await repo.GetApllaiedJopById(InternShipId);
        }

        public async Task<List<InternApplaied_VM>> GetApplaiedJops()
        {
            return await repo.GetApplaiedJops();
        }

        public async Task<InternProfile_VM> GetProfile(string userId)
        {
            return await repo.GetProfile(userId);

        }
        public async Task<bool> UpdateProfile(UpdateInternVM updateIntern)
        {
            if (updateIntern.CV!=null)
            {
                string FileName = await SaveFiles.SaveFileAsync(updateIntern.CV, FilePath.CV);
                updateIntern.CVPath = httpContextAccessor.HttpContext.Request.Host.Value + "/CVs/" + FileName;
            }
           
            return await repo.UpdateProfile(updateIntern);
        }
        public async Task<internSimpleStatsVM> SimpleStats()
        {
            return await repo.SimpleStats();
        }
    }
}
