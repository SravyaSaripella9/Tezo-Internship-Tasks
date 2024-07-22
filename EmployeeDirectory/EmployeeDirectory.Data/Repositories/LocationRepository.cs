using AutoMapper;
using VM = EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        IGenericRepository<DM.Location> genericRepository;
        IMapper mapper;
        public LocationRepository(IGenericRepository<DM.Location> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<VM.Location> GetLocations()
        {
            List<DM.Location> locations = genericRepository.GetData();
            return mapper.Map<List<VM.Location>>(locations);
        }
    }
}