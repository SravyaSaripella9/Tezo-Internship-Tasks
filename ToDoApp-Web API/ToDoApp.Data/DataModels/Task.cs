namespace ToDoApp.Data.DataModels
{
    public class Task : Models.Task
    {
        public DateTime? LastModifiedOn {  get; set; }
        public bool IsDeleted { get; set; }
        public User User { get; set; } = null!;
    }
}
