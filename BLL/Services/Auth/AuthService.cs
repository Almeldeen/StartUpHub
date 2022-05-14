using BLL.Helper;
using DAL.Data;
using DAL.Models;
using DAL.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using static BLL.Helper.Constants;

namespace BLL.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly JWT _jwt;
        public AuthService(UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _jwt = jwt.Value;
        }
        public async Task<AuthModel> RegisterAsync(RegisterModel model)
        {
            try
            {
                if (await userManager.FindByEmailAsync(model.Email) is not null)
                    return new AuthModel { Message = "Email is already registered!" };

                if (await userManager.FindByNameAsync(model.Username) is not null)
                    return new AuthModel { Message = "Username is already registered!" };

                var user = new ApplicationUser
                {
                    UserName = model.Username,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName
                };

                var result = await userManager.CreateAsync(user, model.Password);

                if (!result.Succeeded)
                {
                    var errors = string.Empty;

                    foreach (var error in result.Errors)
                        errors += $"{error.Description},";

                    return new AuthModel { Message = errors };
                }
                await userManager.AddToRoleAsync(user, Roles.Internee.ToString());

                var jwtSecurityToken = await CreateJwtToken(user);

                return new AuthModel
                {
                    Email = user.Email,

                    IsAuthenticated = true,
                    Roles = new List<string> { Roles.Internee.ToString() },
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                    Username = user.UserName,

                };
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        public async Task<AuthModel> LoginAsync(LoginVM model)
        {
            var authModel = new AuthModel();
            try
            {
                var user = await userManager.FindByEmailAsync(model.Email);

                if (user is null || !await userManager.CheckPasswordAsync(user, model.Password))
                {
                    authModel.Message = "Email or Password is incorrect!";
                    return authModel;
                }

                var jwtSecurityToken = await CreateJwtToken(user);
                var rolesList = await userManager.GetRolesAsync(user);

                authModel.IsAuthenticated = true;
                authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                authModel.Email = user.Email;
                authModel.Username = user.UserName;
                authModel.ExpiresOn = jwtSecurityToken.ValidTo;
                authModel.IsConfirmed = user.EmailConfirmed;
                authModel.Roles = rolesList.ToList();
                //if (user.RefreshTokens.Any(t => t.IsActive))
                //{
                //    var activeRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
                //    authModel.RefreshToken = activeRefreshToken.Token;
                //    authModel.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;
                //}
                //else
                //{
                //    var refreshToken = GenerateRefreshToken();
                //    authModel.RefreshToken = refreshToken.Token;
                //    authModel.RefreshTokenExpiration = refreshToken.ExpiresOn;
                //    user.RefreshTokens.Add(refreshToken);
                //    await userManager.UpdateAsync(user);
                //}
            }
            catch (Exception ex)
            {
                authModel.Message = ex.Message;
                authModel.IsAuthenticated = true;
            }
        

            return authModel;
        }
        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await userManager.GetClaimsAsync(user);
            var roles = await userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                  expires: DateTime.UtcNow.AddSeconds(60),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
    }
}
