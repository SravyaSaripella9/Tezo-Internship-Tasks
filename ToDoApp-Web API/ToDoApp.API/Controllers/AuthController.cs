using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ToDoApp.Models;
using ToDoApp.Models.Core;
using ToDoApp.Models.Interfaces;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class AuthController(IUserValidatorService _userValidator, IUserService _userService,  IConfiguration _configuration) : ControllerBase
    {
        [HttpPost]
        [Route("/Signup")]
        public ActionResult RegisterUser([FromBody] User user)
        {
            OperationResult result = _userValidator.ValidateUserSignUp(user);
            if (result.IsSuccess)
            {
                _userService.AddUser(user);
                return Ok();
            }
            else
            {
                return BadRequest(result.ErrorMessage);
            }
        }

        [HttpPost]
        [Route("/Signin")]
        public ActionResult<string> SigninUser([FromBody] UserLogin user) 
        {
            OperationResult result = _userValidator.ValidateUserSignIn(user);
            if(result.IsSuccess)
            {
                List<Claim> claims = new List<Claim>()
                {
                    new Claim("Username", user.UserName)
                };
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
                var jwtToken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims:claims,
                    expires:DateTime.UtcNow.AddMinutes(30),
                    signingCredentials:credentials);
                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                return token;
            }
            else
            {
                return BadRequest(result.ErrorMessage);
            }
        }
    }
}
