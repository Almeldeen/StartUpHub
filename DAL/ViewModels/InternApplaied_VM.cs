using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
    public class InternApplaied_VM
    {
        public string State { get; set; }
        public int InternShipId { get; set; }
        public string InterenId { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string content { get; set; }
        public string fieldName { get; set; }
        public string userId { get; set; }
        public string title { get; set; }
        public int appliedCount { get; set; }
        public string companyName { get; set; }
        public string companyJobTitle { get; set; }
        public string companyImg { get; set; }
        public string internName { get; set; }
        public string internId { get; set; }
        public string internEmail { get; set; }
        public bool appliedByUser { get; set; }
        public List<SkillsVM> skills { get; set; }
        public List<InternApplaiedQAnswersVM> answers { get; set; }

    }
}
