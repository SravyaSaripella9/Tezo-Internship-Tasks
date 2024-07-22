using EmployeeDirectory.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using EmployeeDirectory.Models;

namespace EmployeeDirectory.UI.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class RolesController : ControllerBase
    {
        public IRoleService roleService;
        public RolesController(IRoleService roleService)
        {
            this.roleService = roleService;
        }

        [HttpGet]
        public ActionResult<List<Role>> GetAllRoles()
        {
            return roleService.GetRoles();
        }
    }
}
