using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Business.Controllers
{
    public class EmployeesController : IEmployeesController
    {
        readonly IEmployeeService employeeService;
        public EmployeesController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }
        public List<Project> GetProjects()
        {
            return employeeService.GetProjects();
        }
        public List<Employee> GetEmployees()
        {
            return employeeService.GetEmployees();
        }
        public Employee? GetEmployee(string empNo)
        {
            return employeeService.GetEmployee(empNo);
        }
        public ValidationResult ValidateEmpNo(string empNo, Enums.EmployeeOperation operation)
        {
            if (string.IsNullOrWhiteSpace(empNo))
                return ValidationResult.OnFailure("Employee No. is a mandatory field. Please enter employee no:");
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