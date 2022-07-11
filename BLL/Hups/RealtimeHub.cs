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
        public override Task OnConnectedAsync()
        {
            Context.Items.Add(Context.UserIdentifier, Context.ConnectionId);
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            Context.Items.Remove(Context.UserIdentifier);
            return base.OnDisconnectedAsync(exception); 
        }
    }
}
