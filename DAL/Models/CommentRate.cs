using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class CommentRate
    {
        [ForeignKey("CommentId")]

        public int CommentId { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public string RateType { get; set; }
 
        public Comment Comment { get; set; }
        
        public virtual ApplicationUser User { get; set; }
    }
}
