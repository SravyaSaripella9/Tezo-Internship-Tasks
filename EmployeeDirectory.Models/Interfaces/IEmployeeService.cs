namespace EmployeeDirectory.Models.Interfaces
{
    public interface IEmployeeService
    {
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        bool DeleteEmployee(string empNo);
        List<Employee> GetEmployees();
        List<Project> GetProjects();
        ValidationResponse IsValidEmpNo(string empNo);
        ValidationResponse IsEmpNoExists(string empNo, Enums.EmployeeOperation operation);
    }
}
