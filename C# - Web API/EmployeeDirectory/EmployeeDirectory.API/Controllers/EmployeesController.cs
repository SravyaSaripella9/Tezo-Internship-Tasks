using Microsoft.AspNetCore.Mvc;
using EmployeeDirectory.Models.Interfaces;
using EmployeeDirectory.Models;

namespace EmployeeDirectory.UI.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class EmployeesController : ControllerBase
    {
        public IEmployeeService employeeService;
        public EmployeesController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpGet]
        public ActionResult<List<Employee>> GetAllEmployees()
        {
            return employeeService.GetEmployees();
        }
    }
}
