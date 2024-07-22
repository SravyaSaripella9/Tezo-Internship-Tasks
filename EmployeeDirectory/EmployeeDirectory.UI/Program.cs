using EmployeeDirectory.Business.Controllers;
using EmployeeDirectory.Data;
using EmployeeDirectory.Models.Interfaces;
using EmployeeDirectory.Business.Services;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using EmployeeDirectory.Data.DataModels;
using EmployeeDirectory.Data.Repositories;

namespace EmployeeDirectory.UI
{
    class Program
    {
        static void Main(string[] args)
        {
            IGenericRepository<Employee> employeeGenericRepository = new GenericRepository<Employee>();
            IGenericRepository<Role> roleGenericRepository = new GenericRepository<Role>();
            IGenericRepository<Project> projectGenericRepository = new GenericRepository<Project>();
            IGenericRepository<Location> locationGenericRepository = new GenericRepository<Location>();
            IGenericRepository<Department> departmentGenericRepository = new GenericRepository<Department>();
            IServiceCollection services = new ServiceCollection();
            services.AddAutoMapper(typeof(MappingProfile));
            ServiceProvider serviceProvider = services.BuildServiceProvider();
            IMapper mapper = serviceProvider.GetRequiredService<IMapper>();
            IEmployeeRepository employeeRepository = new EmployeeRepository(employeeGenericRepository, mapper);
            IRoleRepository roleRepository = new RoleRepository(roleGenericRepository, mapper);
            ProjectRepository projectRepository = new ProjectRepository(projectGenericRepository, mapper);
            DepartmentRepository departmentRepository = new DepartmentRepository(departmentGenericRepository, mapper);
            LocationRepository locationRepository = new LocationRepository(locationGenericRepository, mapper);
            IEmployeeService employeeService = new EmployeeService(employeeGenericRepository, employeeRepository, projectRepository, mapper);
            IRoleService roleService = new RoleService(roleGenericRepository, roleRepository, departmentRepository, locationRepository, mapper);
            IEmployeesController employeesController = new EmployeesController(employeeService);
            IRolesController rolesController = new RolesController(roleService);
            IEmployeeManagementMenu employeeManagementMenu = new EmployeeManagementMenu(employeesController, rolesController);
            IRoleManagementMenu roleManagementMenu = new RoleManagementMenu(rolesController);
            IMainMenu menu = new MainMenu(employeeManagementMenu, roleManagementMenu);
            menu.DisplayMainMenu();
        }
    }
}