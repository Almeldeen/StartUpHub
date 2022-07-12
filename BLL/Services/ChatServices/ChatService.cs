using DAL.Reproisitry.ChatRepos;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.ChatServices
{
    public class ChatService : IChatService
    {
        private readonly IChatRepo repo;

        public ChatService(IChatRepo repo)
        {
            this.repo = repo;
        }
        public Task<ResponseVM<ChatVM>> GetChat(int page, int pageSize)
        {
            return repo.GetChat(page, pageSize);
        }

        public Task<ResponseVM<MessageVM>> GetMsgsChat(int chatId, int page, int pageSize)
        {
            return repo.GetMsgsChat(chatId,page, pageSize);

        }

        public Task<MessageVM> SendMsg(MessageVM messege)
        {
            return repo.SendMsg(messege);
        }
    }
}
