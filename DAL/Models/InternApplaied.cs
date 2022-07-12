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
        
        public string State { get; set; }
        [ForeignKey("InternShipId")]
        public int InternShipId { get; set; }
        public virtual InternShip InternShip { get; set; }
        [ForeignKey("InternId")]
        public string InternId { get; set; }
        public virtual Intern Intern { get; set; }
        public DateTimeOffset Createdate { get; set; }
        public List<InternApplaiedQAnswers> internApplaiedQAnswers { get; set; }

    }
}
