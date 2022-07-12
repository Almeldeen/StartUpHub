using DAL.Data;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Helper.SendNotifay
{
   public interface ISendNotification
    {
        public  Task SendNotifcation(string ReciverId, int? JopId,int?PostId, string type);
        public Task SendNewJopNotifcation(int? JopId, int? feildId, string type);
        public Task SendMsg(MessageVM message);

    }
}
