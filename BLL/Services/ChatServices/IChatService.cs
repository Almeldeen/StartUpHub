using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.ChatServices
{
   public interface IChatService
    {
        public Task<MessageVM> SendMsg(MessageVM messege);
        public Task<ResponseVM<ChatVM>> GetChat(int page, int pageSize);
        public Task<ResponseVM<MessageVM>> GetMsgsChat(int chatId, int page, int pageSize);
        public Task<int> UnReadMsgCount();
        public  Task<bool> ReadMsg(int chatId);
        public  Task<int> GetMsgsChatByUserId(string userId, int page, int pageSize);
    }
}
