using ToDoApp.Models.Core;

namespace ToDoApp.Models.Interfaces
{
    public interface IUserService
    {
        OperationResult AddUser(User user);
        OperationResult GetUsers();
        OperationResult GetUserByUserName(string userName);
    }
}
