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

namespace DAL.Reproisitry.ChatRepos
{
    public class ChatRepo : IChatRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userMangger;

        public ChatRepo(ApplicationDbContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userMangger)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userMangger = userMangger;
        }
      

        public async Task<ResponseVM<ChatVM>> GetChat(int page,int pageSize)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var User = await userMangger.FindByNameAsync(username);
                ResponseVM<ChatVM> response = new ResponseVM<ChatVM>();
                List<ChatVM> chats = new List<ChatVM>();
                chats.AddRange(await db.Chats.Where(x => x.SenderId == User.Id).Select(x => new ChatVM { ChatId = x.Id, UserId = x.ReciverId, UserImg = x.Reciver.ProfileImage, UserName = x.Reciver.UserName,LastMsg=x.Msgs.Select(x=> x.Content).LastOrDefault(),LastMsgDate=x.Msgs.Select(x=> x.Createdate).LastOrDefault() }).ToListAsync());
                chats.AddRange(await db.Chats.Where(x => x.ReciverId == User.Id).Select(x => new ChatVM { ChatId = x.Id, UserId = x.SenderId, UserImg = x.Sender.ProfileImage, UserName = x.Sender.UserName, LastMsg = x.Msgs.Select(x => x.Content).LastOrDefault(), LastMsgDate = x.Msgs.Select(x => x.Createdate).LastOrDefault() }).ToListAsync());
                response.Data = chats.OrderByDescending(x=> x.LastMsgDate).Skip(pageSize * (page - 1)).Take(pageSize);
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Chats.Where(x => x.SenderId == User.Id|| x.ReciverId == User.Id).CountAsync() / pageSize));
                response.CurrentPage = page;
                return response;

            }
            catch (Exception ex)
            {
                ResponseVM<ChatVM> response = new ResponseVM<ChatVM>() {errormsg=ex.Message };

                return response;
            }
        }

        public async Task<ResponseVM<MessageVM>> GetMsgsChat(int chatId, int page, int pageSize)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var User = await userMangger.FindByNameAsync(username);
                ResponseVM<MessageVM> response = new ResponseVM<MessageVM>();
                response.Data = await db.ChatMsgs.Where(x => x.ChatId == chatId && (x.SenderId == User.Id || x.ReciverId == User.Id)).OrderByDescending(x=> x.Createdate)
                   .Skip(pageSize * (page - 1)).Take(pageSize).Select(x => new MessageVM
                {
                    ChatId = x.ChatId,
                    SenderId = x.SenderId,
                    Content = x.Content,
                    Createdate = x.Createdate,
                    Read = x.Read,
                    ReciverId = x.ReciverId,
                    ReciverImg = x.Reciver.ProfileImage,
                    ReciverName = x.Reciver.FullName,
                    SenderName = x.Sender.FullName,
                    SenderImg = x.Sender.ProfileImage,
                    Id = x.Id
                }).ToListAsync();
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.ChatMsgs.Where(x => x.ChatId == chatId && (x.SenderId == User.Id || x.ReciverId == User.Id)).CountAsync() / pageSize));
                response.CurrentPage = page;
                return response;
            }
            catch (Exception ex)
            {

                ResponseVM<MessageVM> response = new ResponseVM<MessageVM>() { errormsg = ex.Message };

                return response;
            }
        }

        public async Task<MessageVM> SendMsg(MessageVM messege)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var User = await userMangger.FindByNameAsync(username);
                if (messege.ChatId==null)
                {
                    var NewChat = new Chat() { SenderId = User.Id, ReciverId = messege.ReciverId };
                    await db.AddAsync(NewChat);
                    int res1 = await db.SaveChangesAsync();
                    if (res1<0)
                    {
                        return null;
                    }
                    messege.ChatId = NewChat.Id;
                }
                messege.SenderId = User.Id;
                messege.Createdate = DateTimeOffset.Now;
                var data = mapper.Map<Chat>(messege);               
                await db.Chats.AddAsync(data);
                int res = await db.SaveChangesAsync();
                if (res>0)
                {
                    messege.Id = data.Id;
                    return messege;
                }
                return null;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
