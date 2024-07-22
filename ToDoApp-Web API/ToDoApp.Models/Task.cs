namespace ToDoApp.Models
{
    public class Task : BaseEntity
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedOn {  get; set; }
        public DateTime TaskDate { get; set; } = DateTime.MinValue;
        public bool IsCompleted { get; set; }
        public DateTime? CompletedOn { get; set; }   
    }
}