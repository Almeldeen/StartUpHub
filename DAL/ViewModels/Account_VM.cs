using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
    public class Account_VM
    {
        public string id { get; set; }
        public string fullName { get; set; }
        public string role { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string mobile { get; set; }
        public bool isConfirmed { get; set; }
        public string username { get; set; }
        public string image { get; set; }
    }
}
