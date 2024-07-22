import { Employee } from '../models/employee.js';
import { Role } from '../models/role.js';
import { StorageService } from './storage-service.js';
import { fetchRolesData } from './role-service.js';
import { createTable, selectedEmployeesToDelete } from '../pages/employees/employees.js';
import { resetCheckboxAndHideDeleteButton } from '../pages/employees/employees.js';
import { displayDefaultData } from '../pages/add-employee/add-employee.js';
import { disableEditableViewDetails } from '../pages/add-employee/add-employee.js';
import { configureUpdateEmployeeForm } from '../pages/add-employee/add-employee.js';
import { updateRoleDetailsInAddEmployeeForm } from '../pages/add-employee/add-employee.js';

export function fetchEmployeesData():Employee[]{
    let employeesString=StorageService.getItem<Employee[]>('employees');
    let employees: Employee[] = employeesString ? employeesString : [];
    return employees;
}

export function deleteEmployee(): void {
    let employees:Employee[]=fetchEmployeesData();
    for (let i: number = 0; i < selectedEmployeesToDelete.length; i++) {
        employees.forEach((ele: Employee, j: number) => {
            if (ele.empNo == selectedEmployeesToDelete[i]) {
                employees.splice(j, 1);
            }
        });
    }
    StorageService.setItem("employees",employees);
    resetCheckboxAndHideDeleteButton();
    createTable(employees);
}

let profileImageSrc: any;
export function uploadImage(employeeImage:HTMLImageElement, imageInput:HTMLInputElement):void {
    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (event) {
            if (event.target != null) {
                profileImageSrc = event.target.result;
                employeeImage.setAttribute("src", profileImageSrc);
            }
        }
        reader.readAsDataURL(imageInput.files[0]);
    }
}

export function handleChange(elementType:string,filteredRoles:Role[],value:string):Role[]{
    let roles:Role[]=fetchRolesData();
    if(value=="Unassigned")
        filteredRoles=roles;
    else{
        switch(elementType){
            case "location":
                filteredRoles=filterRoles(filteredRoles, elementType, value);
                break;
            case "jobTitle":
                filteredRoles=filterRoles(filteredRoles, elementType, value);
                break;
            case "department":
                filteredRoles=filterRoles(filteredRoles, elementType, value);
                break;
        }
    }
    return filteredRoles;
}

function filterRoles(filteredRoles:Role[], elementType:string, value:string): Role[]{
    let roles:Role[]=fetchRolesData();
    return filteredRoles=roles.filter((role:any)=>role[elementType]==value);
}

export function saveEmployee(newEmployee:Employee, location:string, jobTitle:string, department:string):void {
    let employees:Employee[]=fetchEmployeesData();
    let roles:Role[]=fetchRolesData();
    let count: number = 0;
    roles.forEach((role: Role) => {
        if (role.location == location && role.name == jobTitle && role.department == department) {
            newEmployee.roleId = role.id;
            return;
        }
    })
    for (let i:number = 0; i < employees.length; i++) {
        if (newEmployee.empNo == employees[i].empNo) {
            employees[i].empImage = newEmployee.empImage;
            employees[i].firstName = newEmployee.firstName;
            employees[i].lastName = newEmployee.lastName;
            employees[i].dob = newEmployee.dob;
            employees[i].mail = newEmployee.mail;
            employees[i].contactNo = newEmployee.contactNo;
            employees[i].joinDate = newEmployee.joinDate;
            employees[i].roleId = newEmployee.roleId;
            employees[i].manager = newEmployee.manager;
            employees[i].projectName = newEmployee.projectName;
            break;
        }
        else {
            count++;
        }
    }
    if (count == employees.length) {
        employees.push(newEmployee);
    }
    StorageService.setItem("employees", employees);
}

// Code for functionality of ellipse menu in employees page.
export function viewDetails(queryString:string):void{
    let urlParams:URLSearchParams = new URLSearchParams(queryString);
    if(urlParams!=null){
        let action=urlParams.get('action');
        let empID = urlParams.get('id');
        if(action=="View-Details"){
            let employees:Employee[]=fetchEmployeesData();
            let employee=employees.find((emp:Employee)=>emp.empNo==empID);
            if(employee!=undefined)
                displayDefaultData(employee);
            disableEditableViewDetails();
        }
    }
}

export function updateEmployee(queryString:string): void {
    let urlParams:URLSearchParams = new URLSearchParams(queryString);
    if (urlParams != null) {
        let action = urlParams.get('action');
        let empID = urlParams.get('id');
        if (action == "Edit-Employee") {
            let employees:Employee[]=fetchEmployeesData();
            let employee = employees.find((emp: Employee) => emp.empNo == empID);
            if (employee != undefined)
                displayDefaultData(employee);
            configureUpdateEmployeeForm();
        }
    }
}

// Code for functionality of add employee page in role-details.
export function handleAddEmployeeInRoleDetailsPage(queryString:string):void{
    let urlParams: URLSearchParams = new URLSearchParams(queryString);
    if (urlParams != null) {
        let action = urlParams.get('action');
        let roleID = urlParams.get('id');
        if (action == "Add-Employee") {
            let roles:Role[]=fetchRolesData();
            let role = roles.find((role: Role) => role.id == Number(roleID));
            if(role!=undefined)
                updateRoleDetailsInAddEmployeeForm(role);
        }
    }
}