using EmployeeDirectory.Models.ViewModels;

namespace EmployeeDirectory.Models.Interfaces
{
    public interface IEmployeesController
    {
        List<Employee> GetEmployees();
        List<Project> GetProjects();
        List<EmployeeViewModel> GetEmployeeViewModels();
        ValidationResponse ValidateEmpNo(string empNo, Enums.EmployeeOperation operation);
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        bool DeleteEmployee(string empNo);
    }
}
