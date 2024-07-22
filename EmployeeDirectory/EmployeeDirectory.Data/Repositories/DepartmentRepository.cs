using AutoMapper;
using EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        readonly IGenericRepository<DM.Department> genericRepository;
        readonly IMapper mapper;
        public DepartmentRepository(IGenericRepository<DM.Department> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<Department> GetDepartments()
        {
            List<DM.Department> departments = genericRepository.GetAll();
            return mapper.Map<List<Department>>(departments);
        }
    }
}