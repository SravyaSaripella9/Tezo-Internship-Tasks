import { fetchEmployeesData } from '../../services/employee-service.js';
import { fetchRolesData } from '../../services/role-service.js';
import { fetchDOMElementById, fetchDOMElementByQuerySelector, fetchDOMElementsByQuerySelectorAll } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { locations } from '../../models/constants.js';
import { departments } from '../../models/constants.js';
import { fetchFilteredData } from '../../services/filter-service.js';
window.onload = () => {
    let roles = fetchRolesData();
    createRoleCard(roles);
    createFilterDropdowns();
    window.displaySideNav = displaySideNav;
    window.displayDropdown = displayDropdown;
    window.applyFilter = applyFilter;
    window.resetFilter = resetFilter;
};
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
function createRoleCard(roles) {
    const cardContainer = fetchDOMElementByQuerySelector(".cards");
    cardContainer.innerHTML = "";
    for (let i = 0; i < roles.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML += `<div class="card-header">
                <div>${roles[i].name}</div>
                <img src="../../../assets/edit.svg" />
            </div>
            <div class="card-content">
                <div class="category">
                    <img src="../../../assets/department.svg" />
                    <div>Department</div>
                </div>
                <div class="value">${roles[i].department}</div>
            </div>
            <div class="card-content">
                <div class="category">
                    <img src="../../../assets/location.svg" />
                    <div>Location</div>
                </div>
                <div class="value">${roles[i].location}</div>
            </div>
            <div class="card-content">
                <div>Total Employees</div>
                <div class="profiles" id='profiles-${roles[i].id}'>

                </div>
            </div>
            <div class="card-footer">
                <a href="../role-details/role-details.html?id=${roles[i].id}">
                    View all Employees
                    <img src="../../../assets/vector.svg"/>
                </a>
            </div>
        </div>`;
        cardContainer.append(card);
    }
    addProfiles();
}
function addProfiles() {
    let employees = fetchEmployeesData();
    let roles = fetchRolesData();
    for (let i = 0; i < roles.length; i++) {
        const profiles = fetchDOMElementById(`profiles-${roles[i].id}`);
        let emp_details = employees.filter((emp) => emp.roleId == roles[i].id);
        for (let j = 0; j < emp_details.length; j++) {
            //if number of employees are greater than 4
            if (j == 4) {
                profiles.innerHTML += `<div class="profile">+${emp_details.length - j}</div>`;
                break;
            }
            else {
                profiles.innerHTML += `<div class="profile"><img src="${emp_details[j].empImage}" /></div>`;
            }
        }
    }
}
function displayDropdown(dropdownType) {
    const locationOptionsContainer = fetchDOMElementByQuerySelector(".location-options");
    const departmentOptionsContainer = fetchDOMElementByQuerySelector(".department-options");
    let locationDropdownDisplay = locationOptionsContainer.style.display;
    let departmentDropdownDisplay = departmentOptionsContainer.style.display;
    if (dropdownType == "location") {
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
function applyFilter() {
    const locationHeader = fetchDOMElementById("location");
    const locationOptionsContainer = fetchDOMElementByQuerySelector(".location-options");
    const departmentHeader = fetchDOMElementById("department");
    const departmentOptionsContainer = fetchDOMElementByQuerySelector(".department-options");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll(".department-option input");
    let locationDropdownDisplay = locationOptionsContainer.style.display;
    let departmentDropdownDisplay = departmentOptionsContainer.style.display;
    let locationFilter = [];
    let departmentFilter = [];
    let locationUncheckedCount = 0;
    let departmentUncheckedCount = 0;
    let roles = fetchRolesData();
    [locationFilter, locationUncheckedCount] = fetchFilteredData(locationSelectOptions, "location", roles, locationUncheckedCount, locationSelectOptions.length, "roles");
    [departmentFilter, departmentUncheckedCount] = fetchFilteredData(departmentSelectOptions, "department", locationFilter, departmentUncheckedCount, departmentSelectOptions.length, "roles");
    if (locationUncheckedCount != locationSelectOptions.length || departmentUncheckedCount != departmentSelectOptions.length) {
        updateFilterDropdownUI(locationUncheckedCount, locationHeader, locationOptionsContainer, locationDropdownDisplay, locationSelectOptions, "Location");
        updateFilterDropdownUI(departmentUncheckedCount, departmentHeader, departmentOptionsContainer, departmentDropdownDisplay, departmentSelectOptions, "Department");
    }
    createRoleCard(departmentFilter);
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
    const locationHeader = fetchDOMElementById("location");
    const departmentHeader = fetchDOMElementById("department");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll(".department-option input");
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
