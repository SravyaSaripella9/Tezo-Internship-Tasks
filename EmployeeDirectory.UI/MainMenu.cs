using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.UI
{
    class MainMenu : IMainMenu
    {
        IEmployeeManagementMenu employeeManagementMenu;
        IRoleManagementMenu roleManagementMenu;
        public MainMenu(IEmployeeManagementMenu employeeManagementMenu, IRoleManagementMenu roleManagementMenu)
        {
            this.employeeManagementMenu = employeeManagementMenu;
            this.roleManagementMenu = roleManagementMenu;
        }
        public void DisplayMainMenu()
        {
            int mainMenuOption = 0;
            while (mainMenuOption != 3)
            {
                Console.WriteLine(Constants.MAINMENUHEADER);
                Console.WriteLine($"1. {Constants.EMPLOYEEMANAGEMENTMENUHEADER}");
                Console.WriteLine($"2. {Constants.ROLEMANAGEMENTMENUHEADER}");
                Console.WriteLine($"3. {Constants.EXIT}");
                Console.WriteLine("Please enter an option from the given menu:");
                string option = Console.ReadLine()!;
                var response = ValidationService.IsValidOption(option, 1, 3);
                while (!response.IsValid)
                {
                    Console.WriteLine(response.ErrorMessage);
                    option = Console.ReadLine()!;
                    response = ValidationService.IsValidOption(option, 1, 3);
                }
                mainMenuOption = int.Parse(option);
                switch (mainMenuOption)
                {
                    case 1:
                        employeeManagementMenu.DisplayEmployeeManagementMenu();
                        break;
                    case 2:
                        roleManagementMenu.DisplayRoleManagementMenu();
                        break;
                    case 3:
                        Console.WriteLine("Exiting");
                        break;
                }
            }
        }
    }
}