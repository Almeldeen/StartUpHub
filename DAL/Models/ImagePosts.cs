using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
  
  public  class ImagePosts
    {
        public int Id { get; set; }
        [ForeignKey("PostId")]
        public int PostId { get; set; }
        public string ImagePath { get; set; }
        public virtual  Post Post { get; set; }
    }
}
