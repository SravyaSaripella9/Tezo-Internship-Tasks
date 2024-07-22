using AutoMapper;
using VM = EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;

namespace EmployeeDirectory.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<VM.Role, DM.Role>();
            CreateMap<VM.Employee, DM.Employee>();
            CreateMap<DM.Location, VM.Location>();
            CreateMap<DM.Department, VM.Department>();
            CreateMap<DM.Role, VM.Role>();
            CreateMap<DM.Project, VM.Project>();
            CreateMap<DM.Employee, VM.Employee>();
        }
    }
}