using EmployeeDirectory.Models;
using EmployeeDirectory.Models.Interfaces;

namespace EmployeeDirectory.UI
{
    class RoleManagementMenu : IRoleManagementMenu
    {
        readonly IRolesController rolesController;
        public RoleManagementMenu(IRolesController rolesController)
        {
            this.rolesController = rolesController;
        }
        public void DisplayRoleManagementMenu()
        {
            int roleMenuOption = 0;
            while (roleMenuOption != 3)
            {
                Console.WriteLine(Constants.ROLEMANAGEMENTMENUHEADER);
                Console.WriteLine($"1. {Constants.ADDROLE}");
                Console.WriteLine($"2. {Constants.DISPLAYALL}");
                Console.WriteLine($"3. {Constants.GOBACK}");
                Console.WriteLine("Please enter an option from the given menu:");
                string option = Console.ReadLine()!;
                var response = ValidationService.IsValidOption(option, 1, 3);
                while (!response.IsValid)
                {
                    Console.WriteLine(response.ErrorMessage);
                    option = Console.ReadLine()!;
                    response = ValidationService.IsValidOption(option, 1, 3);
                }
                roleMenuOption = int.Parse(option);
                switch (roleMenuOption)
                {
                    case 1:
                        GetRoleDetails();
                        break;
                    case 2:
                        DisplayRoles();
                        break;
                    case 3:
                        Console.WriteLine("Going back to main menu");
                        break;
                }
            }
        }
        public void GetRoleDetails()
        {
            Console.WriteLine("Please enter role name:");
            string name = Console.ReadLine()!;
            var response = rolesController.ValidateRoleName(name);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                name = Console.ReadLine()!;
                response = rolesController.ValidateRoleName(name);
            }
            Console.WriteLine("Please enter department:");
            Console.WriteLine("The available options for department are:");
            List<Department> departments = rolesController.GetDepartments();
            for (int i = 0; i < departments.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {departments[i].Name}");
            }
            Console.WriteLine("Please enter any one option from the above list of options:");
            string option = Console.ReadLine()!;
            response = ValidationService.IsValidOption(option, 1, departments.Count);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                option = Console.ReadLine()!;
                response = ValidationService.IsValidOption(option, 1, departments.Count);
            }
            int optionEntered = int.Parse(option);
            Department department = departments[optionEntered - 1];
            Console.WriteLine("Please enter role description:");
            string? description = Console.ReadLine();
            Console.WriteLine("Please enter location:");
            Console.WriteLine("The available options for location are:");
            List<Location> locations = rolesController.GetLocations();
            for (int i = 0; i < locations.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {locations[i].Name}");
            }
            Console.WriteLine("Please enter any one option from the above list of options:");
            option = Console.ReadLine()!;
            response = ValidationService.IsValidOption(option, 1, locations.Count);
            while (!response.IsValid)
            {
                Console.WriteLine(response.ErrorMessage);
                option = Console.ReadLine()!;
                response = ValidationService.IsValidOption(option, 1, locations.Count);
            }
            optionEntered = int.Parse(option);
            Location location = locations[optionEntered - 1];
            Role roleViewModel = new Role(0, name, department.Id, department.Name, description, location.Id, location.Name);
            rolesController.AddRole(roleViewModel);
        }
        public void DisplayRoles()
        {
            List<Role> roles = rolesController.GetRoles();
            if (roles.Count == 0)
                Console.WriteLine("Sorry, there are no roles to be displayed");
            else
            {
                foreach (Role role in roles)
                {
                    Console.WriteLine($"Role Name : {role.Name}");
                    Console.WriteLine($"Role Department : {role.DepartmentName}");
                    Console.WriteLine($"Role Description : {role.Description}");
                    Console.WriteLine($"Role Location : {role.LocationName}");
                    Console.WriteLine("========================================");
                }
            }
        }
    }
}