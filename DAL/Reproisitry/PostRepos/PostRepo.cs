using AutoMapper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.Swagger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Reproisitry.PostRepos
{
    public class PostRepo : IPostRepo
    {
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<ApplicationUser> userMangger;

        public PostRepo(ApplicationDbContext db, IMapper mapper, IHttpContextAccessor httpContextAccessor,UserManager<ApplicationUser> userMangger)
        {
            this.db = db;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.userMangger = userMangger;
        }
        public async Task<PostVM> AddPostAsync(PostVM post)
        {
            try
            {
                var data = mapper.Map<Post>(post);
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                data.UserId = userMangger.FindByNameAsync(username).Result.Id;
                data.CteatedDate = DateTimeOffset.Now;
                await db.Posts.AddAsync(data);

                var res = await db.SaveChangesAsync();
                if (res <= 0)
                {
                    return null;
                }
                if (post.PostImagePath!=null)
                {
                    List<ImagePosts> imagePosts = new List<ImagePosts>();
                    foreach (var item in post.PostImagePath)
                    {
                        imagePosts.Add(new ImagePosts { ImagePath = item, PostId = data.PostId });
                    }
                    await db.ImagePosts.AddRangeAsync(imagePosts);
                    res = await db.SaveChangesAsync();
                }
             
                if (res > 0)
                {
                    post.PostId = data.PostId;
                    return post;
                }
                return null;

            }
            catch (Exception ex)
            {
                var p = new PostVM();
                //p.error = ex.Message;
                return p;
            }



        }

        public async Task<int> DeletePostAsync(int id)
        {
            try
            {
                var data = await db.Posts.FindAsync(id);
                db.Posts.Remove(data);
                var res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    return 1;
                }
                return 0;
            }
            catch (Exception)
            {

                return 0;
            }




        }
        public async Task<PostVM> EditPostAsync(PostVM post)
        {
            try
            {
               
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
               var UserId = userMangger.FindByNameAsync(username).Result.Id;
                var data = await db.Posts.FindAsync(post.PostId);
                data.Content = post.Content;
                data.FieldId = post.FieldId;
                int res = 0;
                var imgs = await db.ImagePosts.Where(x => x.PostId == post.PostId).ToListAsync();
                db.ImagePosts.RemoveRange(imgs);
                if (post.PostImagePath!= null)
                {                  
                    List<ImagePosts> imagePosts = new List<ImagePosts>();
                    foreach (var item in post.PostImagePath)
                    {
                        imagePosts.Add(new ImagePosts { ImagePath = item, PostId = data.PostId });
                    }
                    await db.ImagePosts.AddRangeAsync(imagePosts);                  
                }
                res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    post.PostId = data.PostId;
                    return post;
                }
                return null;
            }



            catch (Exception ex)
            {
                var p = new PostVM();
                //p.error = ex.Message;
                return p;
            }

        }
        public async Task<TimeLineVM> GetAllPostAsync(int pagenum, int pagesize)
        {
            try
            {
                if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var User = await userMangger.FindByNameAsync(username);
                
                    var following = await db.Follows.Where(x => x.FollowSenderId == User.Id).Select(x => x.FollowReceiverId).ToListAsync();
                    var listdata = new TimeLineVM();
                    listdata.Posts = new List<PostVM>();
                    listdata.Jops = new List<JopVM>();
                    int postcount = 0;
                    if (following.Count>0)
                    {
                        foreach (var item in following)
                        {
                            var data = await db.Posts.Where(x => x.UserId == item).OrderByDescending(x => x.Likes.Count()).Select(a => new PostVM
                            {
                                PostId = a.PostId,
                                Content = a.Content,
                                FieldId = a.Field.FieldId,
                                FieldName = a.Field.FieldName,
                                UserId = a.User.Id,
                                UserImg = a.User.ProfileImage,
                                UserJobTitle = a.User.jopTitile,
                                UserName = a.User.FullName,
                                createdDate = a.CteatedDate,
                                postType="article".ToUpper(),
                                likesCount = a.Likes.Count(),
                                commentsCount = a.Comments.Count(),
                                likedByUser = a.Likes.Any(x => x.UserId == User.Id),
                                PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList(),
                            }).OrderByDescending(x=> x.createdDate).ToListAsync();
                            postcount += data.Count();
                            listdata.Posts.AddRange(data);
                        }
                    }
                    else
                    {
                        var data = await db.Posts.OrderByDescending(x => x.Likes.Count()).Skip(4 * (pagenum - 1)).Take(4).Select(a => new PostVM
                        {
                            PostId = a.PostId,
                            Content = a.Content,
                            FieldId = a.Field.FieldId,
                            FieldName = a.Field.FieldName,
                            UserId = a.User.Id,
                            UserImg = a.User.ProfileImage,
                            UserJobTitle = a.User.jopTitile,
                            UserName = a.User.FullName,
                            postType = "article".ToUpper(),
                            createdDate = a.CteatedDate,
                            likesCount = a.Likes.Count(),
                            commentsCount = a.Comments.Count(),
                            likedByUser = a.Likes.Any(x => x.UserId == User.Id),
                            PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList(),
                        }).OrderByDescending(x => x.createdDate).ToListAsync();
                        listdata.Posts.AddRange(data);
                    }
                    if (User.FieldId!=null)
                    {
                        listdata.Jops = await db.InternShips.Where(x => x.FieldId == User.FieldId).OrderByDescending(x => x.Createdate).Skip(1 * (pagenum - 1)).Take(1).Select(x => new JopVM
                        {
                            content = x.Content,
                            skillls = x.Skills.Select(x => new SkillsVM { Name = x.Name }).ToList(),
                            fieldName = x.Field.FieldName,
                            endDate = x.EndDate,
                            companyName=x.User.FullName,
                            companyImg=x.User.ProfileImage,
                            companyJobTitle=x.User.jopTitile,
                            appliedCount=x.InternApplaieds.Count(),
                            startDate = x.StartDate,
                            postType = "jop".ToUpper(),
                            id = x.InternShipId,
                            questions = x.InternShipQuestions.Select(x => new InternShipQuestionsVM { QId = x.QId, QContent = x.QContent }).ToList(),
                            title = x.title,
                            userId = x.UserId,
                        }).ToListAsync();
                    }
                    else
                    {
                        listdata.Jops = await db.InternShips.OrderByDescending(x => x.Createdate).Skip(1 * (pagenum - 1)).Take(1).Select(x => new JopVM
                        {
                            content = x.Content,
                            skillls = x.Skills.Select(x => new SkillsVM { Name = x.Name }).ToList(),
                            fieldName = x.Field.FieldName,
                            endDate = x.EndDate,
                            startDate = x.StartDate,
                            companyName = x.User.FullName,
                            companyImg = x.User.ProfileImage,
                            companyJobTitle = x.User.jopTitile,
                            appliedCount = x.InternApplaieds.Count(),
                            postType = "jop".ToUpper(),
                            id = x.InternShipId,
                            questions = x.InternShipQuestions.Select(x => new InternShipQuestionsVM { QId = x.QId, QContent = x.QContent }).ToList(),
                            title = x.title,
                            userId = x.UserId,
                        }).ToListAsync();
                    }



                    foreach (var item in listdata.Posts)
                    {
                        var user = await userMangger.FindByIdAsync(item.UserId);
                        var role = await userMangger.GetRolesAsync(user);
                        item.userRole = role[0];
                    }
                    var rnd = new Random();
                    listdata.Posts = listdata.Posts.OrderByDescending(x=> x.likesCount).Skip(4 * (pagenum - 1)).Take(4).OrderBy(item => rnd.Next()).ToList();
                    if (postcount>0)
                    {
                        listdata.TotalPages = Convert.ToInt32(Math.Ceiling((double)postcount / pagesize));

                    }
                    else
                    {
                        listdata.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Posts.CountAsync() / pagesize));
                    }
                    listdata.CurrentPage = pagenum;
                    return listdata;
                }
                return null;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        public async Task<ResponseVM<PostVM>> GetUserPostsAsync(string userId, int pagenum,int pagesize)
        {
            try
            {
                if (httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                   
                    ResponseVM<PostVM> response = new ResponseVM<PostVM>();
                    var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var User = await userMangger.FindByNameAsync(username);
                    if (userId==null)
                    {
                        
                        var data = await db.Posts.Where(x => x.UserId == User.Id).OrderByDescending(x => x.CteatedDate).Skip(pagesize * (pagenum - 1)).Take(pagesize).Select(a => new PostVM
                        {
                            PostId = a.PostId,
                            Content = a.Content,
                            FieldId = a.Field.FieldId,
                            FieldName = a.Field.FieldName,
                            UserId = a.User.Id,
                            UserImg = a.User.ProfileImage,
                            UserJobTitle = a.User.jopTitile,
                            UserName = a.User.FullName,
                            likesCount = a.Likes.Count(),
                            createdDate = a.CteatedDate,
                            commentsCount = a.Comments.Count(),
                            likedByUser = a.Likes.Any(x => x.UserId == User.Id),
                            PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList(),
                        }).ToListAsync();

                        response.Data = data;
                        response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Posts.Where(x => x.UserId == User.Id).CountAsync() / pagesize));
                        response.CurrentPage = pagenum;
                    }
                    else
                    {
                        var data = await db.Posts.Where(x => x.UserId == userId).OrderByDescending(x => x.CteatedDate).Skip(pagesize * (pagenum - 1)).Take(pagesize).Select(a => new PostVM
                        {
                            PostId = a.PostId,
                            Content = a.Content,
                            FieldId = a.Field.FieldId,
                            FieldName = a.Field.FieldName,
                            UserId = a.User.Id,
                            UserImg = a.User.ProfileImage,
                            UserJobTitle = a.User.jopTitile,
                            UserName = a.User.FullName,
                            likesCount = a.Likes.Count(),
                            createdDate = a.CteatedDate,
                            commentsCount = a.Comments.Count(),
                            likedByUser = a.Likes.Any(x => x.UserId == User.Id),
                            PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList(),
                        }).ToListAsync();

                        response.Data = data;
                        response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Posts.Where(x => x.UserId == User.Id).CountAsync() / pagesize));
                        response.CurrentPage = pagenum;
                    }
                    foreach (var item in response.Data)
                    {
                        var user = await userMangger.FindByIdAsync(item.UserId);
                        var role= await userMangger.GetRolesAsync(user);
                        item.userRole = role[0];
                    }
                    return response;
                }
                return null;
            }
            catch (Exception ex)
            {
                ResponseVM<PostVM> response = new ResponseVM<PostVM>();
                response.errormsg = ex.Message;
                return response;
            }
           
          
        }

        public async Task<PostVM> GetByIdPostAsync(int id)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var User =await userMangger.FindByNameAsync(username);
                var data = await db.Posts.Where(a => a.PostId == id).Select(a => new PostVM
                {
                    PostId = a.PostId,
                    Content = a.Content,
                    FieldId = a.Field.FieldId,
                    FieldName = a.Field.FieldName,
                    UserId = a.User.Id,
                    PostImagePath = a.ImagePosts.Select(x => x.ImagePath).ToList(),
                    UserImg = a.User.ProfileImage,
                    UserJobTitle = a.User.jopTitile,
                 
                    UserName = a.User.UserName,
                    createdDate = a.CteatedDate,
                    likesCount = a.Likes.Count(),
                    commentsCount = a.Comments.Count(),
                    likedByUser = a.Likes.Any(x => x.UserId == User.Id),
                }).FirstOrDefaultAsync();
                var user = await userMangger.FindByIdAsync(data.UserId);
                var role = await userMangger.GetRolesAsync(user);
                data.userRole = role[0];
                return data;

            }
            catch (Exception ex)
            {

                return null;
            }
       
        }

        public async Task<int> Like(int PostId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var UserId = userMangger.FindByNameAsync(username).Result.Id;
                var data = new Like();
                data.PostId = PostId;
                data.UserId = UserId;
                await db.Likes.AddAsync(data);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                   
                    return 1;
                }
                return 0;
            }
            catch (Exception ex)
            {
                return 0;

            }


        }

       

        public async Task<int> DisLike(int PostId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var UserId = userMangger.FindByNameAsync(username).Result.Id;

                var data = await db.Likes.Where(a => a.PostId == PostId && a.UserId == UserId).FirstOrDefaultAsync();
                 db.Likes.Remove(data);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {

                    return 1;
                }
                return 0;
            }
            catch (Exception ex)
            {
                return 0;

            }
        }

        public async Task<CommentVM> Comment(int PostId, string Cotent)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var UserId = userMangger.FindByNameAsync(username).Result.Id;
                var data = new Comment();
                data.PostId = PostId;
                data.UserId = UserId;
                data.Content = Cotent;
                data.CreatedDate = DateTimeOffset.Now;
                await db.Comments.AddAsync(data);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    var comment = await db.Comments.Where(x => x.Id == data.Id).Select(a => new CommentVM
                    {
                        Id = a.Id,
                        Content = a.Content,
                        createDate = a.CreatedDate,
                        rating = a.Rate,
                        userId = a.UserId,
                        jobTitle = a.User.jopTitile,
                        userImg = a.User.ProfileImage,
                        userName = a.User.FullName,
                        ratedByUser = a.commentRates.Any(x => x.UserId == a.UserId && x.CommentId == a.Id) == true ? a.commentRates.Where(x => x.UserId == a.UserId && x.CommentId == a.Id).Select(x => x.RateType).FirstOrDefault() : "NONE",
                    }).FirstOrDefaultAsync();
              
                    return comment;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;

            }
        }

        public async Task<CommentVM> EditComment(int PostId, int commentId, string Content)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var UserId = userMangger.FindByNameAsync(username).Result.Id;
                var data = await db.Comments.Where(a => a.PostId == PostId && a.UserId == UserId && a.Id == commentId).FirstOrDefaultAsync();
                data.Content = Content;
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                    var comment = await db.Comments.Where(x => x.Id == commentId).Select(a => new CommentVM
                    {
                        Id = a.Id,
                        Content = a.Content,
                        createDate = a.CreatedDate,
                        rating = a.Rate,
                        userId = a.UserId,
                        jobTitle = a.User.jopTitile,
                        userImg = a.User.ProfileImage,
                        userName = a.User.FullName,
                        ratedByUser = a.commentRates.Any(x => x.UserId == a.UserId && x.CommentId == a.Id) == true ? a.commentRates.Where(x => x.UserId == a.UserId && x.CommentId == a.Id).Select(x => x.RateType).FirstOrDefault() : "NONE",
                    }).FirstOrDefaultAsync();
                    return comment;
                }
                return null;
            }
            catch (Exception ex)
            {

                return null;
            }
           
        }

        public async Task<int> DeletComment(int commentId, int PostId)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var UserId = userMangger.FindByNameAsync(username).Result.Id;

                var data = await db.Comments.Where(a => a.PostId == PostId && a.UserId == UserId && a.Id == commentId).FirstOrDefaultAsync();
                db.Comments.Remove(data);
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {

                    return 1;
                }
                return 0;
            }
            catch (Exception ex)
            {
                return 0;

            }
        }

        public async Task<int> RateComment(int commentId, int PostId,string type)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var UserId = userMangger.FindByNameAsync(username).Result.Id;
                var data = await db.Comments.Where(a => a.PostId == PostId && a.Id == commentId).FirstOrDefaultAsync();
                if (type=="UP")
                {
                    data.Rate += 1;
                }
                else if (type=="DOWN")
                {
                    data.Rate -= 1;
                }
                var oldrate = await db.commentRates.Where(x => x.CommentId == commentId && x.UserId == UserId).FirstOrDefaultAsync();
                if (oldrate == null)
                {
                    var com = new CommentRate() { CommentId = commentId, RateType = type, UserId = UserId };
                    await db.commentRates.AddAsync(com);
                }
                else
                {
                    oldrate.RateType = type;
                }
                int res = await db.SaveChangesAsync();
                if (res > 0)
                {
                  
                    return res;
                }
                return 0;
            }
            catch (Exception ex)
            {

                return 0;
            }
        }
        public async Task<ResponseVM<CommentVM>> GetPostComment(int PostId,int pagenum, int pagesize)
        {
            try
            {
                var username = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var UserId = userMangger.FindByNameAsync(username).Result.Id;
                var data = await db.Comments.Where(x => x.PostId == PostId).Skip(pagesize * (pagenum - 1)).Take(pagesize).Select(a => new CommentVM
                {
                   Id=a.Id,
                   Content=a.Content,
                   createDate=a.CreatedDate,
                   rating=a.Rate,
                   userId=a.UserId,
                    jobTitle =a.User.jopTitile,
                   userImg=a.User.ProfileImage,
                   userName=a.User.FullName,
                   ratedByUser=a.commentRates.Any(x=> x.UserId==UserId&&x.CommentId==a.Id)==true? a.commentRates.Where(x => x.UserId == UserId && x.CommentId == a.Id).Select(x=> x.RateType).FirstOrDefault() :"NONE",
                }).OrderByDescending(x=> x.rating).ToListAsync();
                ResponseVM<CommentVM> response = new ResponseVM<CommentVM>();
                response.Data = data;
                foreach (var item in response.Data)
                {
                    var user = await userMangger.FindByIdAsync(item.userId);
                    var role = await userMangger.GetRolesAsync(user);
                    item.userRole = role[0];
                }
                response.TotalPages = Convert.ToInt32(Math.Ceiling((double)await db.Comments.Where(x => x.PostId == PostId).CountAsync() / pagesize));
                response.CurrentPage = pagenum;
                return response;
            }
            catch (Exception ex)
            {
                ResponseVM<CommentVM> response = new ResponseVM<CommentVM>();
                response.errormsg = ex.Message;
                return response;
            }
        }
      

    }
}
