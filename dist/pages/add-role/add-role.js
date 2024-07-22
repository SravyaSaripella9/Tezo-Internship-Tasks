import { fetchEmployeesData } from '../../services/employee-service.js';
import { fetchDOMElementById, fetchDOMElementByQuerySelector, fetchDOMElementsByQuerySelectorAll } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { locations } from '../../models/constants.js';
import { departments } from '../../models/constants.js';
import { addToSelectedEmployee } from "../../services/role-service.js";
import { removeFromSelectedEmployee } from '../../services/role-service.js';
import { saveRole } from "../../services/role-service.js";
window.onload = () => {
    createDropdowns();
    createAssignEmployeesDropdown();
    window.displaySideNav = displaySideNav;
    window.toggleAssignEmployeesDropdown = toggleAssignEmployeesDropdown;
    window.searchEmployee = searchEmployee;
    window.isEmployeeSelected = isEmployeeSelected;
    window.addRole = addRole;
    window.navigateToRolesPage = navigateToRolesPage;
};
function createDropdowns() {
    let locationOptions = fetchDOMElementById("location");
    let departmentOptions = fetchDOMElementById("department");
    createDropdownOptions(locations, locationOptions);
    createDropdownOptions(departments, departmentOptions);
}
function createDropdownOptions(data, dropdownOptions) {
    for (let i = 0; i < data.length; i++) {
        dropdownOptions.innerHTML += `<option value="${data[i].value}">${data[i].value}</option>`;
    }
}
function createAssignEmployeesDropdown() {
    const assignEmployeesOptions = fetchDOMElementByQuerySelector(".assign-employees");
    let employees = fetchEmployeesData();
    for (let i = 0; i < employees.length; i++) {
        assignEmployeesOptions.innerHTML += `<div class="assign-employees-option">
        <div>
            <img src="${employees[i].empImage}" alt="Employee-Image">
            ${employees[i].firstName + " " + employees[i].lastName}
        </div>
        <div><input type="checkbox" onclick="isEmployeeSelected(this,'${employees[i].empNo}')"/></div>
    </div>`;
    }
}
let clickCount = 0;
function toggleAssignEmployeesDropdown() {
    const assignEmployeesOptions = fetchDOMElementByQuerySelector(".assign-employees");
    if (clickCount == 0) {
        assignEmployeesOptions.style.display = "block";
        clickCount++;
    }
    else {
        assignEmployeesOptions.style.display = "none";
        clickCount--;
    }
}
function searchEmployee() {
    let searchInput = (fetchDOMElementByQuerySelector("input[type='search']")).value;
    const assignEmployeesOptions = fetchDOMElementsByQuerySelectorAll(".assign-employees-option");
    let employees = fetchEmployeesData();
    for (let i = 0; i < employees.length; i++) {
        let empName = ((employees[i].firstName + " " + employees[i].lastName).toLowerCase());
        searchInput = searchInput.toLowerCase();
        if (empName.indexOf(searchInput) > -1)
            assignEmployeesOptions[i].style.display = "flex";
        else
            assignEmployeesOptions[i].style.display = "none";
    }
}
function isEmployeeSelected(element, id) {
    if (element.checked)
        addToSelectedEmployee(id);
    else
        removeFromSelectedEmployee(id);
}
function addRole() {
    let newRole = {
        id: performance.now(),
        name: (fetchDOMElementById("roleName")).value,
        department: (fetchDOMElementById("department")).value,
        roleDescription: (fetchDOMElementById("roleDescription")).value,
        location: (fetchDOMElementById("location")).value,
    };
    saveRole(newRole);
    window.location.reload();
    window.location.href = "../roles/roles.html";
}
function navigateToRolesPage() {
    window.location.href = "../roles/roles.html";
}
