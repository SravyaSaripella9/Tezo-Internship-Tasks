namespace EmployeeDirectory.Models.Interfaces
{
    public interface IEmployeeRepository
    {
        List<Employee> GetEmployees();
    }
}