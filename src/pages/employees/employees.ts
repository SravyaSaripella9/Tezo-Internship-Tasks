import { Employee } from '../../models/employee.js';
import { Role } from '../../models/role.js';
import { StorageService } from '../../services/storage-service.js';
import { fetchEmployeesData } from '../../services/employee-service.js';
import { fetchRolesData } from '../../services/role-service.js';
import { fetchDOMElementById, fetchDOMElementByQuerySelector, fetchDOMElementsByQuerySelectorAll } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { Option } from '../../models/constants.js';
import { locations } from '../../models/constants.js';
import { departments } from '../../models/constants.js';
import { fetchFilteredData } from '../../services/filter-service.js';
import { deleteEmployee } from '../../services/employee-service.js';
import { fetchDataToExport } from '../../services/export-service.js';
import { applySort } from '../../services/filter-service.js';

window.onload = () => {
    let employees:Employee[]=fetchEmployeesData();
    createTable(employees);
    createAlphabetButtons();
    createFilterDropdowns();
    (window as any).displaySideNav = displaySideNav;
    (window as any).filterEmployeesByName = filterEmployeesByName;
    (window as any).exportData = exportData;
    (window as any).toggleEmployee = toggleEmployee;
    (window as any).toggleAllEmployees = toggleAllEmployees;
    (window as any).deleteEmployee = deleteEmployee;
    (window as any).showOrHideMenu = showOrHideMenu;
    (window as any).sortColumn = sortColumn;
    (window as any).applyAlphabetFilter = applyAlphabetFilter;
    (window as any).changeFilterIconColor = changeFilterIconColor;
    (window as any).sortColumn = sortColumn;
    (window as any).displayDropdown = displayDropdown;
    (window as any).applyFilter = applyFilter;
    (window as any).resetFilter = resetFilter;
    (window as any).employeesFilteredByAlphabet = employeesFilteredByAlphabet;
}

export function createTable(employees: Employee[]): void {
    const tableBody = fetchDOMElementByQuerySelector<HTMLElement>(".employees-table-body");
    tableBody.innerHTML = "";
    let roles:Role[]=fetchRolesData();
    for (let i: number = 0; i < employees.length; i++) {
        let employeeRole = roles.find((role: Role) => role.id == employees[i].roleId);
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
            <td class="table-data">${employeeRole?.location || ""}</td>
            <td class="table-data">${employeeRole?.department || ""}</td>
            <td class="table-data">${employeeRole?.name || ""}</td>
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

function filterEmployeesByName(): void {
    let searchInput: string = (fetchDOMElementByQuerySelector<HTMLInputElement>("input[type='search']")).value;
    const tableRow = fetchDOMElementsByQuerySelectorAll<HTMLTableRowElement>("tr");
    let employees:Employee[]=fetchEmployeesData();
    for (let i: number = 0; i < employees.length; i++) {
        let empName: string = ((employees[i].firstName + " " + employees[i].lastName).toLowerCase());
        searchInput = searchInput.toLowerCase();
        if (empName.indexOf(searchInput) > -1) {
            tableRow[i + 1].style.display = "flex";
            tableRow[i + 1].style.alignItems = "center";
        }
        else
            tableRow[i + 1].style.display = "none";
    }
}

function exportData():void{
    const blob=fetchDataToExport();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employees-table.csv';
    link.click();
}

function sortColumn(col:number):void{
    const table = fetchDOMElementByQuerySelector<HTMLTableElement>(".employees-table table");
    let row:HTMLTableRowElement[] = Array.from(table.rows).slice(1);
    let currentHeader = fetchDOMElementsByQuerySelectorAll(".sorted-table-header");
    if (currentHeader.length > 0) {
        currentHeader[0].className = currentHeader[0].className.replace("sorted-table-header", "");
    }
    const tableRowHeader=fetchDOMElementsByQuerySelectorAll("thead th div")[col-1];
    tableRowHeader.classList.add("sorted-table-header");
    row=applySort(table,row,col);
    table.tBodies[0].innerHTML = "";
    table.tBodies[0].append(...row);
}

let alphabeticalButtons = fetchDOMElementByQuerySelector<HTMLElement>(".alphabetical-buttons-container");
let filterImageRed = fetchDOMElementByQuerySelector<HTMLElement>(".filter-red-image");
let filterImageBlack = fetchDOMElementByQuerySelector<HTMLElement>(".filter-black-image");
let current;

//Code for alphabetical buttons creation.
function createAlphabetButtons(): void {
    for (let i: number = 65; i <= 90; i++) {
        alphabeticalButtons.innerHTML += `<button onclick="applyAlphabetFilter(this,'${String.fromCharCode(i)}')" class="alphabet-button" value=${String.fromCharCode(i)}>${String.fromCharCode(i)}</button>`
    }
}

//Code for click function of alphabetical buttons.
let currentCharacter: string = "";
function applyAlphabetFilter(element: HTMLButtonElement, character: string): void {
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

function changeFilterIconColor(): void {
    filterImageRed.style.display = "none";
    filterImageBlack.style.display = "block";
    current = fetchDOMElementsByQuerySelectorAll(".active-alphabet");
    if (current.length > 0) {
        current[0].className = current[0].className.replace("active-alphabet", "");
    }
    currentCharacter = "";
    applyFilter();
}

function createFilterDropdowns():void{
    let locationOptions = fetchDOMElementByQuerySelector<HTMLElement>(".location-options");
    let departmentOptions = fetchDOMElementByQuerySelector<HTMLElement>(".department-options");
    createFilterDropdownOptions(locations, locationOptions, "location-option");
    createFilterDropdownOptions(departments, departmentOptions, "department-option");
}

function createFilterDropdownOptions(data:Option[], dropdownOptions:HTMLElement, className:string):void{
    for (let i: number = 0; i < data.length; i++) {
        dropdownOptions.innerHTML += `<div class=${className}>${data[i].value}<input type="checkbox" value="${data[i].value}"/></div>`;
    }
}

function displayDropdown(dropdownType:string):void {
    const statusOptionsContainer=fetchDOMElementByQuerySelector<HTMLElement>(".status-options"); 
    const locationOptionsContainer=fetchDOMElementByQuerySelector<HTMLElement>(".location-options");
    const departmentOptionsContainer=fetchDOMElementByQuerySelector<HTMLElement>(".department-options");
    let statusDropdownDisplay:string=statusOptionsContainer.style.display;
    let locationDropdownDisplay: string = locationOptionsContainer.style.display;
    let departmentDropdownDisplay: string = departmentOptionsContainer.style.display;
    if (dropdownType == "status") {
        statusDropdownDisplay=toggleDropdown(statusOptionsContainer, statusDropdownDisplay);
    }
    else if (dropdownType == "location") {
        locationDropdownDisplay=toggleDropdown(locationOptionsContainer, locationDropdownDisplay);
    }
    else if (dropdownType == "department") {
        departmentDropdownDisplay=toggleDropdown(departmentOptionsContainer, departmentDropdownDisplay);
    }
}

function toggleDropdown(optionsElement: HTMLElement, display: string): string {
    if (display=="block") {
        optionsElement.style.display = "none";
        display="none";
    }
    else {
        optionsElement.style.display = "block";
        display="block";
    }
    return display;
}

export let employeesFilteredByAlphabet: Employee[] = [];
function applyFilter(): void {
    const statusHeader = fetchDOMElementById<HTMLElement>("status");
    const statusOptionsContainer = fetchDOMElementByQuerySelector<HTMLElement>(".status-options");
    const locationHeader = fetchDOMElementById<HTMLElement>("location");
    const locationOptionsContainer = fetchDOMElementByQuerySelector<HTMLElement>(".location-options");
    const departmentHeader = fetchDOMElementById<HTMLElement>("department");
    const departmentOptionsContainer = fetchDOMElementByQuerySelector<HTMLElement>(".department-options");
    const statusSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".status-option input");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".department-option input");
    let statusDropdownDisplay:string=statusOptionsContainer.style.display;
    let locationDropdownDisplay: string = locationOptionsContainer.style.display;
    let departmentDropdownDisplay: string = departmentOptionsContainer.style.display;
    let statusFilter: Employee[] = [];
    let locationFilter: Employee[] = [];
    let departmentFilter: Employee[] = [];
    employeesFilteredByAlphabet = [];
    let statusUncheckedCount: number = 0;
    let locationUncheckedCount: number = 0;
    let departmentUncheckedCount: number = 0;
    let employees:Employee[]=fetchEmployeesData();
    [statusFilter, statusUncheckedCount] = fetchFilteredData(statusSelectOptions, "status", employees, statusUncheckedCount, statusSelectOptions.length,"employees");
    [locationFilter, locationUncheckedCount] = fetchFilteredData(locationSelectOptions, "location", statusFilter, locationUncheckedCount, locationSelectOptions.length,"employees");
    [departmentFilter, departmentUncheckedCount] = fetchFilteredData(departmentSelectOptions, "department", locationFilter, departmentUncheckedCount, departmentSelectOptions.length,"employees");
    if (currentCharacter != "") {
        departmentFilter.forEach((emp: Employee) => {
            if (emp.firstName.charAt(0).toUpperCase() == currentCharacter) {
                employeesFilteredByAlphabet.push(emp);
            }
        })
    }
    else {
        departmentFilter.forEach((emp: Employee) => {
            employeesFilteredByAlphabet.push(emp);
        })
    }
    if (statusUncheckedCount != statusSelectOptions.length || locationUncheckedCount != locationSelectOptions.length || departmentUncheckedCount != departmentSelectOptions.length) {
        updateFilterDropdownUI(statusUncheckedCount, statusHeader, statusOptionsContainer, statusDropdownDisplay, statusSelectOptions, "Status");
        updateFilterDropdownUI(locationUncheckedCount, locationHeader, locationOptionsContainer, locationDropdownDisplay, locationSelectOptions, "Location");
        updateFilterDropdownUI(departmentUncheckedCount, departmentHeader, departmentOptionsContainer, departmentDropdownDisplay, departmentSelectOptions, "Department");
    }
    createTable(employeesFilteredByAlphabet);
}

export function isOptionSelected(checkBox:HTMLInputElement):boolean{
    if(checkBox.checked)
        return true;
    else    
        return false;
}

function updateFilterDropdownUI(uncheckedCount: number, elementHeader: HTMLElement, optionsContainer: HTMLElement, dropdownDisplay: string, dropdownOptions: NodeListOf<HTMLInputElement>, elementText: string): void {
    elementHeader.innerHTML = elementText + " : " + (dropdownOptions.length - uncheckedCount) + " selected";
    elementHeader.innerHTML += `<img src="../../../assets/down-arrow.png" />`;
    elementHeader.style.color = "#F44848";
    optionsContainer.style.display = "none";
    if(dropdownDisplay=="block")
        dropdownDisplay="none";
}

function resetFilter(): void {
    const statusHeader = fetchDOMElementById<HTMLElement>("status");
    const locationHeader = fetchDOMElementById<HTMLElement>("location");
    const departmentHeader = fetchDOMElementById<HTMLElement>("department");
    const statusSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".status-option input");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".department-option input");
    resetFilterDropdownUI(statusSelectOptions, statusHeader, "Status");
    resetFilterDropdownUI(locationSelectOptions, locationHeader, "Location");
    resetFilterDropdownUI(departmentSelectOptions, departmentHeader, "Department");
    applyFilter();
}

function resetFilterDropdownUI(elementSelectOptions: NodeListOf<HTMLInputElement>, elementHeader: HTMLElement, elementText: string): void {
    elementSelectOptions.forEach(checkBox => {
        checkBox.checked = false;
    })
    elementHeader.innerHTML = elementText;
    elementHeader.innerHTML += `<img src="../../../assets/down-arrow.png" />`;
    elementHeader.style.color = "#505F7C";
}

//Code for delete button functionality
let deleteButton = fetchDOMElementByQuerySelector<HTMLElement>(".delete-button button");
export let selectedEmployeesToDelete: string[] = [];

export function toggleEmployee(element: HTMLInputElement, id: string): void {
    if (element.checked) {
        deleteButton.style.display = "block";
        selectedEmployeesToDelete.push(id);
    }
    else if (!anyCheckboxChecked())
        deleteButton.style.display = "none";
    else if (!element.checked) {
        for (let i: number = 0; i < selectedEmployeesToDelete.length; i++) {
            if (selectedEmployeesToDelete[i] == id) {
                selectedEmployeesToDelete.splice(i, 1);
            }
        }
    }
    let headerCheckBox = fetchDOMElementByQuerySelector<HTMLInputElement>("thead .check-box input");
    if (allCheckboxesChecked()) {
        headerCheckBox.checked = true;
    }
    else {
        headerCheckBox.checked = false;
    }
}

function anyCheckboxChecked(): boolean {
    let checkBoxes = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".check-box input");
    return Array.from(checkBoxes).some(checkbox => checkbox.checked);
}

function allCheckboxesChecked(): boolean {
    let checkBoxes = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>("tbody .check-box input");
    return Array.from(checkBoxes).every(checkbox => checkbox.checked);
}

function toggleAllEmployees(element: HTMLInputElement): void {
    let checkBoxes = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".check-box input");
    let employees:Employee[]=fetchEmployeesData();
    if (element.checked) {
        checkBoxes.forEach(check => {
            check.checked = true;
        })
        selectedEmployeesToDelete = [];
        employees.filter(emp => {
            selectedEmployeesToDelete.push(emp.empNo);
        })
        deleteButton.style.display = "block";
    }
    else {
        checkBoxes.forEach(check => {
            check.checked = false;
        })
        selectedEmployeesToDelete = [];
        deleteButton.style.display = "none";
    }
}

export function resetCheckboxAndHideDeleteButton():void{
    let headerCheckBox = fetchDOMElementByQuerySelector<HTMLInputElement>("thead .check-box input");
    if(headerCheckBox.checked)
        headerCheckBox.checked=false;
    deleteButton.style.display="none";
}

let ellipsisMenu: boolean = true;
function showOrHideMenu(index: number): void {
    if (ellipsisMenu) {
        showMenu(index);
    }
    else {
        hideMenu(index);
    }
    ellipsisMenu = !ellipsisMenu;
}

function showMenu(index: number): void {
    const menuarray: string[] = ["View Details", "Edit", "Delete"];
    const ellipsis = fetchDOMElementById<HTMLElement>(`cell-${index}`);
    const ellipsis_div = document.createElement("div");
    ellipsis_div.classList.add("ellipse-menu");
    ellipsis_div.setAttribute('id', `row-${index}`);
    const list = document.createElement("ul");
    list.style.margin = "0";
    list.style.padding = "0 0 0 20px";
    let employees:Employee[]=fetchEmployeesData();
    for (let i: number = 0; i < menuarray.length; i++) {
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
            })
        }
        link.style.cursor = "pointer";
        link.innerHTML = menuarray[i];
        list_item.append(link);
        list.appendChild(list_item);
    }
    ellipsis_div.append(list);
    ellipsis.append(ellipsis_div);
}

function hideMenu(index: number): void {
    const ellipsis_div = fetchDOMElementById<HTMLElement>(`row-${index}`);
    ellipsis_div.remove();
}