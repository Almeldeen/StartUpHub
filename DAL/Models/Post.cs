using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime CteatedDate { get; set; }
      
        [ForeignKey("FieldId")]
        public  int FieldId { get; set; }
        public virtual Field Field { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public virtual List<Like> Likes { get; set; }
        public virtual List<Comment> Comments { get; set; }
        public List<ImagePosts> ImagePosts { get; set; }
    }
}
