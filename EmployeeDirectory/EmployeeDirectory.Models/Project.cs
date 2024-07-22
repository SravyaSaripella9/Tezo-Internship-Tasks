namespace EmployeeDirectory.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Project(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}