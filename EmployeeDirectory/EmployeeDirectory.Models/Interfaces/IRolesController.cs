namespace EmployeeDirectory.Models.Interfaces
{
    public interface IRolesController
    {
        List<Location> GetLocations();
        List<Department> GetDepartments();
        List<Role> GetRoles();
        ValidationResponse ValidateRoleName(string name);
        void AddRole(Role role);
    }
}