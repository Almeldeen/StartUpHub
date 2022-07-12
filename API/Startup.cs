using BLL.Helper;
using BLL.Helper.SendNotifay;
using BLL.Hups;
using BLL.Mapper;
using BLL.Services.Auth;
using BLL.Services.Field;
using BLL.Services.Followers;
using BLL.Services.Intern;
using BLL.Services.JopServicess;
using BLL.Services.NotificationServicess;
using BLL.Services.Post;
using BLL.Services.Skills;
using DAL.Data;
using DAL.Reproisitry.FieldRepos;
using DAL.Reproisitry.Followers;
using DAL.Reproisitry.InternRepos;
using DAL.Reproisitry.JopRepo;
using DAL.Reproisitry.NotificationRepos;
using DAL.Reproisitry.PostRepos;
using DAL.Reproisitry.SkillsRepos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient
           );

            services.AddIdentity<ApplicationUser, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 7;
                opt.Password.RequireDigit = false;
                opt.Password.RequireUppercase = false;

                opt.User.RequireUniqueEmail = true;

                opt.SignIn.RequireConfirmedEmail = true;
            }).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
            services.AddAutoMapper(x => x.AddProfile(new DomainProfiles()));

            services.Configure<JWT>(Configuration.GetSection("JWT"));
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IFieldRepo, FieldRepo>();
            services.AddScoped<ISkillsRepo, SkillsRepo>();
            services.AddScoped<IFieldService, FieldService>();
            services.AddScoped<IPostRepo, PostRepo>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<ISkillsService, SkillsService>();
            services.AddScoped<IInternRepos, InternRepos>();
            services.AddScoped<IInternService, InternService>();
            services.AddScoped<IJopRepo, JopRepo>();
            services.AddScoped<IJopServices, JopServices>();
            services.AddScoped<IFollowersService, FollowersService>();
            services.AddScoped<IFollowersRepo, FollowersRepo>();
            services.AddScoped<ISendNotification,SendNotification>();
            services.AddScoped<INotificationRepo, NotificationRepo>();
            services.AddScoped<INotificationServices, NotificationServices>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(o =>
                {
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = false;
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = Configuration["JWT:Issuer"],
                        ValidAudience = Configuration["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]))
                    };
                });
            services.AddAuthorization(options =>
            {
                var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
                    JwtBearerDefaults.AuthenticationScheme);

                defaultAuthorizationPolicyBuilder =
                    defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();

                options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
            }); 
            services.AddHttpContextAccessor();
            services.AddSignalR();
            services.AddCors();
            
            services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseCors(options => options
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseFileServer();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<RealtimeHub>("/realtimeHub");
            });
        }
    }
}
