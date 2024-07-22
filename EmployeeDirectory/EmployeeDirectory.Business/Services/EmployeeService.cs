using System.Text.RegularExpressions;
using VM = EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;
using DM = EmployeeDirectory.Data.DataModels;
using AutoMapper;

namespace EmployeeDirectory.Business.Services
{
    public class EmployeeService : IEmployeeService
    {
        IGenericRepository<DM.Employee> genericRepository;
        IEmployeeRepository employeeRepository;
        IProjectRepository projectRepository;
        IMapper mapper;
        public EmployeeService(IGenericRepository<DM.Employee> genericRepository, IEmployeeRepository employeeRepository, IProjectRepository projectRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.employeeRepository = employeeRepository;
            this.projectRepository = projectRepository;
            this.mapper = mapper;
        }
        public void AddEmployee(VM.Employee employee)
        {
            DM.Employee employeeDataModel = GetEmployeeDataModel(employee);
            employeeDataModel.CreatedOn = DateTime.Now;
            employeeDataModel.IsDeleted = false;
            genericRepository.InsertRecord(employeeDataModel);
        }
        public DM.Employee GetEmployeeDataModel(VM.Employee employee)
        {
            return mapper.Map<DM.Employee>(employee);
        }
        public List<VM.Project> GetProjects()
        {
            return projectRepository.GetProjects();
        }
        public List<VM.Employee> GetEmployees()
        {
            return employeeRepository.GetEmployees();
        }
        public void UpdateEmployee(VM.Employee employee)
        {
            DM.Employee employeeDataModel = GetEmployeeDataModel(employee);
            List<DM.Employee> employees = genericRepository.GetData();
            DM.Employee employeeToBeUpdated = employees.First(emp => emp.EmpNo == employee.EmpNo);
            employeeDataModel.CreatedOn = employeeToBeUpdated.CreatedOn;
            employeeDataModel.LastModifiedOn = DateTime.Now;
            genericRepository.UpdateRecord(employeeDataModel);
        }
        public bool DeleteEmployee(string empNo)
        {
            List<DM.Employee> employees = genericRepository.GetData();
            DM.Employee employee = employees.First(emp => emp.EmpNo == empNo);
            if (employee.IsDeleted)
                return false;
            else
            {
                employee.IsDeleted = true;
                genericRepository.DeleteRecord(employee);
                return true;
            }
        }
        public VM.ValidationResponse IsValidEmpNo(string empNo)
        {
            string pattern = "^TZ\\d{4}$";
            Regex regex = new Regex(pattern);
            bool isValidEmpNo = regex.IsMatch(empNo);
            if (!isValidEmpNo)
                return VM.ValidationResponse.OnFailure("Please enter valid employee no. Employee No must start with 'TZ' followed by a four digit number");
            return VM.ValidationResponse.OnSuccess();
        }
        public VM.ValidationResponse IsEmpNoExists(string empNo, VM.Enums.EmployeeOperation operation)
        {
            List<DM.Employee> employees = genericRepository.GetData();
            bool isEmpNoExists = employees.Exists(employee => employee.EmpNo == empNo);
            if (isEmpNoExists && operation == VM.Enums.EmployeeOperation.Add)
                return VM.ValidationResponse.OnFailure("The employee no. that you entered already exists. Please enter valid employee no:");
            else if (!isEmpNoExists && ((operation == VM.Enums.EmployeeOperation.Display) || (operation == VM.Enums.EmployeeOperation.Edit) || (operation == VM.Enums.EmployeeOperation.Delete)))
                return VM.ValidationResponse.OnFailure("The employee no. that you entered doesn't exist. Please enter valid employee no:");
            return VM.ValidationResponse.OnSuccess();
        }
    }
}