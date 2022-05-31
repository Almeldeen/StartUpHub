using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class JopSkills
    {
          [ForeignKey("JopId")]
        public int JopId { get; set; }
        [ForeignKey("SkillsId")]
        public int SkillsId { get; set; }
        public virtual Jop Jop { get; set; }
        public virtual Skills Skills { get; set; }
    }
}
