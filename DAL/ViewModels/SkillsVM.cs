using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public  class SkillsVM
    {
        public int SkillsId { get; set; }
        public string Name { get; set; }
      
        public int FieldId { get; set; }
        public string FieldName { get; set; }
    }
}
