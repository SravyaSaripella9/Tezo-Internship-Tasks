using VM = EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;
using AutoMapper;

namespace EmployeeDirectory.Data.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        IGenericRepository<DM.Project> genericRepository;
        IMapper mapper;
        public ProjectRepository(IGenericRepository<DM.Project> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<VM.Project> GetProjects()
        {
            List<DM.Project> projects = genericRepository.GetData();
            return mapper.Map<List<VM.Project>>(projects);
        }
    }
}