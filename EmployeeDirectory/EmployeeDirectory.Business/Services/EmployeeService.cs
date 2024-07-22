using System.Data;
using System.Text.RegularExpressions;
using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.Business.Services
{
    public class EmployeeService : IEmployeeService
    {
        ISqlHandler sqlHandler;
        public EmployeeService( ISqlHandler sqlHandler )
        {
            this.sqlHandler = sqlHandler;
        }
        public void AddEmployee(Employee employee)
        {
            sqlHandler.InsertRecord<Employee>(employee);
        }
        public List<Employee> GetEmployees()
        {
            List<Employee> employees = sqlHandler.GetData<Employee>();
            employees = employees.Where(employee => !employee.IsDeleted).ToList();
            return employees;
        }
        public void UpdateEmployee(Employee employee)
        {
            sqlHandler.UpdateRecord<Employee>(employee);    
        }
        public bool DeleteEmployee(string empNo)
        {
            List<Employee> employees = sqlHandler.GetData<Employee>();
            Employee employee = employees.First(emp => emp.EmpNo == empNo);
            if (employee.IsDeleted)
                return false;
            else
            {
                employee.IsDeleted = true;
                sqlHandler.DeleteRecord(employee);
                return true;
            }
        }
        public List<Project> GetProjects()
        {
            return sqlHandler.GetData<Project>();
        }
        public ValidationResponse IsValidEmpNo(string empNo)
        {
            string pattern = "^TZ\\d{4}$";
            Regex regex = new Regex(pattern);
            bool isValidEmpNo = regex.IsMatch(empNo);
            if (!isValidEmpNo)
                return ValidationResponse.OnFailure("Please enter valid employee no. Employee No must start with 'TZ' followed by a four digit number");
            return ValidationResponse.OnSuccess();
        }
        public ValidationResponse IsEmpNoExists(string empNo, Enums.EmployeeOperation operation)
        {
            List<Employee> employees = sqlHandler.GetData<Employee>();
            bool isEmpNoExists = employees.Exists(employee => employee.EmpNo == empNo);
            if (isEmpNoExists && operation == Enums.EmployeeOperation.Add)
                return ValidationResponse.OnFailure("The employee no. that you entered already exists. Please enter valid employee no:");
            else if (!isEmpNoExists && ((operation == Enums.EmployeeOperation.Display) || (operation == Enums.EmployeeOperation.Edit) || (operation == Enums.EmployeeOperation.Delete)))
                return ValidationResponse.OnFailure("The employee no. that you entered doesn't exist. Please enter valid employee no:");
            return ValidationResponse.OnSuccess();
        }
    }
}