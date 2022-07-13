using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.NotificationRepos
{
   public interface INotificationRepo
    {
        public Task<NotificationVM> AddNotification(NotificationVM notification);
        public Task<ResponseVM<NotificationVM>> GetAllNotifications(int pagenum, int pagesize);
        public Task<bool> ReadNotifications(int notificationId);

    }
}
