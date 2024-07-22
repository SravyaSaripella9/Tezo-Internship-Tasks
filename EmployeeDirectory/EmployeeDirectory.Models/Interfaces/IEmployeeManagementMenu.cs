namespace EmployeeDirectory.Models.Interfaces
{
    public interface IEmployeeManagementMenu
    {
        void DisplayEmployeeManagementMenu();
        string GetEmpNo(Enums.EmployeeOperation operation);
        string GetName();
        DateTime GetDate();
        string GetEmail();
        string? GetMobileNumber();
        Location GetLocation(List<Location> locations);
        Role GetJobTitle(List<Role> roles);
        Department GetDepartment(List<Department> departments);
        string? GetManager(List<Employee> employees);
        Project? GetProject(List<Project> projects);
        void GetEmployeeDetails();
        void DisplayAllEmployees();
        void DisplayEmployee();
        void GetEmployeeDetailsToBeUpdated();
        void GetEmployeeToBeDeleted();
    }
}