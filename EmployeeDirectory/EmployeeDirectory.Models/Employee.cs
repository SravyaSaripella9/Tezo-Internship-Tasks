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
        public int RoleId { get; set; }
        public string? Manager { get; set; }
        public int? ProjectId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public Employee(string empNo, string firstName, string lastName, DateTime dateOfBirth, string email, string? mobileNumber, DateTime joinDate, int roleId, string? manager, int? projectId, bool isDeleted)
        {
            EmpNo = empNo;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Email = email;
            MobileNumber = mobileNumber;
            JoinDate = joinDate;
            RoleId = roleId;
            Manager = manager;
            ProjectId = projectId;
            CreatedOn = DateTime.Now;
            IsDeleted = isDeleted;
        }
        public Employee()
        {

        }
    }
}