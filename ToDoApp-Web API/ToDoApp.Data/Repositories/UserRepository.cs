using ToDoApp.Data.Interfaces;
using DM = ToDoApp.Data.DataModels;

namespace ToDoApp.Data.Repositories
{
    public class UserRepository(IGenericRepository<DM.User> _genericRepository) : IUserRepository
    {
        public List<DM.User> GetUsers()
        {
            return _genericRepository.GetAll();
        }
        public DM.User GetUserByUserName(string userName)
        {
            List<DM.User> users = _genericRepository.GetAll();
            return users.First(_ => _.UserName == userName); 
        }
    }
}
