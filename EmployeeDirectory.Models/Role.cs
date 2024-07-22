namespace EmployeeDirectory.Models
{
    public class Role
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public string Description { get; set; }
        public int LocationId { get; set; }
        public Role(string id, string name, int departmentId, string description, int locationId)
        {
            Id = id;
            Name= name;    
            DepartmentId = departmentId;
            Description = description;
            LocationId = locationId;
        }
    }
}