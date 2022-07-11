using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class NotificationVM
    {
        public int Id { get; set; }     
        public string SenderId { get; set; }   
        public string UserImg { get; set; }   
        public string UserName { get; set; }   
        public string ReciverId { get; set; }     
        public string Content { get; set; }
        public string Type { get; set; }
        public bool Read { get; set; }
        public int? PostId { get; set; }
        public int? JopId { get; set; }
    }
}
