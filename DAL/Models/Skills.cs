using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class Skills
    {
        public int SkillsId { get; set; }
        public string Name { get; set; }
        [ForeignKey("FieldId")]
        public int FieldId { get; set; }
        public virtual Field Field { get; set; }
        public virtual List<Interen> Interens { get; set; }
        public virtual List<Jop> Jops { get; set; }
        public virtual List<InternShipSkils> InternShipSkils { get; set; }
    }
}
