using ToDoApp.Models;
using ToDoApp.Models.Interfaces;
using ToDoApp.Data.Interfaces;
using DM = ToDoApp.Data.DataModels;
using ToDoApp.Models.Core;

namespace ToDoApp.Business.Services
{
    public class UserValidatorService(IGenericRepository<DM.User> _genericRepository) : IUserValidatorService
    {
        public OperationResult ValidateUserSignIn(UserLogin userCredentials)
        {
            List<DM.User> users = _genericRepository.GetAll();
            DM.User? user = users.FirstOrDefault(_ => _.UserName.Equals(userCredentials.UserName));
            if (user == null)
                return OperationResult.OnFailure("Username or password is invalid");
            else
            {
                if(BCrypt.Net.BCrypt.Verify(userCredentials.Password, user.Password))
                    return OperationResult.OnSuccess(null);
                return OperationResult.OnFailure("Username or password is invalid");
            }
        }
        public OperationResult ValidateUserSignUp(User userCredentials)
        {
            List<DM.User> users = _genericRepository.GetAll();
            DM.User? user = users.FirstOrDefault(_ => _.UserName.Equals(userCredentials.UserName));
            if (user != null)
                return OperationResult.OnFailure("The username already exists");
            return OperationResult.OnSuccess(null);
        }
    }
}
