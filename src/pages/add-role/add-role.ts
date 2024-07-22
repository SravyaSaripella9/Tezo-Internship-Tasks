import { Employee } from '../../models/employee.js';
import { Role } from '../../models/role.js';
import { fetchEmployeesData } from '../../services/employee-service.js';
import { fetchDOMElementById, fetchDOMElementByQuerySelector, fetchDOMElementsByQuerySelectorAll } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { Option } from '../../models/constants.js';
import { locations } from '../../models/constants.js';
import { departments } from '../../models/constants.js';
import { addToSelectedEmployee } from "../../services/role-service.js";
import { removeFromSelectedEmployee } from '../../services/role-service.js';
import { saveRole } from "../../services/role-service.js";

window.onload=()=>{
    createDropdowns();
    createAssignEmployeesDropdown();
    (window as any).displaySideNav=displaySideNav;
    (window as any).toggleAssignEmployeesDropdown=toggleAssignEmployeesDropdown;
    (window as any).searchEmployee=searchEmployee;
    (window as any).isEmployeeSelected=isEmployeeSelected;
    (window as any).addRole=addRole;
    (window as any).navigateToRolesPage=navigateToRolesPage;
}

function createDropdowns():void{
    let locationOptions=fetchDOMElementById<HTMLElement>("location");
    let departmentOptions=fetchDOMElementById<HTMLElement>("department");
    createDropdownOptions(locations, locationOptions);
    createDropdownOptions(departments, departmentOptions);
}

function createDropdownOptions(data:Option[], dropdownOptions:HTMLElement):void{
    for(let i:number=0;i<data.length;i++){
        dropdownOptions.innerHTML+=`<option value="${data[i].value}">${data[i].value}</option>`;
    }
}

function createAssignEmployeesDropdown():void{
    const assignEmployeesOptions=fetchDOMElementByQuerySelector<HTMLElement>(".assign-employees");
    let employees:Employee[]=fetchEmployeesData();
    for(let i:number=0;i<employees.length;i++){
        assignEmployeesOptions.innerHTML+=`<div class="assign-employees-option">
        <div>
            <img src="${employees[i].empImage}" alt="Employee-Image">
            ${employees[i].firstName+" "+employees[i].lastName}
        </div>
        <div><input type="checkbox" onclick="isEmployeeSelected(this,'${employees[i].empNo}')"/></div>
    </div>`
    }
}

let clickCount:number=0;
function toggleAssignEmployeesDropdown():void{
    const assignEmployeesOptions=fetchDOMElementByQuerySelector<HTMLElement>(".assign-employees");
    if(clickCount==0){
        assignEmployeesOptions.style.display="block";
        clickCount++;
    }
    else{
        assignEmployeesOptions.style.display="none";
        clickCount--;
    }
}

function searchEmployee():void{
    let searchInput:string=(fetchDOMElementByQuerySelector<HTMLInputElement>("input[type='search']")).value;
    const assignEmployeesOptions=fetchDOMElementsByQuerySelectorAll<HTMLElement>(".assign-employees-option");
    let employees:Employee[]=fetchEmployeesData();
    for(let i:number=0;i<employees.length;i++){
        let empName:string=((employees[i].firstName+" "+employees[i].lastName).toLowerCase());
        searchInput=searchInput.toLowerCase();
        if(empName.indexOf(searchInput)>-1)
            assignEmployeesOptions[i].style.display="flex";
        else
            assignEmployeesOptions[i].style.display="none";
    }
}

function isEmployeeSelected(element:HTMLInputElement,id:string):void{
    if(element.checked)
        addToSelectedEmployee(id);
    else    
        removeFromSelectedEmployee(id);
}

function addRole():void{
    let newRole:Role={
        id: performance.now(),
        name: (fetchDOMElementById<HTMLInputElement>("roleName")).value,
        department: (fetchDOMElementById<HTMLInputElement>("department")).value,
        roleDescription: (fetchDOMElementById<HTMLInputElement>("roleDescription")).value,
        location: (fetchDOMElementById<HTMLInputElement>("location")).value,
    }
    saveRole(newRole);
    window.location.reload();
    window.location.href = "../roles/roles.html";
}

function navigateToRolesPage():void{
    window.location.href="../roles/roles.html";
}