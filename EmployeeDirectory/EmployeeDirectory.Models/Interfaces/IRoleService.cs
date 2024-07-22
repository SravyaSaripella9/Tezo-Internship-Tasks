namespace EmployeeDirectory.Models.Interfaces
{
    public interface IRoleService
    {
        void AddRole(Role role);
        List<Department> GetDepartments();
        List<Location> GetLocations();
        List<Role> GetRoles();
        ValidationResult ValidateRoleName(string name);
    }
}