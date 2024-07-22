using DM = ToDoApp.Data.DataModels;

namespace ToDoApp.Data.Interfaces
{
    public interface IUserRepository
    {
        List<DM.User> GetUsers();
        DM.User GetUserByUserName(string userName);
    }
}