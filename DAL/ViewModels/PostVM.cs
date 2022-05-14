﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.ViewModels
{
   public  class PostVM
    {
        public int PostId { get; set; }
        public string Content { get; set; }
        public string PostImagePath { get; set; }
        public IFormFile PostImage { get; set; }
       
        public int FieldId { get; set; }
        public string FieldName { get; set; }

        public string UserId { get; set; }

        
        //public  List<int> Likes { get; set; }
        //public  List<string> Comments { get; set; }
    }
}
