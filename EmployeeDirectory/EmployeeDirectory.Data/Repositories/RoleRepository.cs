using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        readonly IGenericRepository<DM.Role> genericRepository;
        readonly IMapper mapper;
        public RoleRepository(IGenericRepository<DM.Role> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<Role> GetRoles()
        {
            List<Role> mappedRoles = new List<Role>();
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    List<DM.Role> repositoryRoles = context.Roles
                        .Include(role => role.Location)
                        .Include(role => role.Department)
                        .Select(role => new DM.Role
                        {
                            Id = role.Id,
                            Location = role.Location,
                            Department = role.Department
                        }).ToList();
                    List<DM.Role> roles = genericRepository.GetAll();
                    mappedRoles = mapper.Map<List<Role>>(roles);
                    foreach (Role role in mappedRoles)
                    {
                        role.LocationName = repositoryRoles.First(repositoryRole => repositoryRole.Id == role.Id).Location.Name;
                        role.DepartmentName = repositoryRoles.First(repositoryRole => repositoryRole.Id == role.Id).Department.Name;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            return mappedRoles;
        }
    }
}