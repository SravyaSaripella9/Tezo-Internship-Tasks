using VM = EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;
using DM = EmployeeDirectory.Data.DataModels;
using AutoMapper;

namespace EmployeeDirectory.Business.Services
{
    public class RoleService : IRoleService
    {
        IGenericRepository<DM.Role> genericRepository;
        IRoleRepository roleRepository;
        IDepartmentRepository departmentRepository;
        ILocationRepository locationRepository;
        IMapper mapper;
        public RoleService(IGenericRepository<DM.Role> genericRepository, IRoleRepository roleRepository, IDepartmentRepository departmentRepository, ILocationRepository locationRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.roleRepository = roleRepository;
            this.departmentRepository = departmentRepository;
            this.locationRepository = locationRepository;
            this.mapper = mapper;
        }
        public void AddRole(VM.Role role)
        {
            DM.Role roleDataModel = GetRoleDataModel(role);
            genericRepository.InsertRecord(roleDataModel);
        }
        public DM.Role GetRoleDataModel(VM.Role role)
        {
            return mapper.Map<DM.Role>(role);
        }
        public List<VM.Department> GetDepartments()
        {
            return departmentRepository.GetDepartments();
        }
        public List<VM.Location> GetLocations()
        {
            return locationRepository.GetLocations();
        }
        public List<VM.Role> GetRoles()
        {
            return roleRepository.GetRoles();
        }
        public VM.ValidationResponse IsRoleExists(string name)
        {
            List<DM.Role> roles = genericRepository.GetData();
            bool isRoleExists = roles.Exists(role => role.Name == name);
            if (isRoleExists)
                return VM.ValidationResponse.OnFailure("The role that you entered already exists. Please enter a new role name:");
            return VM.ValidationResponse.OnSuccess();
        }
    }
}