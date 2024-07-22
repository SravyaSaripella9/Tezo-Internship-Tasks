import { Employee } from '../../models/employee.js';
import { Role } from '../../models/role.js';
import { fetchEmployeesData } from '../../services/employee-service.js';
import { fetchRolesData } from '../../services/role-service.js';
import { fetchDOMElementById, fetchDOMElementByQuerySelector, fetchDOMElementsByQuerySelectorAll } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { Option } from '../../models/constants.js';
import { locations } from '../../models/constants.js';
import { departments } from '../../models/constants.js';
import { fetchFilteredData } from '../../services/filter-service.js';

window.onload = () => {
    let roles:Role[]=fetchRolesData();
    createRoleCard(roles);
    createFilterDropdowns();
    (window as any).displaySideNav=displaySideNav;
    (window as any).displayDropdown=displayDropdown;
    (window as any).applyFilter=applyFilter;
    (window as any).resetFilter=resetFilter;
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

function createRoleCard(roles:Role[]):void{
    const cardContainer=fetchDOMElementByQuerySelector<HTMLElement>(".cards");
    cardContainer.innerHTML="";
    for(let i:number=0;i<roles.length;i++){
        const card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML+=`<div class="card-header">
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

function addProfiles():void{
    let employees:Employee[]=fetchEmployeesData();
    let roles:Role[]=fetchRolesData();
    for(let i:number=0;i<roles.length;i++){
        const profiles=fetchDOMElementById<HTMLElement>(`profiles-${roles[i].id}`)
        let emp_details:Employee[]=employees.filter((emp:Employee)=>emp.roleId==roles[i].id);
        for(let j:number=0;j<emp_details.length;j++){
            //if number of employees are greater than 4
            if(j==4){
                profiles.innerHTML+=`<div class="profile">+${emp_details.length-j}</div>`;
                break;
            }
            else{
                profiles.innerHTML+=`<div class="profile"><img src="${emp_details[j].empImage}" /></div>`
            }
        }
    }
}

function displayDropdown(dropdownType:string):void {
    const locationOptionsContainer=fetchDOMElementByQuerySelector<HTMLElement>(".location-options");
    const departmentOptionsContainer=fetchDOMElementByQuerySelector<HTMLElement>(".department-options");
    let locationDropdownDisplay: string = locationOptionsContainer.style.display;
    let departmentDropdownDisplay: string = departmentOptionsContainer.style.display;
    if (dropdownType == "location") {
        locationDropdownDisplay=toggleDropdown(locationOptionsContainer, locationDropdownDisplay);
    }
    else if (dropdownType == "department") {
        departmentDropdownDisplay=toggleDropdown(departmentOptionsContainer, departmentDropdownDisplay);
    }
}

function toggleDropdown(optionsElement:HTMLElement, display:string):string{
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

function applyFilter():void{
    const locationHeader = fetchDOMElementById<HTMLElement>("location");
    const locationOptionsContainer = fetchDOMElementByQuerySelector<HTMLElement>(".location-options");
    const departmentHeader = fetchDOMElementById<HTMLElement>("department");
    const departmentOptionsContainer = fetchDOMElementByQuerySelector<HTMLElement>(".department-options");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".department-option input");
    let locationDropdownDisplay: string = locationOptionsContainer.style.display;
    let departmentDropdownDisplay: string = departmentOptionsContainer.style.display;
    let locationFilter:Role[]=[];
    let departmentFilter:Role[]=[];
    let locationUncheckedCount:number=0;
    let departmentUncheckedCount:number=0;
    let roles:Role[]=fetchRolesData();
    [locationFilter,locationUncheckedCount]=fetchFilteredData(locationSelectOptions,"location",roles,locationUncheckedCount,locationSelectOptions.length,"roles");
    [departmentFilter,departmentUncheckedCount]=fetchFilteredData(departmentSelectOptions,"department",locationFilter,departmentUncheckedCount,departmentSelectOptions.length,"roles");
    if(locationUncheckedCount!=locationSelectOptions.length || departmentUncheckedCount!=departmentSelectOptions.length){
        updateFilterDropdownUI(locationUncheckedCount, locationHeader, locationOptionsContainer, locationDropdownDisplay, locationSelectOptions, "Location");
        updateFilterDropdownUI(departmentUncheckedCount, departmentHeader, departmentOptionsContainer, departmentDropdownDisplay, departmentSelectOptions, "Department");
    }
    createRoleCard(departmentFilter);
}

function updateFilterDropdownUI(uncheckedCount: number, elementHeader: HTMLElement, optionsContainer: HTMLElement, dropdownDisplay: string, dropdownOptions: NodeListOf<HTMLInputElement>, elementText: string): void {
    elementHeader.innerHTML = elementText + " : " + (dropdownOptions.length - uncheckedCount) + " selected";
    elementHeader.innerHTML += `<img src="../../../assets/down-arrow.png" />`;
    elementHeader.style.color = "#F44848";
    optionsContainer.style.display = "none";
    if(dropdownDisplay=="block")
        dropdownDisplay="none";
}

function resetFilter():void {
    const locationHeader = fetchDOMElementById<HTMLElement>("location");
    const departmentHeader = fetchDOMElementById<HTMLElement>("department");
    const locationSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".location-option input");
    const departmentSelectOptions = fetchDOMElementsByQuerySelectorAll<HTMLInputElement>(".department-option input");
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