using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;
using DM = EmployeeDirectory.Data.DataModels;
using AutoMapper;

namespace EmployeeDirectory.Business.Services
{
    public class RoleService : IRoleService
    {
        readonly IGenericRepository<DM.Role> genericRepository;
        readonly IRoleRepository roleRepository;
        readonly IDepartmentRepository departmentRepository;
        readonly ILocationRepository locationRepository;
        readonly IMapper mapper;
        public RoleService(IGenericRepository<DM.Role> genericRepository, IRoleRepository roleRepository, IDepartmentRepository departmentRepository, ILocationRepository locationRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.roleRepository = roleRepository;
            this.departmentRepository = departmentRepository;
            this.locationRepository = locationRepository;
            this.mapper = mapper;
        }
        public void AddRole(Role role)
        {
            DM.Role roleDataModel = GetRoleDataModel(role);
            genericRepository.InsertRecord(roleDataModel);
        }
        public DM.Role GetRoleDataModel(Role role) 
        {
            return mapper.Map<DM.Role>(role);
        }
        public List<Department> GetDepartments()
        {
            return departmentRepository.GetDepartments();
        }
        public List<Location> GetLocations()
        {
            return locationRepository.GetLocations();
        }
        public List<Role> GetRoles()
        {
            return roleRepository.GetRoles();
        }
        public ValidationResult IsRoleExists(string name)
        {
            List<DM.Role> roles = genericRepository.GetAll();
            bool isRoleExists = roles.Exists(role => role.Name == name);
            if (isRoleExists)
                return ValidationResult.OnFailure("The role that you entered already exists. Please enter a new role name:");
            return ValidationResult.OnSuccess();
        }
        public ValidationResult ValidateRoleName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return ValidationResult.OnFailure("Role name is a mandatory field. Please enter role name:");
            return IsRoleExists(name);
        }
    }
}