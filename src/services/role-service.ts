import { Employee } from '../models/employee.js';
import { Role } from '../models/role.js';
import { StorageService } from './storage-service.js';
import { fetchEmployeesData } from './employee-service.js';
import { updateAddEmployeeLinkForRole } from '../pages/role-details/role-details.js';

export function fetchRolesData():Role[]{
    let rolesString = StorageService.getItem<Role[]>('roles');
    let roles: Role[] = rolesString ? rolesString : []; 
    return roles;
}

export let emp_details:Employee[];
export function handleRoleDetailsPageNavigation(queryString:string):void{
    const urlParams: URLSearchParams = new URLSearchParams(queryString);
    if (urlParams != null) {
        let employees:Employee[]=fetchEmployeesData();
        const roleId:number = Number(urlParams.get('id'));
        updateAddEmployeeLinkForRole(roleId);
        emp_details = employees.filter((emp: any) => emp.roleId == roleId);
    }
}

let selectedEmployees:Employee[]=[];
export function addToSelectedEmployee(id:string):void{
    let employees:Employee[]=fetchEmployeesData();
    for (let i: number = 0; i < employees.length; i++) {
        if (employees[i].empNo == id) {
            selectedEmployees.push(employees[i]);
        }
    }
}
export function removeFromSelectedEmployee(id:string):void{
    for (let i: number = 0; i < selectedEmployees.length; i++) {
        if (selectedEmployees[i].empNo == id)
            selectedEmployees.splice(i, 1);
    }
}

export function saveRole(newRole:Role): void {
    let employees:Employee[]=fetchEmployeesData();
    let roles:Role[]=fetchRolesData();
    for (let i = 0; i < selectedEmployees.length; i++) {
        for (let j = 0; j < employees.length; j++) {
            if (employees[j].empNo == selectedEmployees[i].empNo) {
                employees[j].roleId = newRole.id;
            }
        }
        StorageService.setItem("employees", employees);
    }
    roles.push(newRole);
    StorageService.setItem("roles", roles);
}