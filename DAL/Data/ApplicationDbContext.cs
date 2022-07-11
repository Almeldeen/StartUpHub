using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentRate> commentRates { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Follow> Follows { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<InternShip> InternShips { get; set; }
        public DbSet<InternShipSkils> InternShipSkils { get; set; }
        public DbSet<InternShipQuestions> InternShipQuestions { get; set; }
        public DbSet<InternApplaiedQAnswers> InternApplaiedQAnswers { get; set; }
        public DbSet<Skills> Skills { get; set; }
        public DbSet<Intern> Interns { get; set; }
        public DbSet<InternSkills> InternSkills { get; set; }
        public DbSet<Ratting> Rattings { get; set; }     
        public DbSet<InternApplaied> InternApplaieds { get; set; }
        public DbSet<ImagePosts> ImagePosts { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Notifications> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {


            builder.Entity<InternShipSkils>()
             .HasKey(b => new { b.InternShipId, b.SkillsId })
             .HasName("PK_InternShipSkils");
            builder.Entity<Follow>()
            .HasKey(b => new { b.FollowSenderId, b.FollowReceiverId })
            .HasName("PK_Follow");

            builder.Entity<InternApplaiedQAnswers>()
              .HasKey(b => new { b.QId, b.InternId,b.InternShipId })
              .HasName("PK_InternApplaiedQAnswers");
            builder.Entity<CommentRate>()
              .HasKey(b => new { b.UserId,b.CommentId })
              .HasName("PK_CommentRate");
            builder.Entity<Intern>()
                 .HasMany(d => d.Skills)
                 .WithMany(x => x.Interens)
                 .UsingEntity<InternSkills>(
                 j => j
                 .HasOne(pt => pt.Skills)
                 .WithMany(t => t.InternSkills)
                 .HasForeignKey(pt => pt.SkillsId),
                 j => j
                 .HasOne(pt => pt.Intern)
                 .WithMany(t => t.InternSkills)
                 .HasForeignKey(pt => pt.InternId),
                 j => j
                 .HasKey(t => new { t.InternId, t.SkillsId })
                 );

            builder.Entity<Intern>()
                 .HasMany(d => d.InternShips)
                 .WithMany(x => x.Interns)
                 .UsingEntity<InternApplaied>(
                 j => j
                 .HasOne(pt => pt.InternShip)
                 .WithMany(t => t.InternApplaieds)
                 .HasForeignKey(pt => pt.InternShipId),
                 j => j
                 .HasOne(pt => pt.Intern)
                 .WithMany(t => t.InternApplaieds)
                 .HasForeignKey(pt => pt.InternId),
                 j => j
                 .HasKey(t => new { t.InternId, t.InternShipId })
                 );





            builder.Entity<InternShip>()
               .HasMany(d => d.Skills)
               .WithMany(x => x.InternShips)
               .UsingEntity<InternShipSkils>(
               j => j
               .HasOne(pt => pt.Skills)
               .WithMany(t => t.InternShipSkils)
               .HasForeignKey(pt => pt.SkillsId),
               j => j
               .HasOne(pt => pt.InternShip)
               .WithMany(t => t.InternShipSkils)
               .HasForeignKey(pt => pt.InternShipId),
               j => j
               .HasKey(t => new { t.InternShipId, t.SkillsId })
               );


            builder.Entity<Follow>()
                .HasOne(f => f.FollowSender)
                .WithMany(f=> f.FollowsReceiver);
            builder.Entity<Follow>()
               .HasOne(f => f.FollowReceiver)
               .WithMany(f => f.FollowsSender);
            builder.Entity<Chat>()
                .HasOne(f => f.Sender)
                .WithMany(f => f.ChatReceiver);
            builder.Entity<Chat>()
               .HasOne(f => f.Reciver)
               .WithMany(f => f.ChatSender);
            builder.Entity<Notifications>()
             .HasOne(f => f.Reciver)
             .WithMany(f => f.ReciverNotifications);
            builder.Entity<InternApplaiedQAnswers>()
                 .HasOne(f => f.InternApplaied)
                 .WithMany(f => f.internApplaiedQAnswers);
            base.OnModelCreating(builder);
        }
    }
}
