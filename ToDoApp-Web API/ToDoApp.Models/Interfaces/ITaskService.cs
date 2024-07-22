using ToDoApp.Models.Core;

namespace ToDoApp.Models.Interfaces
{
    public interface ITaskService
    {
        OperationResult AddTask(string userName, Models.Task task);
        OperationResult GetAllTasks(string userName);
        OperationResult GetActiveTasks(string userName);
        OperationResult GetCompletedTasks(string userName);
        OperationResult GetPendingTasks(string userName);
        OperationResult GetStatistics(string userName);
        OperationResult UpdateTask(string userName, Models.Task updatedTask);
        OperationResult UpdateTaskStatus(string userName, Models.Task updatedTask);
        OperationResult DeleteTask(string userName, int id);
        OperationResult DeleteAllTasks(string userName);
    }
}
