using API.Hups;
using DAL.Data;
using DAL.Reproisitry.NotificationRepos;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.HupHelper.SendNotifay
{
    public  class SendNotification: ISendNotification
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly INotificationRepo notificationRepo;
        private readonly IHubContext<RealtimeHub> hubContext;
        private readonly ApplicationDbContext db;

        public SendNotification(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, INotificationRepo notificationRepo,
            IHubContext<RealtimeHub> hubContext,ApplicationDbContext db)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
            this.notificationRepo = notificationRepo;
            this.hubContext = hubContext;
            this.db = db;
        }
        public  async Task SendNotifcation(string ReciverId, int? JopId,int?PostId,string type)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = await userManager.FindByNameAsync(username);
                NotificationVM notification = new NotificationVM()
                {
                    Type = type,
                    SenderId = user.Id,
                    ReciverId = PostId != null ? await db.Posts.Where(x => x.PostId == PostId).Select(x => x.UserId).FirstOrDefaultAsync() : ReciverId,
                    UserName = user.FullName,
                    UserImg = user.ProfileImage,
                    Read = false,
                    JopId = JopId,
                    PostId = PostId,
                    Createdate = DateTimeOffset.Now
                };
                notification.SenderRole = userManager.GetRolesAsync(user).Result.FirstOrDefault();
                if (notification.ReciverId!=notification.SenderId)
                {
                    var recivername = await userManager.FindByIdAsync(notification.ReciverId);
                    await notificationRepo.AddNotification(notification);
                    await hubContext.Clients.User(recivername.UserName).SendAsync("getNotifcation", notification);
                }

            }
            catch (Exception ex)
            {

                throw;
            }
           
            
        }
        public async Task SendNewJopNotifcation(int? JopId,int? feildId, string type)
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await userManager.FindByNameAsync(username);
            
           
            var userIds = await db.Interns.Where(x => x.User.FieldId == feildId).Select(x => x.InternId).ToListAsync();
            foreach (var item in userIds)
            {
                NotificationVM notification = new NotificationVM()
                {
                    Type = type,
                    SenderId = user.Id,
                    UserName = user.FullName,
                    ReciverId = item,
                    UserImg = user.ProfileImage,
                    Read = false,
                    JopId = JopId,
                    Createdate = DateTimeOffset.Now
                };
                notification.SenderRole = userManager.GetRolesAsync(user).Result.FirstOrDefault();
                var recivername = await userManager.FindByIdAsync(notification.ReciverId);
                await notificationRepo.AddNotification(notification);
                await hubContext.Clients.User(recivername.UserName).SendAsync("getNotifcation", notification);
            }

        }

        public async Task SendMsg(MessageVM message)
        {
            var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await userManager.FindByNameAsync(username);
            NotificationVM notification = new NotificationVM()
            {
                Type = "NEWMSG",
                SenderId = user.Id,
                UserName = user.FullName,
                ReciverId = message.ReciverId,
                UserImg = user.ProfileImage,
                Read = false,
                Createdate = message.Createdate
            };
            await notificationRepo.AddNotification(notification);
            var recivername = await userManager.FindByIdAsync(notification.ReciverId);
            await hubContext.Clients.User(recivername.UserName).SendAsync("reciveMsg", message);
            await hubContext.Clients.All.SendAsync("getNotifcation", notification);

        }
    }
}

