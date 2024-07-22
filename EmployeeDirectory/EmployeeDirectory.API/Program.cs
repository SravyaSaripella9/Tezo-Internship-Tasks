using EmployeeDirectory.Business.Services;
using EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Data.Repositories;
using EmployeeDirectory.Data;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.UI
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<ApplicationDbContext>();
            builder.Services.AddTransient<IGenericRepository<Employee>, GenericRepository<Employee>>();
            builder.Services.AddTransient<IGenericRepository<Role>, GenericRepository<Role>>();
            builder.Services.AddTransient<IGenericRepository<Project>, GenericRepository<Project>>();
            builder.Services.AddTransient<IGenericRepository<Location>, GenericRepository<Location>>();
            builder.Services.AddTransient<IGenericRepository<Department>, GenericRepository<Department>>();
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            builder.Services.AddTransient<IRoleRepository, RoleRepository>();
            builder.Services.AddTransient<IProjectRepository, ProjectRepository>();
            builder.Services.AddTransient<IDepartmentRepository, DepartmentRepository>();
            builder.Services.AddTransient<ILocationRepository, LocationRepository>();
            builder.Services.AddTransient<IEmployeeService, EmployeeService>();
            builder.Services.AddTransient<IRoleService, RoleService>();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer(); 
            builder.Services.AddSwaggerGen();
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
}