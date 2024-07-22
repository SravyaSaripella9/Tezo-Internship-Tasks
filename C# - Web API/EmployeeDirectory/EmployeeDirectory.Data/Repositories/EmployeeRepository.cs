using AutoMapper;
using Microsoft.EntityFrameworkCore;
using EmployeeDirectory.Models;
using DM = EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        readonly IGenericRepository<DM.Employee> genericRepository;
        readonly IMapper mapper;
        public EmployeeRepository(IGenericRepository<DM.Employee> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }
        public List<Employee> GetEmployees()
        {
            List<Employee> mappedEmployees = new List<Employee>();
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
                            Id = employee.Id,
                            EmpNo = employee.EmpNo,
                            Role = employee.Role,
                            Project = employee.Project
                        }).ToList();
                    List<DM.Employee> employees = genericRepository.GetAll();
                    employees = employees.Where(employee => employee.IsDeleted != true).ToList();
                    mappedEmployees = mapper.Map<List<Employee>>(employees);
                    foreach (Employee employee in mappedEmployees)
                    {
                        employee.Id = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Id;
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
        public Employee? GetEmployee(int id)
        {
            DM.Employee? employee = genericRepository.GetById(id);
            if (employee == null || employee.IsDeleted == true)
            {
                return null;
            }
            else
            {
                Employee mappedEmployee = new Employee();
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
                                Id = employee.Id,
                                EmpNo = employee.EmpNo,
                                Role = employee.Role,
                                Project = employee.Project
                            }).ToList();
                        mappedEmployee = mapper.Map<Employee>(employee);
                        mappedEmployee.Id = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Id;
                        mappedEmployee.LocationId = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Location.Id;
                        mappedEmployee.LocationName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Location.Name;
                        mappedEmployee.RoleName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Name;
                        mappedEmployee.DepartmentId = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Department.Id;
                        mappedEmployee.DepartmentName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Role.Department.Name;
                        mappedEmployee.ProjectName = repositoryEmployees.First(repositoryEmployee => repositoryEmployee.EmpNo == employee.EmpNo).Project?.Name;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
                return mappedEmployee;
            }
        }
    }
}