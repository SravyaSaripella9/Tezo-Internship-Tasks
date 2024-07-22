using AutoMapper;
using EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        readonly IGenericRepository<DM.Location> genericRepository;
        readonly IMapper mapper;
        public LocationRepository(IGenericRepository<DM.Location> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<Location> GetLocations()
        {
            List<DM.Location> locations = genericRepository.GetAll();
            return mapper.Map<List<Location>>(locations);
        }
    }
}