using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.NotificationServicess
{
    public interface INotificationServices
    {
        public Task<ResponseVM<NotificationVM>> GetAllNotifications(int pagenum, int pagesize);
        public Task<bool> ReadNotifications(int notificationId);
        public  Task<int> UnReadNotificationCount();

    }
}
