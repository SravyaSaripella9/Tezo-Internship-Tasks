using AutoMapper;
using VM = EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        IGenericRepository<DM.Department> genericRepository;
        IMapper mapper;
        public DepartmentRepository(IGenericRepository<DM.Department> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<VM.Department> GetDepartments()
        {
            List<DM.Department> departments = genericRepository.GetData();
            return mapper.Map<List<VM.Department>>(departments);
        }
    }
}