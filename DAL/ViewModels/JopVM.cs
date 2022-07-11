using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public  class JopVM
    {
        public int id { get; set; }
        public int appliedCount { get; set; }
        public bool appliedByUser { get; set; }
        public string title { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string content { get; set; }
        public string companyName { get; set; }    
        public string companyJobTitle { get; set; }    
        public string companyImg { get; set; }    
        public int fieldId { get; set; }
        public string fieldName { get; set; }
        public string postType { get; set; }     
        public string userId { get; set; }
        public  List<SkillsVM> skillls { get; set; }
        public  List<InternShipQuestionsVM> questions { get; set; }

    }
}
