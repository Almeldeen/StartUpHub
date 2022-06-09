using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public  class PostVM
    {
        [JsonProperty("id")]
        public int PostId { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
        [JsonIgnore]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public List<IFormFile> PostImage { get; set; }
        [JsonProperty("images")]
        public List<string> PostImagePath { get; set; }
        [JsonProperty("fieldId")]
        public int FieldId { get; set; }
        [JsonProperty("fieldName")]
        public string FieldName { get; set; }
        [JsonProperty("status")]
        public string status { get; set; }
        [JsonProperty("userId")]
        public string UserId { get; set; }
        [JsonProperty("userFullName")]
        public string UserName { get; set; }
        [JsonProperty("userImg")]
        public string UserImg { get; set; }
        [JsonProperty("userJobTitle")]
        public string UserJobTitle { get; set; }
        public int createdDate { get; set; }


        public List<PostLikesVM> likes { get; set; }
        //public  List<string> Comments { get; set; }
    }
}
