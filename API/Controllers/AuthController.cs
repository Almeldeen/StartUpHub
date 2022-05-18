using BLL.Helper;
using BLL.Services.Auth;
using DAL.Data;
using DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public AuthController(IAuthService authService, UserManager<ApplicationUser> userManager)
        {
            _authService = authService;
            this.userManager = userManager;
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
               
                var confirmationLink = "<a href='http://internnes-001-site1.btempurl.com"
    + @Url.Action("ConfirmEmail", "Auth", new { token = token, email = model.Email })
    + "'>Click here to ConfirmEmail</a>";
                //var confirmationLink = Url.Link("ConfirmEmailAuth", new { token=token, email = model.Email }, Request.Scheme);
                bool res = EmailHelper.SendEmail(model.Email, confirmationLink);
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
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return Ok("Error");

            var result = await userManager.ConfirmEmailAsync(user, token);
            return Ok(result.Succeeded ? "ConfirmEmail" : "Error");
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


    }
}
