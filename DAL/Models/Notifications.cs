using DAL.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
   public class Notifications: RealtimeModel
    {
        public int? PostId { get; set; }
        public int? JopId { get; set; }
        public string Type { get; set; }

    }
}
