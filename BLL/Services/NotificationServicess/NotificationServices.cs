using DAL.Reproisitry.NotificationRepos;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.NotificationServicess
{
    public class NotificationServices : INotificationServices
    {
        private readonly INotificationRepo repo;

        public NotificationServices(INotificationRepo repo)
        {
            this.repo = repo;
        }
        public async Task<List<NotificationVM>> GetAllNotifications(int pagenum, int pagesize)
        {
            return await repo.GetAllNotifications(pagenum, pagesize);
        }

        public async Task<bool> ReadNotifications(int notificationId)
        {
            return await repo.ReadNotifications(notificationId);
        }
    }
}
