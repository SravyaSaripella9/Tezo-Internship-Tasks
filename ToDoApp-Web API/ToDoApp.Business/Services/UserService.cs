using AutoMapper;
using ToDoApp.Models.Interfaces;
using ToDoApp.Data.Interfaces;
using DM = ToDoApp.Data.DataModels;
using ToDoApp.Models;
using ToDoApp.Models.Core;

namespace ToDoApp.Business.Services
{
    public class UserService(IGenericRepository<DM.User> _genericRepository, IUserRepository _userRepository, IMapper _mapper) : IUserService
    {
        public OperationResult AddUser(User user)
        {
            try
            {
                DM.User userDataModel = _mapper.Map<DM.User>(user);
                userDataModel.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _genericRepository.InsertRecord(userDataModel);
                return OperationResult.OnSuccess(null);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to add user: {ex.Message}");
            }
        }
        public OperationResult GetUsers()
        {
            try
            {
                List<DM.User> userDataModels = _userRepository.GetUsers();
                List<User> users = _mapper.Map<List<User>>(userDataModels);
                return OperationResult.OnSuccess(users);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to get users: {ex.Message}");
            }
        }
        public OperationResult GetUserByUserName(string userName)
        {
            try
            {
                DM.User userDataModel = _userRepository.GetUserByUserName(userName);
                User user = _mapper.Map<User>(userDataModel);
                return OperationResult.OnSuccess(user);
            }
            catch (Exception ex)
            {
                return OperationResult.OnFailure($"Failed to get user: {ex.Message}");
            }
        }
    }
}