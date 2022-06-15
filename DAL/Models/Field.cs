using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Field
    {
        [Key]
        public int FieldId { get; set; }
        public string FieldName { get; set; }
        public virtual List<Post> posts { get; set; }
        public virtual List<Skills> Skills { get; set; }
        public virtual List<InternShip> InternShips { get; set; }
        public virtual ApplicationUser User { get; set; }
        
    }
}
