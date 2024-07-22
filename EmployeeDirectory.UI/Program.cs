using EmployeeDirectory.Business.Controllers;
using EmployeeDirectory.Models.Interfaces;
using EmployeeDirectory.Business.Services;
using EmployeeDirectory.Data;

namespace EmployeeDirectory.UI
{
    class Program
    {
        static void Main(string[] args)
        {
            IJsonFileHandler jsonFileHandler = new JsonFileHandler();
            IEmployeeService employeeService = new EmployeeService(jsonFileHandler);
            IRoleService roleService = new RoleService(jsonFileHandler);
            IEmployeesController employeesController = new EmployeesController(employeeService, roleService);
            IRolesController rolesController = new RolesController(roleService);
            IEmployeeManagementMenu employeeManagementMenu = new EmployeeManagementMenu(employeesController, rolesController);
            IRoleManagementMenu roleManagementMenu = new RoleManagementMenu(rolesController);
            IMainMenu menu = new MainMenu(employeeManagementMenu, roleManagementMenu);
            menu.DisplayMainMenu();
        }
    }
}
