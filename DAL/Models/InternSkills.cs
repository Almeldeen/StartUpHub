using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class InternSkills
    {
      
        [ForeignKey("SkillsId")]
        public int SkillsId { get; set; }
        [ForeignKey("InternId")]
        public int InternId { get; set; }
        public virtual Skills Skills { get; set; }
        public virtual Interen Intern { get; set; }
    }
}
