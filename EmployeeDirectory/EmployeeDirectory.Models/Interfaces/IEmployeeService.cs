namespace EmployeeDirectory.Models.Interfaces
{
    public interface IEmployeeService
    {
        void AddEmployee(Employee employee);
        List<Project> GetProjects();
        List<Employee> GetEmployees();
        Employee? GetEmployee(string empNo);
        void UpdateEmployee(Employee employee);
        bool DeleteEmployee(string empNo);
        ValidationResult ValidateEmpNo(string empNo, Enums.EmployeeOperation operation);
    }
}