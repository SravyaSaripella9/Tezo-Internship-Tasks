namespace EmployeeDirectory.Models
{
    public class Employee
    {
        public string EmpNo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string? MobileNumber { get; set; }
        public DateTime JoinDate { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string? Manager { get; set; }
        public int? ProjectId { get; set; }
        public string? ProjectName { get; set; }
        public Employee(string empNo, string firstName, string lastName, DateTime dateOfBirth, string email, string? mobileNumber, DateTime joinDate, int locationId, string locationName, int roleId, string roleName, int departmentId, string departmentName, string? manager, int? projectId, string? projectName)
        {
            EmpNo = empNo;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Email = email;
            MobileNumber = mobileNumber;
            JoinDate = joinDate;
            LocationId = locationId;
            LocationName = locationName;
            RoleId = roleId;
            RoleName = roleName;
            DepartmentId = departmentId;
            DepartmentName = departmentName;
            Manager = manager;
            ProjectId = projectId;
            ProjectName = projectName;
        }
        public Employee()
        {

        }
    }
}