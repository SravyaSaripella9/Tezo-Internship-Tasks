using AutoMapper;
using ToDoApp.Models;
using ToDoApp.Models.Interfaces;
using ToDoApp.Data.Interfaces;
using DM = ToDoApp.Data.DataModels;
using ToDoApp.Models.Core;

namespace ToDoApp.Business.Services
{
    public class TaskService(IGenericRepository<DM.Task> _genericRepository, ITaskRepository _taskRepository, IUserRepository _userRepository, IMapper _mapper) : ITaskService
    {
        public OperationResult AddTask(string userName, Models.Task task)
        {
            try
            {
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                DM.Task taskDataModel = _mapper.Map<DM.Task>(task);
                taskDataModel.UserId = user.Id;
                taskDataModel.CreatedOn = DateTime.Now;
                if (task.TaskDate == DateTime.MinValue)
                    taskDataModel.TaskDate = DateTime.Now;
                taskDataModel.IsCompleted = false;
                taskDataModel.IsDeleted = false;
                _genericRepository.InsertRecord(taskDataModel);
                return OperationResult.OnSuccess(null);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to add task: {ex.Message}");
            }
        }
        public OperationResult GetAllTasks(string userName)
        { 
            try
            {
                User user = (_userRepository.GetUsers()).First(_=>_.UserName.Equals(userName));
                List<DM.Task> taskDataModels = _taskRepository.GetCurrentTasksByUserId(user.Id);
                List<Models.Task> tasks = _mapper.Map<List<Models.Task>>(taskDataModels);
                return OperationResult.OnSuccess(tasks);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to get tasks: {ex.Message}");
            }
        }
        public OperationResult GetActiveTasks(string userName)
        {
            try
            {
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                List<DM.Task> taskDataModels = _taskRepository.GetCurrentTasksByUserId(user.Id);
                List<Models.Task> tasks = _mapper.Map<List<Models.Task>>(taskDataModels);
                tasks = tasks.Where(_ => !_.IsCompleted).ToList();
                return OperationResult.OnSuccess(tasks);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to get active tasks: {ex.Message}");
            }
        }
        public OperationResult GetCompletedTasks(string userName)
        {
            try
            {
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                List<DM.Task> taskDataModels = _taskRepository.GetCurrentTasksByUserId(user.Id);
                List<Models.Task> tasks = _mapper.Map<List<Models.Task>>(taskDataModels);
                tasks = tasks.Where(_ => _.IsCompleted).ToList();
                return OperationResult.OnSuccess(tasks);   
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to get completed tasks: {ex.Message}");
            }
        }
        public OperationResult GetPendingTasks(string userName)
        {
            try
            {
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                List<DM.Task> taskDataModels = _taskRepository.GetPendingTasksByUserId(user.Id);
                List<Models.Task> tasks = _mapper.Map<List<Models.Task>>(taskDataModels);
                return OperationResult.OnSuccess(tasks);
            }
            catch(Exception ex)
            {
                return OperationResult.OnFailure($"Failed to get pending tasks: {ex.Message}");
            }
        }
        public OperationResult GetStatistics(string userName)
        {
            try
            {
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                List<DM.Task> tasks = _taskRepository.GetCurrentTasksByUserId(user.Id);
                int noOfActiveTasks = tasks.AsQueryable().Count(_ => !_.IsCompleted);
                int noOfCompletedTasks = tasks.AsQueryable().Count(_ => _.IsCompleted);
                int noOfTotalTasks = noOfActiveTasks + noOfCompletedTasks;
                double activeTasksPercentage = (noOfActiveTasks * 100f)/ noOfTotalTasks;
                activeTasksPercentage = Math.Round(activeTasksPercentage, 2);
                double completedTasksPercentage = (noOfCompletedTasks * 100f)/ noOfTotalTasks;
                completedTasksPercentage = Math.Round(completedTasksPercentage, 2);
                List<TaskStatistics> statistics = new List<TaskStatistics>
                {
                    new TaskStatistics(activeTasksPercentage, "Active Tasks"),
                    new TaskStatistics(completedTasksPercentage, "Completed Tasks"),
                };
                return OperationResult.OnSuccess(statistics);
            }
            catch(Exception ex)
            {
                return OperationResult.OnFailure($"Failed to get task statistics: {ex.Message}");
            }
        }
        public OperationResult UpdateTask(string userName, Models.Task updatedTask)
        {
            try
            {
                DM.Task? task = _genericRepository.GetById(updatedTask.Id);
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                task = task.UserId == user.Id ? task : null;
                if (task != null)
                {
                    task.Title = updatedTask.Title;
                    task.Description = updatedTask.Description;
                    task.TaskDate = updatedTask.TaskDate;
                    task.LastModifiedOn = DateTime.Now;
                    _genericRepository.UpdateRecord(task);
                }
                return OperationResult.OnSuccess(task);
            }
            catch(Exception ex)
            {
                return OperationResult.OnFailure($"Failed to update task: {ex.Message}");
            }
        }
        public OperationResult UpdateTaskStatus(string userName, Models.Task updatedTask)
        {
            try
            {
                DM.Task? task = _genericRepository.GetById(updatedTask.Id);
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                task = task.UserId == user.Id ? task : null;
                if (task != null)
                {
                    task.IsCompleted = updatedTask.IsCompleted;
                    if (updatedTask.IsCompleted)
                        task.CompletedOn = DateTime.Now;
                    else
                        task.CompletedOn = null;
                    _genericRepository.UpdateRecord(task);
                }
                return OperationResult.OnSuccess(task);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to update task: {ex.Message}");
            }
        }
        public OperationResult DeleteTask(string userName, int id)
        {
            try
            {
                DM.Task? task = _genericRepository.GetById(id);
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                task = task.UserId == user.Id ? task : null;
                if(task != null)
                {
                    task.IsDeleted = true;
                    _genericRepository.DeleteRecord(task);
                }
                return OperationResult.OnSuccess(task);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to delete task: {ex.Message}");
            }
        }
        public OperationResult DeleteAllTasks(string userName)
        {
            try
            {
                User user = (_userRepository.GetUsers()).First(_ => _.UserName.Equals(userName));
                List<DM.Task> tasks = _taskRepository.GetCurrentTasksByUserId(user.Id);
                foreach (DM.Task task in tasks)
                {
                    task.IsDeleted = true;
                }
                _genericRepository.DeleteAllRecords(tasks);
                return OperationResult.OnSuccess(null);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to delete tasks: {ex.Message}");
            }
        }
    }
}