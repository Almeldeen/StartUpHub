using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
  public  class ApplicationUser : IdentityUser
    {
        [Required, MaxLength(50)]
        public string FullName { get; set; }
        public string Description { get; set; }   
        public string Location { get; set; }      
        public string Bio { get; set; }      
        public string ProfileImage { get; set; }
        public string CoverImage { get; set; }
        public string jopTitile { get; set; }
        public bool AccountVerification { get; set; }
        public Interen Interen { get; set; }
        //public List<RefreshToken>? RefreshTokens { get; set; }

    }
}
