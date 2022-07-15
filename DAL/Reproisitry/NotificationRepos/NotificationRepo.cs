using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.NotificationRepos
{
    public class NotificationRepo : INotificationRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userMangger;

        public NotificationRepo(ApplicationDbContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userMangger)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userMangger = userMangger;
        }
        public async Task<NotificationVM> AddNotification(NotificationVM notification)
        {
            try
            {
                var data = mapper.Map<Notifications>(notification);
                await db.Notifications.AddAsync(data);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return notification;
                }
                return null;

            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public async Task<ResponseVM<NotificationVM>> GetAllNotifications(int pagenum, int pagesize)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userid = userMangger.FindByNameAsync(username).Result.Id;
                ResponseVM<NotificationVM> response = new ResponseVM<NotificationVM>();
                response.Data = await db.Notifications.OrderByDescending(x => x.Createdate).Where(x => x.ReciverId == userid && x.Read == false).Skip(pagesize * (pagenum - 1)).Take(pagesize).Select(x => new NotificationVM
                {
                    SenderId = x.SenderId,
                    Createdate = x.Createdate,
                    Id = x.Id,
                    JopId = x.JopId,
                    PostId = x.PostId,
                    Read = x.Read,
                    ReciverId = x.ReciverId,
                    Type = x.Type,
                    UserImg = x.Sender.ProfileImage,
                    UserName = x.Sender.FullName,

                }).ToListAsync();
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Notifications.Where(x => x.ReciverId == userid && x.Read == false).CountAsync() / pagesize));
                response.CurrentPage = pagenum;
                return response;
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public async Task<bool> ReadNotifications(int notificationId)
        {
            try
            {
                var data = await db.Notifications.Where(x => x.Id == notificationId).FirstOrDefaultAsync();
                db.Notifications.Remove(data);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
        public async Task<int> UnReadNotificationCount()
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var User = await userMangger.FindByNameAsync(username);
                var count = await db.Notifications.Where(x => x.ReciverId == User.Id && x.Read == false).CountAsync();
                return count;
            }
            catch (Exception ex)
            {

                return 0;
            }
        }
    }
}
