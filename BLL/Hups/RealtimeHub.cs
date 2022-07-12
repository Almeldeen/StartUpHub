using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Hups
{
   public class RealtimeHub:Hub
    {
        private readonly ApplicationDbContext db;

        public RealtimeHub(ApplicationDbContext db)
        {
            this.db = db;
        }
        public override Task OnConnectedAsync()
        {
            Context.Items.Add(Context.UserIdentifier, Context.ConnectionId);
            db.OnlineUsers.Add(new OnlineUser { UserId = Context.UserIdentifier, ConnectionId = Context.ConnectionId });
            db.SaveChanges();
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            Context.Items.Remove(Context.UserIdentifier);
            db.Remove(db.OnlineUsers.Find(Context.UserIdentifier));
            return base.OnDisconnectedAsync(exception); 
        }
    }
}
