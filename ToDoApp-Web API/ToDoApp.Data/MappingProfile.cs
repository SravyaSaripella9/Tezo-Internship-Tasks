using AutoMapper;
using ToDoApp.Models;
using DM = ToDoApp.Data.DataModels;

namespace ToDoApp.Data
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<DM.Task, Models.Task>();
            CreateMap<DM.User, User>();
            CreateMap<Models.Task, DM.Task>();
            CreateMap<User, DM.User>();
        }
    }
}
