namespace EmployeeDirectory.Models.ViewModels
{
    public class EmployeeViewModel
    {
        public string EmpNo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string? MobileNumber { get; set; }
        public DateTime JoinDate { get; set; }
        public string LocationName { get; set; }
        public string RoleName { get; set; }
        public string DepartmentName { get; set; }
        public string? Manager { get; set; }
        public string? ProjectName { get; set; }
        public EmployeeViewModel(string empNo, string firstName, string lastName, DateTime dateOfBirth, string email, string? mobileNumber, DateTime joinDate, string locationName, string roleName, string departmentName, string? manager, string? projectName)
        {
            EmpNo = empNo;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Email = email;
            MobileNumber = mobileNumber;
            JoinDate = joinDate;
            LocationName = locationName;
            RoleName = roleName;
            DepartmentName = departmentName;
            Manager = manager;
            ProjectName = projectName;
        }
    }
}