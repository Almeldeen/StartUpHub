﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
    public class InternProfile_VM
    {
        public string InterenId { get; set; }
        public int followersCount { get; set; }
        public int followingCount { get; set; }
        public string about { get; set; }
        public string field { get; set; }
        public DateTime birthdate { get; set; }
        public List<SkillsVM> skills { get; set; }
        public string jobTitle { get; set; }
        public bool availableToWork { get; set; }
        public List<Education_VM> education { get; set; }
        public string address { get; set; }
        public string CV { get; set; }

    }
}
