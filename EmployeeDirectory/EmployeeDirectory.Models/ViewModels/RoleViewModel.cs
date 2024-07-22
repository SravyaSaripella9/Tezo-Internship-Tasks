namespace EmployeeDirectory.Models.ViewModels
{
    public class RoleViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DepartmentName { get; set; }
        public string? Description { get; set; }
        public string LocationName { get; set; }
        public RoleViewModel(int id, string name, string departmentName, string? description, string locationName)
        {
            Id = id;
            Name = name;
            DepartmentName = departmentName;
            Description = description;
            LocationName = locationName;
        }
    }
}
