import { StorageService } from './storage-service.js';
import { fetchEmployeesData } from './employee-service.js';
import { updateAddEmployeeLinkForRole } from '../pages/role-details/role-details.js';
export function fetchRolesData() {
    let rolesString = StorageService.getItem('roles');
    let roles = rolesString ? rolesString : [];
    return roles;
}
export let emp_details;
export function handleRoleDetailsPageNavigation(queryString) {
    const urlParams = new URLSearchParams(queryString);
    if (urlParams != null) {
        let employees = fetchEmployeesData();
        const roleId = Number(urlParams.get('id'));
        updateAddEmployeeLinkForRole(roleId);
        emp_details = employees.filter((emp) => emp.roleId == roleId);
    }
}
let selectedEmployees = [];
export function addToSelectedEmployee(id) {
    let employees = fetchEmployeesData();
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].empNo == id) {
            selectedEmployees.push(employees[i]);
        }
    }
}
export function removeFromSelectedEmployee(id) {
    for (let i = 0; i < selectedEmployees.length; i++) {
        if (selectedEmployees[i].empNo == id)
            selectedEmployees.splice(i, 1);
    }
}
export function saveRole(newRole) {
    let employees = fetchEmployeesData();
    let roles = fetchRolesData();
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
