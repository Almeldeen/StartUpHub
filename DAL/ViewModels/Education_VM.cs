using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
    public class Education_VM
    {
        public int educationID { get; set; }
        public string school { get; set; }
        public string degree { get; set; }
        public string fieldOfStudy { get; set; }
        public string studentActivities { get; set; }
        public TimeSpan startDate { get; set; }
        public TimeSpan endDate { get; set; } 
        public string interenId { get; set; }
    }
}
