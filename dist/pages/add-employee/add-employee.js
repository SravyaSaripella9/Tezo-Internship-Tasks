import { fetchEmployeesData } from '../../services/employee-service.js';
import { fetchRolesData } from '../../services/role-service.js';
import { Status } from '../../models/constants.js';
import { fetchDOMElementById, fetchDOMElementByQuerySelector } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { locations } from '../../models/constants.js';
import { departments } from '../../models/constants.js';
import { uploadImage } from '../../services/employee-service.js';
import { handleChange } from '../../services/employee-service.js';
import { validateMail } from '../../services/validation-service.js';
import { validateMobileNumber } from '../../services/validation-service.js';
import { viewDetails } from '../../services/employee-service.js';
import { updateEmployee } from '../../services/employee-service.js';
import { handleAddEmployeeInRoleDetailsPage } from '../../services/employee-service.js';
import { isEmpNoUnique } from '../../services/validation-service.js';
import { saveEmployee } from '../../services/employee-service.js';
window.onload = () => {
    let employees = fetchEmployeesData();
    let roles = fetchRolesData();
    createDropdowns(roles);
    createAssignManagerDropdown(employees);
    window.displaySideNav = displaySideNav;
    window.uploadImage = uploadImage;
    window.changeDropdownOptions = changeDropdownOptions;
    window.addEmployee = addEmployee;
    window.viewDetails = viewDetails(window.location.search);
    window.updateEmployee = updateEmployee(window.location.search);
    window.updateAddEmployeeInRoleDetailsPage = handleAddEmployeeInRoleDetailsPage(window.location.search);
    window.navigateToEmployeesPage = navigateToEmployeesPage;
};
export function createDropdowns(roles) {
    let loc = [];
    for (let i = 0; i < locations.length; i++) {
        loc[i] = locations[i].value;
    }
    let jobTitles = [];
    for (let i = 0; i < roles.length; i++) {
        jobTitles[i] = roles[i].name;
    }
    jobTitles = Array.from(new Set(jobTitles));
    let dept = [];
    for (let i = 0; i < departments.length; i++) {
        dept[i] = departments[i].value;
    }
    let locationOptions = fetchDOMElementById("location");
    locationOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    let jobTitleOptions = fetchDOMElementById("jobTitle");
    jobTitleOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    let departmentOptions = fetchDOMElementById("department");
    departmentOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    createDropdownOptions(loc, locationOptions);
    createDropdownOptions(jobTitles, jobTitleOptions);
    createDropdownOptions(dept, departmentOptions);
}
function createDropdownOptions(data, elementOptions) {
    for (let i = 0; i < data.length; i++) {
        elementOptions.innerHTML += `<option value="${data[i]}" id="${data[i]}">${data[i]}</option>`;
    }
}
export let assignManager = fetchDOMElementById("manager");
function createAssignManagerDropdown(employees) {
    assignManager.innerHTML = `<option value="Search" selected disabled hidden>Search</option>`;
    for (let i = 0; i < employees.length; i++) {
        assignManager.innerHTML += `<option value="${employees[i].firstName + " " + employees[i].lastName}">${employees[i].firstName + " " + employees[i].lastName}</option>`;
    }
}
function changeDropdownOptions(elementType) {
    let employees = fetchEmployeesData();
    const value = (fetchDOMElementById(elementType)).value;
    let filteredRoles = [];
    let managers = [];
    filteredRoles = handleChange(elementType, filteredRoles, value);
    const locationDropdown = fetchDOMElementById("location");
    locationDropdown.innerHTML = "";
    let uniqueLocations = fetchDropdownOptions(filteredRoles, "location");
    createDropdownOptions(uniqueLocations, locationDropdown);
    locationDropdown.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    const jobTitleDropdown = fetchDOMElementById("jobTitle");
    jobTitleDropdown.innerHTML = "";
    let uniqueJobTitles = fetchDropdownOptions(filteredRoles, "name");
    createDropdownOptions(uniqueJobTitles, jobTitleDropdown);
    jobTitleDropdown.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    const departmentDropdown = fetchDOMElementById("department");
    departmentDropdown.innerHTML = "";
    let uniqueDepartments = fetchDropdownOptions(filteredRoles, "department");
    createDropdownOptions(uniqueDepartments, departmentDropdown);
    departmentDropdown.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    for (let i = 0; i < employees.length; i++) {
        for (let j = 0; j < filteredRoles.length; j++) {
            if (employees[i].roleId == filteredRoles[j].id) {
                managers.push(employees[i].firstName + " " + employees[i].lastName);
            }
        }
    }
    assignManager.innerHTML = "";
    for (let i = 0; i < managers.length; i++) {
        assignManager.innerHTML += `<option value="${managers[i]}">${managers[i]}</option>`;
    }
}
function fetchDropdownOptions(filteredRoles, dropdownType) {
    let uniqueDropdownOptions = Array.from(new Set(filteredRoles.map((role) => role[dropdownType])));
    return uniqueDropdownOptions;
}
function addEmployee() {
    let newEmployee = {
        empImage: (fetchDOMElementById("employeeImage")).src,
        empNo: (fetchDOMElementById("empNo")).value,
        firstName: (fetchDOMElementById("firstName")).value,
        lastName: (fetchDOMElementById("lastName")).value,
        dob: new Date((fetchDOMElementById("dob")).value),
        mail: (fetchDOMElementById("mail")).value,
        contactNo: Number((fetchDOMElementById("contactNo")).value),
        joinDate: new Date((fetchDOMElementById("joinDate")).value),
        manager: (fetchDOMElementById("manager")).value,
        projectName: (fetchDOMElementById("projectName")).value,
        roleId: 0,
        status: Status.Active,
    };
    let location = (fetchDOMElementById("location")).value;
    let jobTitle = (fetchDOMElementById("jobTitle")).value;
    let department = (fetchDOMElementById("department")).value;
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    if (urlParams != null) {
        let action = urlParams.get('action');
        if (action == null) {
            let employees = fetchEmployeesData();
            if (isEmpNoUnique(newEmployee.empNo, employees))
                saveEmployee(newEmployee, location, jobTitle, department);
            else {
                alert("The Emp No that is entered already exists");
            }
        }
        else {
            saveEmployee(newEmployee, location, jobTitle, department);
        }
    }
    if (!validateMobileNumber(newEmployee.contactNo)) {
        alert("Please enter valid mobile number");
    }
    if (!validateMail(newEmployee.mail)) {
        alert("Please enter valid email ID");
    }
    window.location.reload();
    window.location.href = "../employees/employees.html";
}
function navigateToEmployeesPage() {
    window.location.href = "../employees/employees.html";
}
export function displayDefaultData(employee) {
    let roles = fetchRolesData();
    let employeeRole = roles.find((role) => role.id == employee.roleId);
    (fetchDOMElementById("employeeImage")).src = employee.empImage;
    (fetchDOMElementById("empNo")).value = employee.empNo;
    (fetchDOMElementById("firstName")).value = employee.firstName;
    (fetchDOMElementById("lastName")).value = employee.lastName;
    (fetchDOMElementById("dob")).value = String(employee.dob);
    (fetchDOMElementById("mail")).value = employee.mail;
    (fetchDOMElementById("contactNo")).value = String(employee.contactNo);
    (fetchDOMElementById("joinDate")).value = String(employee.joinDate);
    if (employeeRole != undefined) {
        (fetchDOMElementById(`${employeeRole.location}`)).selected = true;
        (fetchDOMElementById(`${employeeRole.name}`)).selected = true;
        (fetchDOMElementById(`${employeeRole.department}`)).selected = true;
    }
    (fetchDOMElementById("manager")).value = employee.manager;
    (fetchDOMElementById("projectName")).value = employee.projectName;
}
export function disableEditableViewDetails() {
    (fetchDOMElementByQuerySelector(".add-employee-heading")).innerHTML = "Employee Details";
    (fetchDOMElementByQuerySelector(".add-employee-profile input")).disabled = true;
    (fetchDOMElementByQuerySelector(".add-employee-profile button")).disabled = true;
    (fetchDOMElementById("empNo")).readOnly = true;
    (fetchDOMElementById("empNo")).readOnly = true;
    (fetchDOMElementById("firstName")).readOnly = true;
    (fetchDOMElementById("lastName")).readOnly = true;
    (fetchDOMElementById("dob")).readOnly = true;
    (fetchDOMElementById("mail")).readOnly = true;
    (fetchDOMElementById("contactNo")).readOnly = true;
    (fetchDOMElementById("joinDate")).readOnly = true;
    (fetchDOMElementById("location")).disabled = true;
    (fetchDOMElementById("jobTitle")).disabled = true;
    (fetchDOMElementById("department")).disabled = true;
    (fetchDOMElementById("manager")).disabled = true;
    (fetchDOMElementById("projectName")).disabled = true;
    (fetchDOMElementById("submitButton")).style.display = "none";
}
export function configureUpdateEmployeeForm() {
    (fetchDOMElementByQuerySelector(".add-employee-heading")).innerHTML = "Edit Employee";
    (fetchDOMElementById("empNo")).readOnly = true;
    (fetchDOMElementById("submitButton")).innerHTML = "Edit";
}
export function updateRoleDetailsInAddEmployeeForm(role) {
    (fetchDOMElementById(`${role === null || role === void 0 ? void 0 : role.location}`)).selected = true;
    (fetchDOMElementById(`${role === null || role === void 0 ? void 0 : role.name}`)).selected = true;
    (fetchDOMElementById(`${role === null || role === void 0 ? void 0 : role.department}`)).selected = true;
}
