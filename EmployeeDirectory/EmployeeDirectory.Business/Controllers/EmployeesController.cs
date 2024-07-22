using EmployeeDirectory.Models;
using EmployeeDirectory.Models.ViewModels;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Business.Controllers
{
    public class EmployeesController : IEmployeesController
    {
        readonly IEmployeeService employeeService;
        readonly IRoleService roleService;
        public EmployeesController(IEmployeeService employeeService, IRoleService roleService)
        {
            this.employeeService = employeeService;
            this.roleService = roleService;
        }
        public List<Employee> GetEmployees()
        {
            return employeeService.GetEmployees();
        }
        public List<Project> GetProjects()
        {
            return employeeService.GetProjects();
        }
        public List<EmployeeViewModel> GetEmployeeViewModels()
        {
            List<Employee> employees = GetEmployees();
            List<Role> roles = roleService.GetRoles();
            List<Department> departments = roleService.GetDepartments();
            List<Location> locations = roleService.GetLocations();
            List<Project> projects = GetProjects();
            List<RoleViewModel> roleViewModels = roles.Select(role =>
            {
                Department department = departments.First(dept => dept.Id == role.DepartmentId);
                Location location = locations.First(loc => loc.Id == role.LocationId);
                return new RoleViewModel(role.Id, role.Name, department.Name, role.Description, location.Name);
            }).ToList();
            List<EmployeeViewModel> employeesToBeDisplayed = employees.Select(employee =>
            {
                RoleViewModel employeeRole = roleViewModels.First(role => role.Id == employee.RoleId);
                string projectName;
                if (employee.ProjectId != null)
                {
                    Project project = projects.First(project => project.Id == employee.ProjectId);
                    projectName = project.Name;
                }   
                else
                {
                    projectName = "";
                }
                return new EmployeeViewModel(employee.EmpNo, employee.FirstName, employee.LastName, employee.DateOfBirth, employee.Email, employee.MobileNumber, employee.JoinDate, employeeRole.LocationName, employeeRole.Name, employeeRole.DepartmentName, employee.Manager, projectName);
            }).ToList();
            return employeesToBeDisplayed;
        }
        public ValidationResponse ValidateEmpNo(string empNo, Enums.EmployeeOperation operation)
        {
            if (string.IsNullOrWhiteSpace(empNo))
                return ValidationResponse.OnFailure("Employee No. is a mandatory field. Please enter employee no:");
            var response = employeeService.IsValidEmpNo(empNo);
            if (!response.IsValid)
                return response;
            return employeeService.IsEmpNoExists(empNo, operation);
        }
        public void AddEmployee(Employee employee)
        {
            employeeService.AddEmployee(employee);
        }
        public void UpdateEmployee(Employee employee)
        {
            employeeService.UpdateEmployee(employee);
        }
        public bool DeleteEmployee(string empNo)
        {
            return employeeService.DeleteEmployee(empNo);
        }
    }
}