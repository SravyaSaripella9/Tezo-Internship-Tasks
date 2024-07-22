using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ToDoApp.Business.Services;
using ToDoApp.Data;
using DM = ToDoApp.Data.DataModels;
using ToDoApp.Data.Repositories;
using ToDoApp.Models.Interfaces;
using ToDoApp.Data.Interfaces;

namespace ToDoApp.UI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);   
        builder.Services.AddDbContext<ApplicationDbContext>();
        builder.Services.AddTransient<IGenericRepository<DM.Task>, GenericRepository<DM.Task>>();
        builder.Services.AddTransient<IGenericRepository<DM.User>, GenericRepository<DM.User>>();
        builder.Services.AddAutoMapper(typeof(MappingProfile));
        builder.Services.AddTransient<ITaskRepository, TaskRepository>();
        builder.Services.AddTransient<IUserRepository, UserRepository>();
        builder.Services.AddTransient<ITaskService, TaskService>();
        builder.Services.AddTransient<IUserService, UserService>();
        builder.Services.AddTransient<IUserValidatorService, UserValidatorService>();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        });
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "ALLOWALL", builder =>
            {
                builder.WithOrigins("*").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
        });
        WebApplication app = builder.Build();
        app.UseCors("ALLOWALL");
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}