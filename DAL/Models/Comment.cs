using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        [ForeignKey("PostId")]
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

    }
}
