using ToDoApp.Models.Core;

namespace ToDoApp.Models.Interfaces
{
    public interface IUserValidatorService
    {
        OperationResult ValidateUserSignIn(UserLogin userCredentials);
        OperationResult ValidateUserSignUp(User userCredentials);
    }
}
