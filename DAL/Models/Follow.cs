using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Follow
    {
       
        [ForeignKey("FollowSender")]
        public string FollowSenderId { get; set; }
        public ApplicationUser FollowSender { get; set; }
        [ForeignKey("FollowReceiver")]
        public string FollowReceiverId { get; set; }
        public ApplicationUser FollowReceiver { get; set; }




    }
}
