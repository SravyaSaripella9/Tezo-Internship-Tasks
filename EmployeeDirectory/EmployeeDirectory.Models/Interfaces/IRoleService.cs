namespace EmployeeDirectory.Models.Interfaces
{
    public interface IRoleService
    {
        void AddRole(Role role);
        List<Role> GetRoles();
        List<Location> GetLocations();
        List<Department> GetDepartments();
        ValidationResponse IsRoleExists(string name);
    }
}
