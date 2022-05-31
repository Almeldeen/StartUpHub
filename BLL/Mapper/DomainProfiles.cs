using AutoMapper;
using DAL.Models;
using DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Mapper
{
   public  class DomainProfiles : Profile
    {
        public DomainProfiles()
        {
            CreateMap<Field, FieldVM>();
            CreateMap<FieldVM, Field>();
            CreateMap<SkillsVM, Skills>();
            CreateMap<Skills, SkillsVM>();
            CreateMap<PostVM, Post>();
            CreateMap<Post, PostVM>();
            CreateMap<Jop, JopVM>();
            CreateMap<JopVM, Jop>();

        }
        
    }
}
