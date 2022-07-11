using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class CommentVM
    {
        public int Id { get; set; }
        public int rating { get; set; }
        public string Content { get; set; }
        public DateTimeOffset createDate { get; set; }
        public string ratedByUser { get; set; }
        public string userName { get; set; }
        public string userId { get; set; }
        public string userRole { get; set; }
        public string jobTitle { get; set; }
        public string userImg { get; set; }


    }

}
