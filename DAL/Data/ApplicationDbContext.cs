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
        public DbSet<Education> Educations { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Follow> Follows { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<InternShip> InternShips { get; set; }
        public DbSet<Skills> Skills { get; set; }
        public DbSet<Interen> Interens { get; set; }
        public DbSet<InternSkills> InternSkills { get; set; }
        public DbSet<Ratting> Rattings { get; set; }
        public DbSet<Jop> Jops { get; set; }
        public DbSet<JopSkills> JopSkills { get; set; }
        public DbSet<InternApplaied> InternApplaieds { get; set; }
        public DbSet<ImagePosts> ImagePosts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {


            builder.Entity<InternShipSkils>()
             .HasKey(b => new { b.InternShipId, b.SkillsId })
             .HasName("PK_InternShipSkils");
            builder.Entity<Follow>()
            .HasKey(b => new { b.FollowSenderId, b.FollowReceiverId })
            .HasName("PK_Follow");
            builder.Entity<InternSkills>()
          .HasKey(b => new { b.InternId, b.SkillsId })
          .HasName("PK_InternSkills");
            //   builder.Entity<JopSkills>()
            //.HasKey(b => new { b.JopId, b.SkillsId })
            //.HasName("PK_JopSkills");
            builder.Entity<Jop>()
                 .HasMany(d => d.Skills)
                 .WithMany(x => x.Jops)
                 .UsingEntity<JopSkills>(
                 j => j
                 .HasOne(pt => pt.Skills)
                 .WithMany(t => t.JopSkills)
                 .HasForeignKey(pt => pt.SkillsId),
                 j => j
                 .HasOne(pt => pt.Jop)
                 .WithMany(t => t.JopSkills)
                 .HasForeignKey(pt => pt.JopId),
                 j => j
                 .HasKey(t => new { t.JopId, t.SkillsId })
                 );
            base.OnModelCreating(builder);
        }
    }
}
