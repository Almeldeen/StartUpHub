using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Field
    {
        public int FieldId { get; set; }
        public string FieldName { get; set; }
        public virtual List<Post> posts { get; set; }
        public virtual List<Skills> Skills { get; set; }
        public virtual List<Jop> Jops { get; set; }
    }
}
