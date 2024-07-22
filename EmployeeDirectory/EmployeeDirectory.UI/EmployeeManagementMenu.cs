using System.Data;
using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.UI
{
    class EmployeeManagementMenu : IEmployeeManagementMenu
    {
        IEmployeesController employeesController;
        IRolesController rolesController;
        public EmployeeManagementMenu(IEmployeesController employeesController, IRolesController rolesController)
        {
            this.employeesController = employeesController;
            this.rolesController = rolesController;
        }
        public void DisplayEmployeeManagementMenu()
        {
            int employeeMenuOption = 0;
            while (employeeMenuOption != 6)
            {
                Console.WriteLine(Constants.EMPLOYEEMANAGEMENTMENUHEADER);
                Console.WriteLine($"1. {Constants.ADDEMPLOYEE}");
                Console.WriteLine($"2. {Constants.DISPLAYALL}");
                Console.WriteLine($"3. {Constants.DISPLAYONE}");
                Console.WriteLine($"4. {Constants.EDIT}");
                Console.WriteLine($"5. {Constants.DELETE}");
                Console.WriteLine($"6. {Constants.GOBACK}");
                Console.WriteLine("Please enter an option from the given menu:");
                string option = Console.ReadLine()!;
                var response = ValidationService.IsValidOption(option, 1, 6);
                while (!response.IsValid)
                {
                    Console.WriteLine(response.ErrorMessage);
                    option = Console.ReadLine()!;
                    response = ValidationService.IsValidOption(option, 1, 6);
                }
                employeeMenuOption = int.Parse(option);
                switch (employeeMenuOption)
                {
                    case 1:
                        GetEmployeeDetails();
                        break;
                    case 2:
                        DisplayAllEmployees();
                        break;
                    case 3:
                        DisplayEmployee();
                        break;
                    case 4:
                        GetEmployeeDetailsToBeUpdated();
                        break;
                    case 5:
                        GetEmployeeToBeDeleted();
                        break;
                    case 6:
                        Console.WriteLine("Going back to main menu");
                        break;
                }
            }
        }
        public string GetEmpNo(Enums.EmployeeOperation operation)
        {
            string empNo = Console.ReadLine()!;
            var response = employeesController.ValidateEmpNo(empNo, operation);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                empNo = Console.ReadLine()!;
                response = employeesController.ValidateEmpNo(empNo, operation);
            }
            return empNo;
        }
        public string GetName()
        {
            string name = Console.ReadLine()!;
            while (string.IsNullOrWhiteSpace(name))
            {
                Console.WriteLine("It is a mandatory field. Please enter :");
                name = Console.ReadLine()!;
            }
            return name;
        }
        public DateTime GetDate()
        {
            string enteredDate = Console.ReadLine()!;
            var response = ValidationService.IsValidDate(enteredDate);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                enteredDate = Console.ReadLine()!;
                response = ValidationService.IsValidDate(enteredDate);
            }
            DateTime date = DateTime.Parse(enteredDate);
            return date;
        }
        public string GetEmail()
        {
            string email = Console.ReadLine()!;
            var response = ValidationService.IsValidEmail(email);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                email = Console.ReadLine()!;
                response = ValidationService.IsValidEmail(email);
            }
            return email;
        }
        public string? GetMobileNumber()
        {
            string? mobileNumber = Console.ReadLine();
            var response = ValidationService.IsValidMobileNumber(mobileNumber);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                mobileNumber = Console.ReadLine()!;
                response = ValidationService.IsValidMobileNumber(mobileNumber);
            }
            return mobileNumber ?? null;
        }
        public Location GetLocation(List<Location> locations)
        {
            Console.WriteLine("The available options for location are:");
            for (int i = 0; i < locations.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {locations[i].Name}");
            }
            Console.WriteLine("Please enter any one option from the above list of options:");
            string option = Console.ReadLine()!;
            var response = ValidationService.IsValidOption(option, 1, locations.Count);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                option = Console.ReadLine()!;
                response = ValidationService.IsValidOption(option, 1, locations.Count);
            }
            int optionEntered = int.Parse(option);
            return locations[optionEntered - 1];
        }
        public Role GetJobTitle(List<Role> roles)
        {
            Console.WriteLine("The available options for job title are:");
            for (int i = 0; i < roles.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {roles[i].Name}");
            }
            Console.WriteLine("Please enter any one option from the above list of options:");
            string option = Console.ReadLine()!;
            var response = ValidationService.IsValidOption(option, 1, roles.Count);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                option = Console.ReadLine()!;
                response = ValidationService.IsValidOption(option, 1, roles.Count);
            }
            int optionEntered = int.Parse(option);
            return roles[optionEntered - 1];
        }
        public Department GetDepartment(List<Department> departments)
        {
            Console.WriteLine("The available options for department are:");
            for (int i = 0; i < departments.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {departments[i].Name}");
            }
            Console.WriteLine("Please enter any one option from the above list of options:");
            string option = Console.ReadLine()!;
            var response = ValidationService.IsValidOption(option, 1, departments.Count);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                option = Console.ReadLine()!;
                response = ValidationService.IsValidOption(option, 1, departments.Count);
            }
            int optionEntered = int.Parse(option);
            return departments[optionEntered - 1];
        }
        public string? GetManager(List<Employee> employees)
        {
            Console.WriteLine("The available options for manager are:");
            for (int i = 0; i < employees.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {employees[i].FirstName} {employees[i].LastName}");
            }
            Console.WriteLine($"{employees.Count + 1}. None");
            Console.WriteLine("Please enter any one option from the above list of options:");
            string option = Console.ReadLine()!;
            var response = ValidationService.IsValidOption(option, 1, employees.Count + 1);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                option = Console.ReadLine()!;
                response = ValidationService.IsValidOption(option, 1, employees.Count + 1);
            }
            int optionEntered = int.Parse(option);
            if (optionEntered == employees.Count + 1)
                return null;
            return employees[optionEntered - 1].FirstName + " " + employees[optionEntered - 1].LastName;
        }
        public Project? GetProject(List<Project> projects)
        {
            Console.WriteLine("The available options for project are:");
            for (int i = 0; i < projects.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {projects[i].Name}");
            }
            Console.WriteLine($"{projects.Count + 1}. None");
            Console.WriteLine("Please enter any one option from the above list of options:");
            string option = Console.ReadLine()!;
            var response = ValidationService.IsValidOption(option, 1, projects.Count + 1);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                option = Console.ReadLine()!;
                response = ValidationService.IsValidOption(option, 1, projects.Count + 1);
            }
            int optionEntered = int.Parse(option);
            if (optionEntered == projects.Count + 1)
                return null;
            return projects[optionEntered - 1];
        }
        public void GetEmployeeDetails()
        {
            Console.WriteLine("Please enter employee no.(The employee no. must start with 'TZ' followed by a four digit number:");
            string empNo = GetEmpNo(Enums.EmployeeOperation.Add);
            Console.WriteLine("Please enter employee first name:");
            string firstName = GetName();
            Console.WriteLine("Please enter employee last name:");
            string lastName = GetName();
            Console.WriteLine("Please enter Date of Birth:");
            DateTime dateOfBirth = GetDate();
            Console.WriteLine("Please enter employee email(The email must be in the format of username@tezo.com):");
            string email = GetEmail();
            Console.WriteLine("Please enter employee mobile number:");
            string? mobileNumber = GetMobileNumber();
            Console.WriteLine("Please enter joining date:");
            DateTime joinDate = GetDate();
            Console.WriteLine("Please enter employee location:");
            List<Location> locations = rolesController.GetLocations();
            Location location = GetLocation(locations);
            Console.WriteLine("Please enter employee job title:");
            List<Role> roles = rolesController.GetRoles();
            List<Role> filteredRoles = roles.Where(role => role.LocationId == location.Id).ToList();
            Role jobTitle = GetJobTitle(filteredRoles);
            Console.WriteLine("Please enter employee department:");
            List<Department> departments = rolesController.GetDepartments();
            List<Department> filteredDepartments = departments.Where(department => department.Id == jobTitle.DepartmentId).ToList();
            Department department = GetDepartment(filteredDepartments);
            Console.WriteLine("Please enter employee manager:");
            List<Employee> employees = employeesController.GetEmployees();
            string? manager = GetManager(employees);
            Console.WriteLine("Please enter employee project:");
            List<Project> projects = employeesController.GetProjects();
            Project? project = GetProject(projects);
            Employee employeeViewModel = new Employee(empNo, firstName, lastName, dateOfBirth, email, mobileNumber, joinDate, location.Id, location.Name, jobTitle.Id, jobTitle.Name, department.Id, department.Name, manager, project?.Id, project?.Name);
            employeesController.AddEmployee(employeeViewModel);
        }
        public void DisplayAllEmployees()
        {
            List<Employee> employees = employeesController.GetEmployees();
            if (employees.Count == 0)
                Console.WriteLine("Sorry, there are no employees to be displayed");
            else
            {
                foreach (Employee employee in employees)
                {
                    Console.WriteLine($"Employee No.: {employee.EmpNo}");
                    Console.WriteLine($"Employee First Name: {employee.FirstName}");
                    Console.WriteLine($"Employee Last Name: {employee.LastName}");
                    Console.WriteLine($"Employee Role: {employee.RoleName}");
                    Console.WriteLine($"Employee Department: {employee.DepartmentName}");
                    Console.WriteLine($"Employee Location: {employee.LocationName}");
                    Console.WriteLine($"Employee Joining Date: {employee.JoinDate}");
                    Console.WriteLine($"Employee Manager Name: {employee.Manager}");
                    Console.WriteLine($"Employee Project Name: {employee.ProjectName}");
                    Console.WriteLine("==============================================");
                }
            }
        }
        public void DisplayEmployee()
        {
            List<Employee> employees = employeesController.GetEmployees();
            Console.WriteLine("Please enter the employee no. of the employee to be displayed:");
            string empNo = GetEmpNo(Enums.EmployeeOperation.Display);
            Employee? employee = employees.FirstOrDefault(emp => emp.EmpNo == empNo);
            if (employee == null)
                Console.WriteLine("The employee with the emp no. you entered is not an active employee. So, the employee details can't be displayed");
            else
            {
                Console.WriteLine($"Employee No.: {employee.EmpNo}");
                Console.WriteLine($"Employee First Name: {employee.FirstName}");
                Console.WriteLine($"Employee Last Name: {employee.LastName}");
                Console.WriteLine($"Employee Date Of Birth: {employee.DateOfBirth}");
                Console.WriteLine($"Employee Email: {employee.Email}");
                Console.WriteLine($"Employee Mobile Number: {employee.MobileNumber}");
                Console.WriteLine($"Employee Role: {employee.RoleName}");
                Console.WriteLine($"Employee Department: {employee.DepartmentName}");
                Console.WriteLine($"Employee Location: {employee.LocationName}");
                Console.WriteLine($"Employee Joining Date: {employee.JoinDate}");
                Console.WriteLine($"Employee Manager Name: {employee.Manager}");
                Console.WriteLine($"Employee Project Name: {employee.ProjectName}");
            }
        }
        public void GetEmployeeDetailsToBeUpdated()
        {
            Console.WriteLine("Please enter the employee no. of the employee whose details has to be updated:");
            List<Employee> employees = employeesController.GetEmployees();
            string empNo = GetEmpNo(Enums.EmployeeOperation.Edit);
            Employee? employeeToBeEdited = employees.FirstOrDefault(emp => emp.EmpNo == empNo);
            if (employeeToBeEdited == null)
                Console.WriteLine("The employee with the emp no. you entered is not an active employee. So, the employee details can't be updated");
            else
            {
                Console.WriteLine($"Details of the employee with employee no. {employeeToBeEdited.EmpNo}");
                Console.WriteLine($"1. FirstName: {employeeToBeEdited.FirstName}");
                Console.WriteLine($"2. LastName: {employeeToBeEdited.LastName}");
                Console.WriteLine($"3. DateOfBirth: {employeeToBeEdited.DateOfBirth}");
                Console.WriteLine($"4. Email: {employeeToBeEdited.Email}");
                Console.WriteLine($"5. MobileNumber: {employeeToBeEdited.MobileNumber}");
                Console.WriteLine($"6. JoinDate: {employeeToBeEdited.JoinDate}");
                Console.WriteLine($"7. Location: {employeeToBeEdited.LocationName}");
                Console.WriteLine($"8. JobTitle: {employeeToBeEdited.RoleName}");
                Console.WriteLine($"9. Department: {employeeToBeEdited.DepartmentName}");
                Console.WriteLine($"10. Manager: {employeeToBeEdited.Manager}");
                Console.WriteLine($"11. Project: {employeeToBeEdited.ProjectName}");
                Employee employee = employees.First(emp => emp.EmpNo == empNo);
                employee.EmpNo = empNo;
                Console.WriteLine("Please enter employee first name:");
                employee.FirstName = GetName();
                Console.WriteLine("Please enter employee last name:");
                employee.LastName = GetName();
                Console.WriteLine("Please enter Date of Birth:");
                employee.DateOfBirth = GetDate();
                Console.WriteLine("Please enter employee email(The email must be in the format of username@tezo.com):");
                employee.Email = GetEmail();
                Console.WriteLine("Please enter employee mobile number:");
                employee.MobileNumber = GetMobileNumber();
                Console.WriteLine("Please enter joining date:");
                employee.JoinDate = GetDate();
                Console.WriteLine("Please enter employee location:");
                List<Location> locations = rolesController.GetLocations();
                Location location = GetLocation(locations);
                employee.LocationId = location.Id;
                employee.LocationName = location.Name;
                Console.WriteLine("Please enter employee job title:");
                List<Role> roles = rolesController.GetRoles();
                List<Role> filteredRoles = roles.Where(role => role.LocationName == location.Name).ToList();
                Role jobTitle = GetJobTitle(filteredRoles);
                employee.RoleId = jobTitle.Id;
                employee.RoleName = jobTitle.Name;
                Console.WriteLine("Please enter employee department:");
                List<Department> departments = rolesController.GetDepartments();
                List<Department> filteredDepartments = departments.Where(department => department.Name == jobTitle.DepartmentName).ToList();
                Department department = GetDepartment(filteredDepartments);
                employee.DepartmentId = department.Id;
                employee.DepartmentName = department.Name;
                Console.WriteLine("Please enter employee manager:");
                employee.Manager = GetManager(employees);
                Console.WriteLine("Please enter employee project:");
                List<Project> projects = employeesController.GetProjects();
                Project? project = GetProject(projects);
                employee.ProjectId = project?.Id;
                employee.ProjectName = project?.Name;
                employeesController.UpdateEmployee(employee);
            }
        }
        public void GetEmployeeToBeDeleted()
        {
            Console.WriteLine("Please enter the employee no. of the employee who has to be deleted:");
            string empNo = GetEmpNo(Enums.EmployeeOperation.Delete);
            if (!employeesController.DeleteEmployee(empNo))
                Console.WriteLine("The employee with the emp no. you entered is already deleted.");
            else
                employeesController.DeleteEmployee(empNo);
        }
    }
}