using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class ChatMsgs: RealtimeModel
    {
        [ForeignKey("ChatId")]
        public int ChatId { get; set; }
        public Chat Chat { get; set; }

    }
}
