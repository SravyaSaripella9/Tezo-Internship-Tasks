import { Employee } from '../models/employee.js';
import { Role } from '../models/role.js';
import { fetchEmployeesData } from './employee-service.js';
import { fetchRolesData } from './role-service.js';
import { employeesFilteredByAlphabet } from '../pages/employees/employees.js';

//Code for functionality of export button
export function fetchDataToExport():Blob{
    let employees:Employee[]=fetchEmployeesData();
    let roles:Role[]=fetchRolesData();
    let filteredEmployees=getFilteredEmployeesData(employees);
    const csvRows:any[]=[[]];   
    csvRows[0][0]="USER";
    csvRows[0][1]="MAIL";
    csvRows[0][2]="LOCATION";
    csvRows[0][3]="DEPARTMENT";
    csvRows[0][4]="ROLE";
    csvRows[0][5]="EMP NO";
    csvRows[0][6]="STATUS";
    csvRows[0][7]="JOIN DT";
    for(let i:number=0;i<filteredEmployees.length;i++){
        let employeeRole=roles.find((role:Role) => role.id==filteredEmployees[i].roleId);
        csvRows[i+1]=[{}];
        csvRows[i+1][0]=filteredEmployees[i].firstName+" "+filteredEmployees[i].lastName;
        csvRows[i+1][1]=filteredEmployees[i].mail;
        csvRows[i+1][2]=employeeRole?.location || "";
        csvRows[i+1][3]=employeeRole?.department || "";
        csvRows[i+1][4]=employeeRole?.name || "";
        csvRows[i+1][5]=filteredEmployees[i].empNo;
        csvRows[i+1][6]=filteredEmployees[i].status;
        csvRows[i+1][7]=filteredEmployees[i].joinDate;
    }
    const csvObject:string=csvRows.map((row)=>row.join(',')).join('\n');
    const blob:Blob = new Blob([csvObject], {type: 'text/csv'});
    return blob;
}

function getFilteredEmployeesData(employees:Employee[]):Employee[]{
    if(employeesFilteredByAlphabet.length==0){
        employees.forEach((emp:Employee)=>{
            employeesFilteredByAlphabet.push(emp);
        })
    }
    return employeesFilteredByAlphabet;
}