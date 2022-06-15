using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class InternApplaiedQAnswers
    {
        [ForeignKey("QId")]
        public int QId { get; set; }
        public virtual InternShipQuestions InternShipQuestions { get; set; }
        [ForeignKey("InternShipId")]
        public int InternShipId { get; set; }
        [ForeignKey("InternId")]
        public string InternId { get; set; }
        public virtual InternApplaied InternApplaied { get; set; }
        public virtual string QAnswer { get; set; }
    }
}
