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
        public string title { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string content { get; set; }
       
        public int fieldId { get; set; }
        public string fieldName { get; set; }
      
        public string userId { get; set; }
       [JsonProperty("skills")]
        public  List<SkillsVM> skillls { get; set; }
        public  List<InternShipQuestionsVM> questions { get; set; }

    }
}
