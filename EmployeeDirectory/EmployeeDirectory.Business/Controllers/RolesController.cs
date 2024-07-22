using EmployeeDirectory.Models;
using EmployeeDirectory.Models.ViewModels;
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
        public List<Role> GetRoles()
        {
            return roleService.GetRoles();
        }
        public List<Location> GetLocations()
        {
            return roleService.GetLocations();
        }
        public List<Department> GetDepartments()
        {
            return roleService.GetDepartments();
        }
        public List<RoleViewModel> GetRoleViewModels()
        {
            List<Role> roles = GetRoles();
            List<Department> departments = GetDepartments();
            List<Location> locations = GetLocations();
            List<RoleViewModel> rolesToBeDisplayed = roles.Select(role =>
            {
                Department department = departments.First(dept => dept.Id == role.DepartmentId);
                Location location = locations.First(loc => loc.Id == role.LocationId);
                return new RoleViewModel(role.Id, role.Name, department.Name, role.Description, location.Name);
            }).ToList();
            return rolesToBeDisplayed;
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