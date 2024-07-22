using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Business.Services
{
    public class RoleService : IRoleService
    {
        ISqlHandler sqlHandler;
        public RoleService(ISqlHandler sqlHandler)
        {
            this.sqlHandler = sqlHandler;
        }
        public void AddRole(Role role)
        {
            sqlHandler.InsertRecord<Role>(role);
        }
        public List<Role> GetRoles()
        {
            List<Role> roles = sqlHandler.GetData<Role>();
            return roles;
        }
        public List<Location> GetLocations()
        {
            return sqlHandler.GetData<Location>();
        }
        public List<Department> GetDepartments()
        {
            return sqlHandler.GetData<Department>();
        }
        public ValidationResponse IsRoleExists(string name)
        {
            List<Role> roles = sqlHandler.GetData<Role>();
            bool isRoleExists = roles.Exists(role => role.Name == name);
            if (isRoleExists)
                return ValidationResponse.OnFailure("The role that you entered already exists. Please enter a new role name:");
            return ValidationResponse.OnSuccess();
        }
    }
}