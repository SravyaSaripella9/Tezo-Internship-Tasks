namespace EmployeeDirectory.Data.DataModels;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int DepartmentId { get; set; }

    public string? Description { get; set; }

    public int LocationId { get; set; }
    public Location Location { get; set; } = null!;
    public Department Department { get; set; } = null!;
}
