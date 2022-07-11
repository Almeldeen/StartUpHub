using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
    public class InternAppliedCompanyVM
    {
        public string State { get; set; }
        
        public int InternShipId { get; set; }
      
     
        public string InternId { get; set; }
        public string CV { get; set; }
        public string College { get; set; }
        public DateTime? Birthday { get; set; }
        public string Nationality { get; set; }
        public bool availableToWork { get; set; }

        public byte Gender { get; set; }
        public string FullName { get; set; }
        
      
        public string ProfileImage { get; set; }
       
        public string jopTitile { get; set; }
    }
}
