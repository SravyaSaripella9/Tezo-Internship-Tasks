using System.Text.RegularExpressions;
using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;
using DM = EmployeeDirectory.Data.DataModels;
using AutoMapper;

namespace EmployeeDirectory.Business.Services
{
    public class EmployeeService : IEmployeeService
    {
        readonly IGenericRepository<DM.Employee> genericRepository;
        readonly IEmployeeRepository employeeRepository;
        readonly IProjectRepository projectRepository;
        readonly IMapper mapper;
        public EmployeeService(IGenericRepository<DM.Employee> genericRepository, IEmployeeRepository employeeRepository, IProjectRepository projectRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.employeeRepository = employeeRepository;
            this.projectRepository = projectRepository;
            this.mapper = mapper;
        }
        public void AddEmployee(Employee employee)
        {
            DM.Employee employeeDataModel = GetEmployeeDataModel(employee);
            employeeDataModel.CreatedOn = DateTime.Now;
            employeeDataModel.IsDeleted = false;
            genericRepository.InsertRecord(employeeDataModel);
        }
        public DM.Employee GetEmployeeDataModel(Employee employee)
        {
            return mapper.Map<DM.Employee>(employee);
        }
        public List<Project> GetProjects()
        {
            return projectRepository.GetProjects();
        }
        public List<Employee> GetEmployees()
        {
            return employeeRepository.GetEmployees();
        }
        public Employee? GetEmployee(string empNo)
        {
            List<DM.Employee> employees = genericRepository.GetAll();
            int id = employees.First(employee => employee.EmpNo == empNo).Id;
            return employeeRepository.GetEmployee(id);
        }
        public void UpdateEmployee(Employee employee)
        {
            DM.Employee employeeDataModel = GetEmployeeDataModel(employee);
            List<DM.Employee> employees = genericRepository.GetAll();
            int id = employees.First(emp => emp.EmpNo == employee.EmpNo).Id;
            DM.Employee employeeToBeUpdated = genericRepository.GetById(id)!;
            employeeDataModel.CreatedOn = employeeToBeUpdated.CreatedOn;
            employeeDataModel.LastModifiedOn = DateTime.Now;
            genericRepository.UpdateRecord(employeeDataModel);
        }
        public bool DeleteEmployee(string empNo)
        {
            List<DM.Employee> employees = genericRepository.GetAll();
            int id = employees.First(employee => employee.EmpNo == empNo).Id;
            DM.Employee employee = genericRepository.GetById(id)!;
            if (employee.IsDeleted)
                return false;
            else
            {
                employee.IsDeleted = true;
                genericRepository.DeleteRecord(employee);
                return true;
            }
        }
        public ValidationResult IsValidEmpNo(string empNo)
        {
            string pattern = "^TZ\\d{4}$";
            Regex regex = new Regex(pattern);
            bool isValidEmpNo = regex.IsMatch(empNo);
            if (!isValidEmpNo)
                return ValidationResult.OnFailure("Please enter valid employee no. Employee No must start with 'TZ' followed by a four digit number");
            return ValidationResult.OnSuccess();
        }
        public ValidationResult IsEmpNoExists(string empNo, Enums.EmployeeOperation operation)
        {
            List<DM.Employee> employees = genericRepository.GetAll();
            bool isEmpNoExists = employees.Exists(employee => employee.EmpNo == empNo);
            if (isEmpNoExists && operation == Enums.EmployeeOperation.Add)
                return ValidationResult.OnFailure("The employee no. that you entered already exists. Please enter valid employee no:");
            else if (!isEmpNoExists && ((operation == Enums.EmployeeOperation.Display) || (operation == Enums.EmployeeOperation.Edit) || (operation == Enums.EmployeeOperation.Delete)))
                return ValidationResult.OnFailure("The employee no. that you entered doesn't exist. Please enter valid employee no:");
            return ValidationResult.OnSuccess();
        }
        public ValidationResult ValidateEmpNo(string empNo, Enums.EmployeeOperation operation)
        {
            if (string.IsNullOrWhiteSpace(empNo))
                return ValidationResult.OnFailure("Employee No. is a mandatory field. Please enter employee no:");
            var response = IsValidEmpNo(empNo);
            if (!response.IsValid)
                return response;
            return IsEmpNoExists(empNo, operation);
        }
    }
}