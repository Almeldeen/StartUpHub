using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class UpdateInternVM
    {
        public List<int?> skills { get; set; }
        public List<Education_VM> education { get; set; }
        public string about { get; set; }
        public string email { get; set; }
        public string jobTitle { get; set; }
        public string address { get; set; }
        public string CVPath { get; set; }
        public string mobile { get; set; }
        public string fullName { get; set; }
        public IFormFile CV { get; set; }
        public bool availableToWork { get; set; }
        public int? fieldId { get; set; }
        public DateTime birthdate { get; set; }
    }
}
