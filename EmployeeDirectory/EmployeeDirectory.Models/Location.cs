namespace EmployeeDirectory.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Location(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}