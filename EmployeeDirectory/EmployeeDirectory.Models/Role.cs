namespace EmployeeDirectory.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public string? Description { get; set; }
        public int LocationId { get; set; }
        public Role(string name, int departmentId, string? description, int locationId)
        {
            Name = name;
            DepartmentId = departmentId;
            Description = description;
            LocationId = locationId;
        }
        public Role()
        {

        }
    }
}