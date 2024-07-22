import { Employee } from '../../models/employee.js';
import { Role } from '../../models/role.js';
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

window.onload=()=>{
    let employees:Employee[]=fetchEmployeesData();
    let roles:Role[]=fetchRolesData();
    createDropdowns(roles);
    createAssignManagerDropdown(employees);
    (window as any).displaySideNav=displaySideNav;
    (window as any).uploadImage=uploadImage;
    (window as any).changeDropdownOptions=changeDropdownOptions;
    (window as any).addEmployee=addEmployee;
    (window as any).viewDetails=viewDetails(window.location.search);
    (window as any).updateEmployee=updateEmployee(window.location.search);
    (window as any).updateAddEmployeeInRoleDetailsPage=handleAddEmployeeInRoleDetailsPage(window.location.search);
    (window as any).navigateToEmployeesPage=navigateToEmployeesPage;
}

export function createDropdowns(roles: Role[]):void {
    let loc:string[]=[];
    for(let i:number=0;i<locations.length;i++){
        loc[i]=locations[i].value;
    }
    let jobTitles: string[] = [];
    for (let i: number = 0; i < roles.length; i++) {
        jobTitles[i] = roles[i].name;
    }
    jobTitles = Array.from(new Set(jobTitles));
    let dept:string[]=[];
    for(let i:number=0;i<departments.length;i++){
        dept[i]=departments[i].value;
    }
    let locationOptions = fetchDOMElementById<HTMLElement>("location");
    locationOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    let jobTitleOptions = fetchDOMElementById<HTMLElement>("jobTitle");
    jobTitleOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    let departmentOptions = fetchDOMElementById<HTMLElement>("department");
    departmentOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    createDropdownOptions(loc,locationOptions);
    createDropdownOptions(jobTitles,jobTitleOptions);
    createDropdownOptions(dept,departmentOptions);
}

function createDropdownOptions(data:string[], elementOptions:HTMLElement):void{
    for (let i: number = 0; i < data.length; i++) {
        elementOptions.innerHTML += `<option value="${data[i]}" id="${data[i]}">${data[i]}</option>`;
    }
}

export let assignManager = fetchDOMElementById<HTMLElement>("manager");
function createAssignManagerDropdown(employees: Employee[]):void {
    assignManager.innerHTML = `<option value="Search" selected disabled hidden>Search</option>`;
    for (let i: number = 0; i < employees.length; i++) {
        assignManager.innerHTML += `<option value="${employees[i].firstName + " " + employees[i].lastName}">${employees[i].firstName + " " + employees[i].lastName}</option>`
    }
}

function changeDropdownOptions(elementType:string):void{
    let employees:Employee[]=fetchEmployeesData();
    const value:string=(fetchDOMElementById<HTMLInputElement>(elementType)).value;
    let filteredRoles:Role[]=[];
    let managers:string[]=[];
    filteredRoles=handleChange(elementType,filteredRoles,value);
    const locationDropdown=fetchDOMElementById<HTMLElement>("location");
    locationDropdown.innerHTML = "";
    let uniqueLocations:string[]=fetchDropdownOptions(filteredRoles, "location");
    createDropdownOptions(uniqueLocations,locationDropdown);
    locationDropdown.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    const jobTitleDropdown=fetchDOMElementById<HTMLElement>("jobTitle");
    jobTitleDropdown.innerHTML = "";
    let uniqueJobTitles:string[]=fetchDropdownOptions(filteredRoles, "name");
    createDropdownOptions(uniqueJobTitles,jobTitleDropdown);
    jobTitleDropdown.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    const departmentDropdown=fetchDOMElementById<HTMLElement>("department");
    departmentDropdown.innerHTML = "";
    let uniqueDepartments:string[]=fetchDropdownOptions(filteredRoles, "department");
    createDropdownOptions(uniqueDepartments,departmentDropdown);
    departmentDropdown.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    for(let i:number=0;i<employees.length;i++){
        for(let j:number=0;j<filteredRoles.length;j++){
            if(employees[i].roleId==filteredRoles[j].id){
                managers.push(employees[i].firstName+" "+employees[i].lastName);
            }
        }
    }
    assignManager.innerHTML="";
    for(let i:number=0;i<managers.length;i++){
        assignManager.innerHTML+=`<option value="${managers[i]}">${managers[i]}</option>`;
    }
}

function fetchDropdownOptions(filteredRoles:Role[], dropdownType:string):string[]{
    let uniqueDropdownOptions:string[]=Array.from(new Set(filteredRoles.map((role:any)=>role[dropdownType])));
    return uniqueDropdownOptions;
}

function addEmployee():void{
    let newEmployee:Employee={
        empImage : (fetchDOMElementById<HTMLInputElement>("employeeImage")).src,
        empNo:  (fetchDOMElementById<HTMLInputElement>("empNo")).value,
        firstName:  (fetchDOMElementById<HTMLInputElement>("firstName")).value,
        lastName:  (fetchDOMElementById<HTMLInputElement>("lastName")).value,
        dob:  new Date((fetchDOMElementById<HTMLInputElement>("dob")).value),
        mail:  (fetchDOMElementById<HTMLInputElement>("mail")).value,
        contactNo:  Number((fetchDOMElementById<HTMLInputElement>("contactNo")).value),
        joinDate:  new Date((fetchDOMElementById<HTMLInputElement>("joinDate")).value),
        manager:  (fetchDOMElementById<HTMLInputElement>("manager")).value,
        projectName:  (fetchDOMElementById<HTMLInputElement>("projectName")).value,
        roleId: 0,
        status: Status.Active,
    }
    let location: string = (fetchDOMElementById<HTMLInputElement>("location")).value;
    let jobTitle: string = (fetchDOMElementById<HTMLInputElement>("jobTitle")).value;
    let department: string = (fetchDOMElementById<HTMLInputElement>("department")).value;
    let queryString:string = window.location.search;
    let urlParams:URLSearchParams = new URLSearchParams(queryString);
    if(urlParams!=null){
        let action=urlParams.get('action');
        if(action==null){
            let employees:Employee[]=fetchEmployeesData();
            if(isEmpNoUnique(newEmployee.empNo,employees))
                saveEmployee(newEmployee, location, jobTitle, department);
            else{
                alert("The Emp No that is entered already exists");
            }
        }
        else{
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

function navigateToEmployeesPage(): void {
    window.location.href = "../employees/employees.html";
}

export function displayDefaultData(employee:Employee):void{
    let roles:Role[]=fetchRolesData();
    let employeeRole=roles.find((role:Role) => role.id==employee.roleId);
    (fetchDOMElementById<HTMLImageElement>("employeeImage")).src=employee.empImage;
    (fetchDOMElementById<HTMLInputElement>("empNo")).value=employee.empNo;
    (fetchDOMElementById<HTMLInputElement>("firstName")).value=employee.firstName;
    (fetchDOMElementById<HTMLInputElement>("lastName")).value=employee.lastName;
    (fetchDOMElementById<HTMLInputElement>("dob")).value=String(employee.dob);
    (fetchDOMElementById<HTMLInputElement>("mail")).value=employee.mail;
    (fetchDOMElementById<HTMLInputElement>("contactNo")).value=String(employee.contactNo);
    (fetchDOMElementById<HTMLInputElement>("joinDate")).value=String(employee.joinDate);
    if(employeeRole!=undefined){
        (fetchDOMElementById<HTMLOptionElement>(`${employeeRole.location}`)).selected=true;
        (fetchDOMElementById<HTMLOptionElement>(`${employeeRole.name}`)).selected=true;
        (fetchDOMElementById<HTMLOptionElement>(`${employeeRole.department}`)).selected=true;
    }
    (fetchDOMElementById<HTMLInputElement>("manager")).value=employee.manager;
    (fetchDOMElementById<HTMLInputElement>("projectName")).value=employee.projectName;
}

export function disableEditableViewDetails():void{
    (fetchDOMElementByQuerySelector<HTMLElement>(".add-employee-heading")).innerHTML = "Employee Details";
    (fetchDOMElementByQuerySelector<HTMLInputElement>(".add-employee-profile input")).disabled = true;
    (fetchDOMElementByQuerySelector<HTMLButtonElement>(".add-employee-profile button")).disabled = true;
    (fetchDOMElementById<HTMLInputElement>("empNo")).readOnly = true;
    (fetchDOMElementById<HTMLInputElement>("empNo")).readOnly = true;
    (fetchDOMElementById<HTMLInputElement>("firstName")).readOnly = true;
    (fetchDOMElementById<HTMLInputElement>("lastName")).readOnly = true;
    (fetchDOMElementById<HTMLInputElement>("dob")).readOnly = true;
    (fetchDOMElementById<HTMLInputElement>("mail")).readOnly = true;
    (fetchDOMElementById<HTMLInputElement>("contactNo")).readOnly = true;
    (fetchDOMElementById<HTMLInputElement>("joinDate")).readOnly = true;
    (fetchDOMElementById<HTMLSelectElement>("location")).disabled = true;
    (fetchDOMElementById<HTMLSelectElement>("jobTitle")).disabled = true;
    (fetchDOMElementById<HTMLSelectElement>("department")).disabled = true;
    (fetchDOMElementById<HTMLSelectElement>("manager")).disabled = true;
    (fetchDOMElementById<HTMLSelectElement>("projectName")).disabled = true;
    (fetchDOMElementById<HTMLButtonElement>("submitButton")).style.display = "none";
}

export function configureUpdateEmployeeForm():void{
    (fetchDOMElementByQuerySelector<HTMLElement>(".add-employee-heading")).innerHTML = "Edit Employee";
    (fetchDOMElementById<HTMLInputElement>("empNo")).readOnly = true;
    (fetchDOMElementById<HTMLButtonElement>("submitButton")).innerHTML = "Edit";
}

export function updateRoleDetailsInAddEmployeeForm(role:Role):void{
    (fetchDOMElementById<HTMLOptionElement>(`${role?.location}`)).selected = true;
    (fetchDOMElementById<HTMLOptionElement>(`${role?.name}`)).selected = true;
    (fetchDOMElementById<HTMLOptionElement>(`${role?.department}`)).selected = true;
}