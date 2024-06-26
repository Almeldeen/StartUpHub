﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class InternShipQuestions
    {
        [Key]
        public int QId { get; set; }
        public string QContent { get; set; }
        [ForeignKey("InternShipId")]
        public int InternShipId { get; set; }
        public InternShip internShip { get; set; }
    }
}
