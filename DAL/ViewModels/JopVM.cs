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
        public string name { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string content { get; set; }
       
        public int fieldId { get; set; }
        public string fieldName { get; set; }
      
        public string userId { get; set; }
       
        public  List<SkillsVM> skills { get; set; }
        public  List<InternShipQuestionsVM> InternShipQuestions { get; set; }

    }
}
