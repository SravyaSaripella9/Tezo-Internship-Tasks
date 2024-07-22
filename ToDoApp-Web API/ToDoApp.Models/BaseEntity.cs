namespace ToDoApp.Models
{
    public interface IEntity
    {

    }
    public class BaseEntity : IEntity
    {
        public int Id { get; set; }
    }
}
