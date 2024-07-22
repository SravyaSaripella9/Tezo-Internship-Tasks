namespace EmployeeDirectory.Models
{
    public class Employee
    {
        public string EmpNo {  get; set; }
        public string FirstName { get; set; }
        public string LastName {  get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public DateOnly JoinDate { get; set; }
        public string RoleId {  get; set; }
        public string Manager { get; set; }
        public int ProjectId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? LastModifiedOn {  get; set; }
        public bool IsDeleted { get; set; } 
        public Employee(string empNo, string firstName, string lastName, DateOnly dateOfBirth, string email, string mobileNumber, DateOnly joinDate, string roleId, string manager, int projectId, bool isDeleted)
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
    }
}