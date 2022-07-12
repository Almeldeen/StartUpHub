using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class CompanySimpleStatsVM
    {
        public int articleCount { get; set; }
        public int internshipRequests { get; set; }
        public int pendingRequests { get; set; }
        public int in_ProgressRequests { get; set; }
        public int followers { get; set; }
        public int following { get; set; }
        public string jobTitle { get; set; }
    }
}
