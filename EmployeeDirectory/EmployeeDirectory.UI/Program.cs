using EmployeeDirectory.Business.Controllers;
using EmployeeDirectory.Data;
using EmployeeDirectory.Models.Interfaces;
using EmployeeDirectory.Business.Services;

namespace EmployeeDirectory.UI
{
    class Program
    {
        static void Main(string[] args)
        {
            ISqlHandler sqlHandler = new SqlHandler();
            IEmployeeService employeeService = new EmployeeService(sqlHandler);
            IRoleService roleService = new RoleService(sqlHandler);
            IEmployeesController employeesController = new EmployeesController(employeeService, roleService);
            IRolesController rolesController = new RolesController(roleService);
            IEmployeeManagementMenu employeeManagementMenu = new EmployeeManagementMenu(employeesController, rolesController);
            IRoleManagementMenu roleManagementMenu = new RoleManagementMenu(rolesController);
            IMainMenu menu = new MainMenu(employeeManagementMenu, roleManagementMenu);
            menu.DisplayMainMenu();
        }
    }
}
