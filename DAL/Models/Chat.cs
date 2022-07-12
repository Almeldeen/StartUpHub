using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class Chat
    {
        public int Id { get; set; }
        [ForeignKey("SenderId")]
        public string SenderId { get; set; }
        public ApplicationUser Sender { get; set; }
        [ForeignKey("ReciverId")]
        public string ReciverId { get; set; }
        public ApplicationUser Reciver { get; set; }
        public List<ChatMsgs> Msgs { get; set; }
    }
}
