using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class InternShipSkils
    {
        [ForeignKey("InternShipId")]
        public int InternShipId { get; set; }
        [ForeignKey("SkillsId")]
        public int SkillsId { get; set; }
        public virtual Skills Skills { get; set; }
        public virtual InternShip InternShip { get; set; }
    }
}
