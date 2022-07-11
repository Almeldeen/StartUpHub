using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class TimeLineVM
    {
        public List<PostVM> Posts { get; set; }
        public List<JopVM> Jops { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
    }
}
