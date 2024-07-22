namespace EmployeeDirectory.Models.Interfaces
{
    public interface IEmployeeService
    {
        void AddEmployee(Employee employee);
        List<Project> GetProjects();
        List<Employee> GetEmployees();
        void UpdateEmployee(Employee employee);
        bool DeleteEmployee(string empNo);
        ValidationResponse IsValidEmpNo(string empNo);
        ValidationResponse IsEmpNoExists(string empNo, Enums.EmployeeOperation operation);
    }
}