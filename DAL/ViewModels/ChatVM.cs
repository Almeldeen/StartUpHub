using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class ChatVM
    {
        public int ChatId { get; set; }
        public string UserId { get; set; }
        public string UserImg{ get; set; }
        public string UserName{ get; set; }
        public string LastMsg{ get; set; }
        public DateTimeOffset LastMsgDate{ get; set; }
    }
}
