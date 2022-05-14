using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class InternApplaied
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public byte State { get; set; }
        [ForeignKey("InternShipId")]
        public int InternShipId { get; set; }
        public virtual InternShip InternShip { get; set; }
        [ForeignKey("InterenId")]
        public string InterenId { get; set; }
        public virtual Interen Interen { get; set; }
       

    }
}
