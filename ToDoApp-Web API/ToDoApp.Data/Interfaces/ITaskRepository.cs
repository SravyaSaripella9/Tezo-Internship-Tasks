using DM = ToDoApp.Data.DataModels;

namespace ToDoApp.Data.Interfaces
{
    public interface ITaskRepository
    {
        List<DM.Task> GetCurrentTasksByUserId(int userId);
        List<DM.Task> GetPendingTasksByUserId(int userId);
    }
}