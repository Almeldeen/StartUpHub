using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
  public class InternApplaiedQAnswersVM
    {   
        
        public string question { get; set; }      
        public int QId { get; set; }      
        public int InternShipId { get; set; }     
        public string InternId { get; set; }
        public virtual string answer { get; set; }
    }
}
