namespace EmployeeDirectory.Models.ViewModels
{
    public class RoleViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string DepartmentName { get; set; }
        public string? Description { get; set; }
        public string LocationName { get; set; }
        public RoleViewModel(string id, string name, string departmentName, string? description, string locationName)
        {
            Id = id;
            Name = name;
            DepartmentName = departmentName;
            Description = description;
            LocationName = locationName;
        }
    }
}
