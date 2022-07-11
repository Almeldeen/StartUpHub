using BLL.Helper;
using BLL.Services.Auth;
using DAL.Data;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IHostingEnvironment env;

        public AuthController(IAuthService authService, UserManager<ApplicationUser> userManager, IHostingEnvironment env)
        {
            _authService = authService;
            this.userManager = userManager;
            this.env = env;
        }
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);


                var result = await _authService.RegisterAsync(model);

                if (!result.IsAuthenticated)
                    return BadRequest(result.Message);
                var token = await userManager.GenerateEmailConfirmationTokenAsync(userManager.FindByEmailAsync(model.Email).Result);
                result.EmailConfirmToken = token;
                var confirmationLink = "<a href='http://startuphub-001-site1.dtempurl.com"
    + @Url.Action("ConfirmEmail", "Auth", new { token = token, email = model.Email })
    + "'style='text-decoration:none;line-height:100%;background:#2195f3;color:white;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;'target='_blank'" +
    ">Verify Email</a>";
                var pathToFile = env.WebRootPath
                       + Path.DirectorySeparatorChar.ToString()
                       + "Templates"
                       + Path.DirectorySeparatorChar.ToString()
                       + "email.html";
                var builder = new BodyBuilder();
                using (StreamReader SourceReader = System.IO.File.OpenText(pathToFile))
                {
                    builder.HtmlBody = SourceReader.ReadToEnd();
                }
                builder.HtmlBody = builder.HtmlBody.Replace("{user name}", model.fullName);
                builder.HtmlBody = builder.HtmlBody.Replace("{link}", confirmationLink);
               
                //var confirmationLink = Url.Link("ConfirmEmailAuth", new { token=token, email = model.Email }, Request.Scheme);
                bool res = EmailHelper.SendEmail(model.Email, builder.HtmlBody);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAsync([FromBody] LoginVM model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.LoginAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            return Ok(result);
        }
        [HttpGet("ConfirmEmail")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest();

            var result = await userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpGet("Islogged")]
        public async Task<IActionResult> IsloggedAsync()
        {

            if (await _authService.IsloggedAsync())
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpGet("Account")]
        public async Task<IActionResult> Account()
        {
            var result = await _authService.AccountAsync();
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(string newPassword, string oldPassword)
        {
            var result = await _authService.ChangePassword(newPassword, oldPassword);
            if (result)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }



    }
}
