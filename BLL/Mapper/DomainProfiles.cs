﻿using AutoMapper;
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
            CreateMap<InternShip, JopVM>();
            CreateMap<JopVM, InternShip>();
            CreateMap<InternApplaied_VM, InternApplaied>();
            CreateMap<InternApplaied, InternApplaied_VM>();
            CreateMap<Comment, CommentVM>();
            CreateMap<CommentVM, Comment>();
            CreateMap<Notifications, NotificationVM>();
            CreateMap<NotificationVM, Notifications>();
            CreateMap<MessageVM, ChatMsgs>();
            CreateMap<ChatMsgs, MessageVM>();
        }
        
    }
}
