using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
    public class InternApplaied_VM
    {
        public byte State { get; set; }
        public int InternShipId { get; set; }
        public string InterenId { get; set; }
        public List<InternApplaiedQAnswersVM> answers { get; set; }

    }
}
