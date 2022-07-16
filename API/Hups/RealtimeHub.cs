using BLL.Helper;
using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Hups
{
   [Authorize]
    public class RealtimeHub:Hub
    {
       
        public override Task OnConnectedAsync()
        {
            try
            {                                      
                Context.Items.Add(Context.UserIdentifier, Context.ConnectionId);
                return base.OnConnectedAsync();
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public override Task OnDisconnectedAsync(Exception exception)
        {          
            Context.Items.Remove(Context.UserIdentifier);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
