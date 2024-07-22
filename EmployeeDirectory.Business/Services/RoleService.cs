using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Business.Services
{
    public class RoleService : IRoleService
    {
        IJsonFileHandler jsonFileHandler;
        public RoleService(IJsonFileHandler sqlHandler)
        {
            this.jsonFileHandler = sqlHandler;
        }
        public void AddRole(Role role)
        {
            List<Role> roles = GetRoles();
            roles.Add(role);
            jsonFileHandler.WriteToJsonFile<Role>(roles);
        }
        public List<Role> GetRoles()
        {
            List<Role> roles = jsonFileHandler.GetData<Role>();
            return roles;
        }
        public List<Location> GetLocations() 
        {
            return jsonFileHandler.GetData<Location>();
        }
        public List<Department> GetDepartments()
        {
            return jsonFileHandler.GetData<Department>();
        }
        public ValidationResponse IsRoleExists(string name)
        {
            List<Role> roles = jsonFileHandler.GetData<Role>();
            bool isRoleExists = roles.Exists(role => role.Name == name);
            if (isRoleExists)
                return ValidationResponse.OnFailure("The role that you entered already exists. Please enter a new role name:");
            return ValidationResponse.OnSuccess();
        }
    }
}