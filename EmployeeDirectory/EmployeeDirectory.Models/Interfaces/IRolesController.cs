using EmployeeDirectory.Models.ViewModels;

namespace EmployeeDirectory.Models.Interfaces
{
    public interface IRolesController
    {
        List<Role> GetRoles();
        List<Location> GetLocations();
        List<Department> GetDepartments();
        List<RoleViewModel> GetRoleViewModels();
        ValidationResponse ValidateRoleName(string name);
        void AddRole(Role role);
    }
}
