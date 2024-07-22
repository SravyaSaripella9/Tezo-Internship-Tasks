namespace EmployeeDirectory.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string? Description { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public Role(int id, string name, int departmentId, string departmentName, string? description, int locationId, string locationName)
        {
            Id = id;
            Name = name;
            DepartmentId = departmentId;
            DepartmentName = departmentName;
            Description = description;
            LocationId = locationId;
            LocationName = locationName;
        }
    }
}