using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class Experience
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte Type { get; set; }
        [ForeignKey("InterenId")]
        public string InterenId { get; set; }
        public virtual Interen Interen { get; set; }
    }
}
