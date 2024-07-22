using DM = ToDoApp.Data.DataModels;
using ToDoApp.Data.Interfaces;
using ToDoApp.Data.Extensions;

namespace ToDoApp.Data.Repositories
{
    public class TaskRepository(IGenericRepository<DM.Task> _genericRepository) : ITaskRepository
    {
        public List<DM.Task> GetCurrentTasksByUserId(int userId)
        {
            List<DM.Task> tasks = _genericRepository.GetAll();
            tasks = tasks.Where(_=>_.UserId.Equals(userId) && !_.IsDeleted && _.TaskDate.ToIST().Date.Equals(DateTime.Now.Date)).ToList();
            return tasks;
        }
        public List<DM.Task> GetPendingTasksByUserId(int userId)
        {
            List<DM.Task> tasks = _genericRepository.GetAll();
            tasks = tasks.Where(_ => _.UserId.Equals(userId) && !_.IsDeleted && !_.TaskDate.ToIST().Date.Equals(DateTime.Now.Date) && !_.IsCompleted).ToList();
            return tasks;
        }
    }
}