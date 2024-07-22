import { StorageService } from '../../services/storage-service.js';
import { fetchEmployeesData } from '../../services/employee-service.js';
import { fetchRolesData } from '../../services/role-service.js';
import { fetchDOMElementById, fetchDOMElementByQuerySelector, fetchDOMElementsByQuerySelectorAll } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { locations } from '../../models/constants.js';
import { departments } from '../../models/constants.js';
import { fetchFilteredData } from '../../services/filter-service.js';
import { deleteEmployee } from '../../services/employee-service.js';
import { fetchDataToExport } from '../../services/export-service.js';
import { applySort } from '../../services/filter-service.js';
window.onload = () => {
    let employees = fetchEmployeesData();
    createTable(employees);
    createAlphabetButtons();
    createFilterDropdowns();
    window.displaySideNav = displaySideNav;
    window.filterEmployeesByName = filterEmployeesByName;
    window.exportData = exportData;
    window.toggleEmployee = toggleEmployee;
    window.toggleAllEmployees = toggleAllEmployees;
    window.deleteEmployee = deleteEmployee;
    window.showOrHideMenu = showOrHideMenu;
    window.sortColumn = sortColumn;
    window.applyAlphabetFilter = applyAlphabetFilter;
    window.changeFilterIconColor = changeFilterIconColor;
    window.sortColumn = sortColumn;
    window.displayDropdown = displayDropdown;
    window.applyFilter = applyFilter;
    window.resetFilter = resetFilter;
    window.employeesFilteredByAlphabet = employeesFilteredByAlphabet;
};
export function createTable(employees) {
    const tableBody = fetchDOMElementByQuerySelector(".employees-table-body");
    tableBody.innerHTML = "";
    let roles = fetchRolesData();
    for (let i = 0; i < employees.length; i++) {
        let employeeRole = roles.find((role) => role.id == employees[i].roleId);
        let tableRow = document.createElement("tr");
        tableRow.classList.add("row");
        tableRow.innerHTML += `<td class="check-box"><input type="checkbox" onclick="toggleEmployee(this,'${employees[i].empNo}')"/></td>
            <td class="table-data">
                <div class="table-profile">
                    <img src="${employees[i].empImage}">
                    <div class="employee-details">
                        <div class="employee-name">${employees[i].firstName + " " + employees[i].lastName}</div>
                        <div class="employee-mail">${employees[i].mail}</div>
                    </div>
                </div>
            </td>
            <td class="table-data">${(employeeRole === null || employeeRole === void 0 ? void 0 : employeeRole.location) || ""}</td>
            <td class="table-data">${(employeeRole === null || employeeRole === void 0 ? void 0 : employeeRole.department) || ""}</td>
            <td class="table-data">${(employeeRole === null || employeeRole === void 0 ? void 0 : employeeRole.name) || ""}</td>
            <td class="table-data">${employees[i].empNo}</td>
            <td class="table-data"><button class="active-button" title="Active">Active</button></td>
            <td class="table-data">${new Date(employees[i].joinDate).toLocaleDateString()}</td>
            <td class="table-data" id='cell-${i}'>
                <button class="ellipsis-button" onclick="showOrHideMenu(${i})">
                    <img class="ellipsis" src="../../../assets/dots.png" alt="Ellipsis" />
                </button>
            </td>
        </tr>`;
        tableBody.appendChild(tableRow);
    }
}
function filterEmployeesByName() {
    let searchInput = (fetchDOMElementByQuerySelector("input[type='search']")).value;
    const tableRow = fetchDOMElementsByQuerySelectorAll("tr");
    let employees = fetchEmployeesData();
    for (let i = 0; i < employees.length; i++) {
        let empName = ((employees[i].firstName + " " + employees[i].lastName).toLowerCase());
        searchInput = searchInput.toLowerCase();
        if (empName.indexOf(searchInput) > -1) {
            tableRow[i + 1].style.display = "flex";
            tableRow[i + 1].style.alignItems = "center";
        }
        else
            tableRow[i + 1].style.display = "none";
    }
}
function exportData() {
    const blob = fetchDataToExport();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employees-table.csv';
    link.click();
}
function sortColumn(col) {
    const table = fetchDOMElementByQuerySelector(".employees-table table");
    let row = Array.from(table.rows).slice(1);
    let currentHeader = fetchDOMElementsByQuerySelectorAll(".sorted-table-header");
    if (currentHeader.length > 0) {
        currentHeader[0].className = currentHeader[0].className.replace("sorted-table-header", "");
    }
    const tableRowHeader = fetchDOMElementsByQuerySelectorAll("thead th div")[col - 1];
    tableRowHeader.classList.add("sorted-table-header");
    row = applySort(table, row, col);
    table.tBodies[0].innerHTML = "";
    table.tBodies[0].append(...row);
}
let alphabeticalButtons = fetchDOMElementByQuerySelector(".alphabetical-buttons-container");
let filterImageRed = fetchDOMElementByQuerySelector(".filter-red-image");
let filterImageBlack = fetchDOMElementByQuerySelector(".filter-black-image");
let current;
//Code for alphabetical buttons creation.
function createAlphabetButtons() {
    for (let i = 65; i <= 90; i++) {
        alphabeticalButtons.innerHTML += `<button onclick="applyAlphabetFilter(this,'${String.fromCharCode(i)}')" class="alphabet-button" value=${String.fromCharCode(i)}>${String.fromCharCode(i)}</button>`;
    }
}
//Code for click function of alphabetical buttons.
let currentCharacter = "";
function applyAlphabetFilter(element, character) {
    current = fetchDOMElementsByQuerySelectorAll(".active-alphabet");
    if (current.length > 0) {
        current[0].className = current[0].className.replace("active-alphabet", "");
    }
    element.classList.add("active-alphabet");
    filterImageBlack.style.display = "none";
    filterImageRed.style.display = "block";
    currentCharacter = character;
    applyFilter();
}
function changeFilterIconColor() {
    filterImageRed.style.display = "none";
    filterImageBlack.style.display = "block";
    current = fetchDOMElementsByQuerySelectorAll(".active-alphabet");
    if (current.length > 0) {
        current[0].className = current[0].className.replace("active-alphabet", "");
    }
    currentCharacter = "";
    applyFilter();
}
function createFilterDropdowns() {
    let locationOptions = fetchDOMElementByQuerySelector(".location-options");
    let departmentOptions = fetchDOMElementByQuerySelector(".department-options");
    createFilterDropdownOptions(locations, locationOptions, "location-option");
    createFilterDropdownOptions(departments, departmentOptions, "department-option");
}
function createFilterDropdownOptions(data, dropdownOptions, className) {
    for (let i = 0; i < data.length; i++) {
        dropdownOptions.innerHTML += `<div class=${className}>${data[i].value}<input type="checkbox" value="${data[i].value}"/></div>`;
    }
}
function displayDropdown(dropdownType) {
    const statusOptionsContainer = fetchDOMElementByQuerySelector(".status-options");
    const locationOptionsContainer = fetchDOMElementByQuerySelector(".location-options");
    const departmentOptionsContainer = fetchDOMElementByQuerySelector(".department-options");
    let statusDropdownDisplay = statusOptionsContainer.style.display;
    let locationDropdownDisplay = locationOptionsContainer.style.display;
    let departmentDropdownDisplay = departmentOptionsContainer.style.display;
    if (dropdownType == "status") {
        statusDropdownDisplay = toggleDropdown(statusOptionsContainer, statusDropdownDisplay);
    }
    else if (dropdownType == "location") {
        locationDropdownDisplay = toggleDropdown(locationOptionsContainer, locationDropdownDisplay);
    }
    else if (dropdownType == "department") {
        departmentDropdownDisplay = toggleDropdown(departmentOptionsContainer, departmentDropdownDisplay);
    }
}
function toggleDropdown(optionsElement, display) {
    if (display == "block") {
        optionsElement.style.display = "none";
        display = "none";
    }
    else {
        optionsElement.style.display = "block";
        display = "block";
    }
    return display;
}
export let employeesFilteredByAlphabet = [];
function applyFilter() {
    const statusHeader = fetchDOMElementById("status");
    const statusOptionsContainer = fetchDOMElementByQuerySelector(".status-options");
    const locationHeader = fetchDOMElementById("location");
    const locationOptionsContainer = fetchDOMElementByQuerySelector(".location-options");
    const departmentHeader = fetchDOMElementById("department");
    const departmentOptionsContainer = fetchDOMElementByQuerySelector(".department-options");
    const statusSelectOptions = fetchDOMElementsByQuerySelectorAll(".status-option input");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll(".department-option input");
    let statusDropdownDisplay = statusOptionsContainer.style.display;
    let locationDropdownDisplay = locationOptionsContainer.style.display;
    let departmentDropdownDisplay = departmentOptionsContainer.style.display;
    let statusFilter = [];
    let locationFilter = [];
    let departmentFilter = [];
    employeesFilteredByAlphabet = [];
    let statusUncheckedCount = 0;
    let locationUncheckedCount = 0;
    let departmentUncheckedCount = 0;
    let employees = fetchEmployeesData();
    [statusFilter, statusUncheckedCount] = fetchFilteredData(statusSelectOptions, "status", employees, statusUncheckedCount, statusSelectOptions.length, "employees");
    [locationFilter, locationUncheckedCount] = fetchFilteredData(locationSelectOptions, "location", statusFilter, locationUncheckedCount, locationSelectOptions.length, "employees");
    [departmentFilter, departmentUncheckedCount] = fetchFilteredData(departmentSelectOptions, "department", locationFilter, departmentUncheckedCount, departmentSelectOptions.length, "employees");
    if (currentCharacter != "") {
        departmentFilter.forEach((emp) => {
            if (emp.firstName.charAt(0).toUpperCase() == currentCharacter) {
                employeesFilteredByAlphabet.push(emp);
            }
        });
    }
    else {
        departmentFilter.forEach((emp) => {
            employeesFilteredByAlphabet.push(emp);
        });
    }
    if (statusUncheckedCount != statusSelectOptions.length || locationUncheckedCount != locationSelectOptions.length || departmentUncheckedCount != departmentSelectOptions.length) {
        updateFilterDropdownUI(statusUncheckedCount, statusHeader, statusOptionsContainer, statusDropdownDisplay, statusSelectOptions, "Status");
        updateFilterDropdownUI(locationUncheckedCount, locationHeader, locationOptionsContainer, locationDropdownDisplay, locationSelectOptions, "Location");
        updateFilterDropdownUI(departmentUncheckedCount, departmentHeader, departmentOptionsContainer, departmentDropdownDisplay, departmentSelectOptions, "Department");
    }
    createTable(employeesFilteredByAlphabet);
}
export function isOptionSelected(checkBox) {
    if (checkBox.checked)
        return true;
    else
        return false;
}
function updateFilterDropdownUI(uncheckedCount, elementHeader, optionsContainer, dropdownDisplay, dropdownOptions, elementText) {
    elementHeader.innerHTML = elementText + " : " + (dropdownOptions.length - uncheckedCount) + " selected";
    elementHeader.innerHTML += `<img src="../../../assets/down-arrow.png" />`;
    elementHeader.style.color = "#F44848";
    optionsContainer.style.display = "none";
    if (dropdownDisplay == "block")
        dropdownDisplay = "none";
}
function resetFilter() {
    const statusHeader = fetchDOMElementById("status");
    const locationHeader = fetchDOMElementById("location");
    const departmentHeader = fetchDOMElementById("department");
    const statusSelectOptions = fetchDOMElementsByQuerySelectorAll(".status-option input");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll(".department-option input");
    resetFilterDropdownUI(statusSelectOptions, statusHeader, "Status");
    resetFilterDropdownUI(locationSelectOptions, locationHeader, "Location");
    resetFilterDropdownUI(departmentSelectOptions, departmentHeader, "Department");
    applyFilter();
}
function resetFilterDropdownUI(elementSelectOptions, elementHeader, elementText) {
    elementSelectOptions.forEach(checkBox => {
        checkBox.checked = false;
    });
    elementHeader.innerHTML = elementText;
    elementHeader.innerHTML += `<img src="../../../assets/down-arrow.png" />`;
    elementHeader.style.color = "#505F7C";
}
//Code for delete button functionality
let deleteButton = fetchDOMElementByQuerySelector(".delete-button button");
export let selectedEmployeesToDelete = [];
export function toggleEmployee(element, id) {
    if (element.checked) {
        deleteButton.style.display = "block";
        selectedEmployeesToDelete.push(id);
    }
    else if (!anyCheckboxChecked())
        deleteButton.style.display = "none";
    else if (!element.checked) {
        for (let i = 0; i < selectedEmployeesToDelete.length; i++) {
            if (selectedEmployeesToDelete[i] == id) {
                selectedEmployeesToDelete.splice(i, 1);
            }
        }
    }
    let headerCheckBox = fetchDOMElementByQuerySelector("thead .check-box input");
    if (allCheckboxesChecked()) {
        headerCheckBox.checked = true;
    }
    else {
        headerCheckBox.checked = false;
    }
}
function anyCheckboxChecked() {
    let checkBoxes = fetchDOMElementsByQuerySelectorAll(".check-box input");
    return Array.from(checkBoxes).some(checkbox => checkbox.checked);
}
function allCheckboxesChecked() {
    let checkBoxes = fetchDOMElementsByQuerySelectorAll("tbody .check-box input");
    return Array.from(checkBoxes).every(checkbox => checkbox.checked);
}
function toggleAllEmployees(element) {
    let checkBoxes = fetchDOMElementsByQuerySelectorAll(".check-box input");
    let employees = fetchEmployeesData();
    if (element.checked) {
        checkBoxes.forEach(check => {
            check.checked = true;
        });
        selectedEmployeesToDelete = [];
        employees.filter(emp => {
            selectedEmployeesToDelete.push(emp.empNo);
        });
        deleteButton.style.display = "block";
    }
    else {
        checkBoxes.forEach(check => {
            check.checked = false;
        });
        selectedEmployeesToDelete = [];
        deleteButton.style.display = "none";
    }
}
export function resetCheckboxAndHideDeleteButton() {
    let headerCheckBox = fetchDOMElementByQuerySelector("thead .check-box input");
    if (headerCheckBox.checked)
        headerCheckBox.checked = false;
    deleteButton.style.display = "none";
}
let ellipsisMenu = true;
function showOrHideMenu(index) {
    if (ellipsisMenu) {
        showMenu(index);
    }
    else {
        hideMenu(index);
    }
    ellipsisMenu = !ellipsisMenu;
}
function showMenu(index) {
    const menuarray = ["View Details", "Edit", "Delete"];
    const ellipsis = fetchDOMElementById(`cell-${index}`);
    const ellipsis_div = document.createElement("div");
    ellipsis_div.classList.add("ellipse-menu");
    ellipsis_div.setAttribute('id', `row-${index}`);
    const list = document.createElement("ul");
    list.style.margin = "0";
    list.style.padding = "0 0 0 20px";
    let employees = fetchEmployeesData();
    for (let i = 0; i < menuarray.length; i++) {
        const list_item = document.createElement("li");
        const link = document.createElement("a");
        if (i == 0)
            link.href = `../add-employee/add-employee.html?action=View-Details&id=${employees[index].empNo}`;
        else if (i == 1)
            link.href = `../add-employee/add-employee.html?action=Edit-Employee&id=${employees[index].empNo}`;
        else {
            link.addEventListener("click", function () {
                employees.splice(index, 1);
                StorageService.setItem("employees", employees);
                createTable(employees);
            });
        }
        link.style.cursor = "pointer";
        link.innerHTML = menuarray[i];
        list_item.append(link);
        list.appendChild(list_item);
    }
    ellipsis_div.append(list);
    ellipsis.append(ellipsis_div);
}
function hideMenu(index) {
    const ellipsis_div = fetchDOMElementById(`row-${index}`);
    ellipsis_div.remove();
}
