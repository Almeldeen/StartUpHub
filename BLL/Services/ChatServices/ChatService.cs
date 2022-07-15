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
        public async Task<ResponseVM<ChatVM>> GetChat(int page, int pageSize)
        {
            return await repo.GetChat(page, pageSize);
        }

        public async Task<ResponseVM<MessageVM>> GetMsgsChat(int chatId, int page, int pageSize)
        {
            return await repo.GetMsgsChat(chatId,page, pageSize);

        }

        public async Task<MessageVM> SendMsg(MessageVM messege)
        {
            return await repo.SendMsg(messege);
        }
        public async Task<int> UnReadMsgCount()
        {
            return await repo.UnReadMsgCount();

        }
        public async Task<bool> ReadMsg(int chatId)
        {
            return await repo.ReadMsg(chatId);

        }
    }
}
