﻿
using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public  class Jop
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Content { get; set; }
        [ForeignKey("FieldId")]
        public int FieldId { get; set; }
        public virtual Field Field { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public virtual List<Skills> Skills { get; set; }
        public virtual List<JopSkills> JopSkills { get; set; }

    }
}