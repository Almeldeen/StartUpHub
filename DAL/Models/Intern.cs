﻿using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Intern 
    {
        [Key]
        public string InternId { get; set; }
        public string CV { get; set; }
        public string College { get; set; }
        public DateTime? Birthday { get; set; }
        public string Nationality { get; set; }
        public bool availableToWork { get; set; }

        public byte Gender { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual List<Skills> Skills { get; set; }
        public virtual List<InternShip> InternShips { get; set; }
        public virtual List<InternSkills> InternSkills { get; set; }
        public virtual List<InternApplaied> InternApplaieds { get; set; }
        //public virtual List<Follow> Follows { get; set; }
        public virtual List<Education> Educations { get; set; }

    }
}
