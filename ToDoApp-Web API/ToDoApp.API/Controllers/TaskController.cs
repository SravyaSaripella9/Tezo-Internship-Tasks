using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoApp.Models;
using ToDoApp.Models.Core;
using ToDoApp.Models.Interfaces;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    [Authorize]
    public class TaskController(ITaskService _taskService) : ControllerBase
    {
        [HttpGet]
        [Route("/GetAllTasks")]
        public ActionResult<List<Models.Task>> GetAllTasks()
        {
            string userName = User.FindFirstValue("Username")!;
            OperationResult result = _taskService.GetAllTasks(userName);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return (List<Models.Task>)result.Data;
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpGet]
        [Route("/GetActiveTasks")]
        public ActionResult<List<Models.Task>> GetActiveTasks()
        {
            string userName = User.FindFirstValue("Username")!;
            OperationResult result = _taskService.GetActiveTasks(userName);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return (List<Models.Task>)result.Data;
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpGet]
        [Route("/GetCompletedTasks")]
        public ActionResult<List<Models.Task>> GetCompletedTasks()
        {
            string userName = User.FindFirstValue("Username")!;
            OperationResult result = _taskService.GetCompletedTasks(userName);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return (List<Models.Task>)result.Data;
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpGet]
        [Route("/GetPendingTasks")]
        public ActionResult<List<Models.Task>> GetPendingTasks()
        {
            string userName = User.FindFirstValue("Username")!;
            OperationResult result = _taskService.GetPendingTasks(userName);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return (List<Models.Task>)result.Data;
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpGet]
        [Route("/GetStatistics")]
        public ActionResult<List<TaskStatistics>> GetStatistics()
        {
            string userName = User.FindFirstValue("Username")!;
            OperationResult result = _taskService.GetStatistics(userName);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return (List<TaskStatistics>)result.Data;
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpPost]
        [Route("/AddTask")]
        public ActionResult AddTask([FromBody] Models.Task task)
        {
            string userName = User.FindFirstValue("Username")!;
            if (task == null)
                return BadRequest("Task is null");
            OperationResult result = _taskService.AddTask(userName, task);
            if (result.IsSuccess)
                return Ok();
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpPut("/UpdateTask/{id}")]
        public ActionResult UpdateTask(Models.Task updatedTask)
        {
            string userName = User.FindFirstValue("UserName")!;
            if (updatedTask == null)
                return BadRequest("Task is null");
            OperationResult result = _taskService.UpdateTask(userName, updatedTask);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return Ok();
            }
            else
                return BadRequest(result.ErrorMessage);
        }
        [HttpPut("/UpdateTaskStatus/{id}")]
        public ActionResult UpdateTaskStatus(Models.Task updatedTask)
        {
            string userName = User.FindFirstValue("UserName")!;
            if (updatedTask == null)
                return BadRequest("Task is null");
            OperationResult result = _taskService.UpdateTaskStatus(userName, updatedTask);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return Ok();
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpDelete("/DeleteTask/{id}")]
        public ActionResult DeleteTask(int id)
        {
            string userName = User.FindFirstValue("UserName")!;
            OperationResult result = _taskService.DeleteTask(userName, id);
            if (result.IsSuccess)
            {
                if (result.Data == null)
                    return NotFound();
                else
                    return Ok();
            }
            else
                return BadRequest(result.ErrorMessage);
        }

        [HttpDelete]
        [Route("/DeleteAllTasks")]
        public ActionResult DeleteAllTasks()
        {
            string userName = User.FindFirstValue("UserName")!;
            OperationResult result = _taskService.DeleteAllTasks(userName);
            if (result.IsSuccess)
                return NoContent();
            else
                return BadRequest(result.ErrorMessage);
        }
    }
}
