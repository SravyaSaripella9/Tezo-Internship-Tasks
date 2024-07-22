namespace EmployeeDirectory.Data.DataModels;

public partial class Employee
{
    public int Id { get; set; }

    public string EmpNo { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public string Email { get; set; } = null!;

    public string? MobileNumber { get; set; }

    public DateTime JoinDate { get; set; }

    public int RoleId { get; set; }

    public string? Manager { get; set; }

    public int? ProjectId { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? LastModifiedOn { get; set; }

    public bool IsDeleted { get; set; }
    public Role Role { get; set; } = null!;
    public Project? Project { get; set; }

}
