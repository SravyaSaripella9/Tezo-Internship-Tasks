using AutoMapper;
using Microsoft.EntityFrameworkCore;
using VM = EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        IGenericRepository<DM.Employee> genericRepository;
        IMapper mapper;
        public EmployeeRepository(IGenericRepository<DM.Employee> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<VM.Employee> GetEmployees()
        {
            List<VM.Employee> mappedEmployees = new List<VM.Employee>();
            try
            {
                using (var context = new ApplicationDbContext())
                {
                    List<DM.Employee> repositoryEmployees = context.Employees
                        .Include(employee => employee.Role)
                            .ThenInclude(role => role.Location)
                        .Include(employee => employee.Role)
                            .ThenInclude(role => role.Department)
                        .Include(employee => employee.Project)
                        .Select(employee => new DM.Employee
                        {
                            EmpNo = employee.EmpNo,
                            Role = employee.Role,
                            Project = employee.Project
                        }).ToList();
                    List<DM.Employee> employees = genericRepository.GetData();
                    employees = employees.Where(employee => employee.IsDeleted != true).ToList();
                    mappedEmployees = mapper.Map<List<VM.Employee>>(employees);
                    foreach (VM.Employee employee in mappedEmployees)
                    {
                        employee.LocationId = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Location.Id;
                        employee.LocationName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Location.Name;
                        employee.RoleName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Name;
                        employee.DepartmentId = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Department.Id;
                        employee.DepartmentName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Department.Name;
                        employee.ProjectName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Project?.Name;
                    }
                    return mappedEmployees;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            return mappedEmployees;
        }
    }
}