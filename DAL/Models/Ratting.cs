using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class Ratting
    {
        public int Id { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public int Value { get; set; }

    }
}
