using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Business.Controllers
{
    public class RolesController : IRolesController
    {
        readonly IRoleService roleService;
        public RolesController(IRoleService roleService)
        {
            this.roleService = roleService;
        }
        public List<Location> GetLocations()
        {
            return roleService.GetLocations();
        }
        public List<Department> GetDepartments()
        {
            return roleService.GetDepartments();
        }
        public List<Role> GetRoles()
        {
            return roleService.GetRoles();
        }
        public ValidationResponse ValidateRoleName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return ValidationResponse.OnFailure("Role name is a mandatory field. Please enter role name:");
            return roleService.IsRoleExists(name);
        }
        public void AddRole(Role role)
        {
            roleService.AddRole(role);
        }
    }
}