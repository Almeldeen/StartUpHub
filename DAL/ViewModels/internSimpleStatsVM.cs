using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class internSimpleStatsVM
    {
        public int articleCount { get; set; }
        public int internshipRequests { get; set; }
        public int followers { get; set; }
        public int following { get; set; }
        public string jobTitle { get; set; }
    }
}
