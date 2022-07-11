using AutoMapper;
using DAL.Data;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public Task<NotificationVM> AddNotification(NotificationVM notification)
        {
            throw new NotImplementedException();
        }

        public Task<List<NotificationVM>> GetAllNotifications()
        {
            throw new NotImplementedException();
        }

        public Task<bool> ReadNotifications(int notificationId)
        {
            throw new NotImplementedException();
        }
    }
}
