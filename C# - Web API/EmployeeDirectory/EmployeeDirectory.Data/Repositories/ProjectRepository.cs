using EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;
using AutoMapper;

namespace EmployeeDirectory.Data.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        readonly IGenericRepository<DM.Project> genericRepository;
        readonly IMapper mapper;
        public ProjectRepository(IGenericRepository<DM.Project> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<Project> GetProjects()
        {
            List<DM.Project> projects = genericRepository.GetAll();
            return mapper.Map<List<Project>>(projects);
        }
    }
}