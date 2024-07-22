namespace ToDoApp.Models
{
    public class TaskStatistics
    {
        public double Percentage { get; set; }
        public string Category { get; set; }
        public TaskStatistics(double percentage, string category)
        {
            Percentage = percentage;
            Category = category;
        }
    }
}
