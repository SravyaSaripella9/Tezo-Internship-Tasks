namespace EmployeeDirectory.Models.Interfaces
{
    public interface IEmployeesController
    {
        List<Project> GetProjects();
        List<Employee> GetEmployees();
        ValidationResponse ValidateEmpNo(string empNo, Enums.EmployeeOperation operation);
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        bool DeleteEmployee(string empNo);
    }
}