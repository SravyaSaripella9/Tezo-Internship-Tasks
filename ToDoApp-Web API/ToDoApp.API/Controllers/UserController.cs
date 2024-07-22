using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models.Interfaces;
using ToDoApp.Models;
using System.Security.Claims;
using ToDoApp.Models.Core;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class UserController(IUserService _userService) : ControllerBase
    {
        [HttpGet]
        [Route("/GetUsers")]
        public ActionResult<List<User>> GetAll()
        {
            OperationResult result = _userService.GetUsers();
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return (List<User>)result.Data;
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpGet]
        [Route("/GetUserByUserName")]
        public ActionResult<User> GetUserFirstName()
        {
            string userName = User.FindFirstValue("Username")!;
            OperationResult result = _userService.GetUserByUserName(userName);
            if (result.IsSuccess)
            {
                if(result.Data == null)
                    return NotFound();
                else
                    return (User)result.Data;
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpPost]
        public ActionResult Add([FromBody] User user)
        {
            if(user == null)
                return BadRequest("User is null");
            OperationResult result = _userService.AddUser(user);
            if (result.IsSuccess)
                return Ok();
            else
                return BadRequest(result.ErrorMessage);
        }
    }
}
