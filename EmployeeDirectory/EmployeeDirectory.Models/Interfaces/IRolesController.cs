namespace EmployeeDirectory.Models.Interfaces
{
    public interface IRolesController
    {
        List<Location> GetLocations();
        List<Department> GetDepartments();
        List<Role> GetRoles();
        ValidationResult ValidateRoleName(string name);
        void AddRole(Role role);
    }
}