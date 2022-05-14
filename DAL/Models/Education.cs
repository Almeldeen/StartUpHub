using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Education
    {
        public int EducationID { get; set; }
        public string School { get; set; }
        public string Degree { get; set; }
        public string FieldOfStudy { get; set; }
        public string StudentActivities { get; set; }
        public TimeSpan StartDate { get; set; }
        public TimeSpan EndDate { get; set; }
        [ForeignKey("InterenId")]
        public string InterenId { get; set; }
        public virtual Interen Interen { get; set; }
    }
}

