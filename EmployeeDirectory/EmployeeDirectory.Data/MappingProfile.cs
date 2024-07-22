using AutoMapper;
using EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;

namespace EmployeeDirectory.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Role, DM.Role>();
            CreateMap<Employee, DM.Employee>();
            CreateMap<DM.Location, Location>();
            CreateMap<DM.Department, Department>();
            CreateMap<DM.Role, Role>();
            CreateMap<DM.Project, Project>();
            CreateMap<DM.Employee, Employee>();
        }
    }
}
