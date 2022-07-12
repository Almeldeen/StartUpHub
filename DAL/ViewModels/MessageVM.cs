using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
  public  class MessageVM
    {
        public int Id { get; set; }
        public int? ChatId { get; set; }
        public string SenderId { get; set; }
        public string SenderImg { get; set; }
        public string SenderName { get; set; }
        public string ReciverImg { get; set; }
        public string ReciverName { get; set; }
        public string ReciverId { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public bool Read { get; set; }    
        public DateTimeOffset Createdate { get; set; }
    }
}
