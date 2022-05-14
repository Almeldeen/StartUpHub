using DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public class AuthModel
    {
        public string Message { get; set; }
        public bool IsAuthenticated { get; set; }
        public bool IsConfirmed { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public DateTime? ExpiresOn { get; set; }
        public string Token { get; set; }
        //[JsonIgnore]
        //public string? RefreshToken { get; set; }

        //public DateTime RefreshTokenExpiration { get; set; }

    }
}
