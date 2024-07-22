import { Role } from "../models/role.js";
import { fetchRolesData } from "./role-service.js";
import { Column } from "../models/common.js";
import { isOptionSelected } from "../pages/employees/employees.js";

let Sort: Column[] = [
    {
        columnName: "USER",
        direction: "",
    },
    {
        columnName: "LOCATION",
        direction: "",
    },
    {
        columnName: "DEPARTMENT",
        direction: "",
    },
    {
        columnName: "ROLE",
        direction: "",
    },
    {
        columnName: "EMP NO",
        direction: "",
    },
    {
        columnName: "STATUS",
        direction: "",
    },
    {
        columnName: "JOIN DT",
        direction: "",
    }
]

// Code for sorting of table columns.
export function applySort(table:HTMLTableElement, row:HTMLTableRowElement[], col:number):HTMLTableRowElement[] {
    row.sort((a:HTMLTableRowElement, b:HTMLTableRowElement) => {
        let cell1:string = a.cells[col].textContent?.trim() || "";
        let cell2:string = b.cells[col].textContent?.trim() || "";
        //if the column is date
        if (col == 7) {
            cell1 = cell1.split('/').reverse().join('');
            cell2 = cell2.split('/').reverse().join('');
        }
        if (Sort[col-1].direction!="asc") {
            return cell1?.localeCompare(cell2);
        }
        else {
            return cell2?.localeCompare(cell1);
        }
    });
    if (Sort[col-1].direction == "asc")
        Sort[col-1].direction = "desc";
    else
        Sort[col-1].direction = "asc";
    return row;
}

export function fetchFilteredData(options:NodeListOf<HTMLInputElement>, dropdownType:string, data:any, uncheckedCount:number, noOfOptions:number, typeOfFilter:string):[any, number]{
    let filteredData:any=[];
    options.forEach(checkBox=>{
        if (isOptionSelected(checkBox)) {
            filteredData=addToFilteredData(checkBox, dropdownType, data, typeOfFilter, filteredData);
        }
        else {
            uncheckedCount++;
            filteredData=removeFromFilteredData(checkBox, dropdownType, typeOfFilter, filteredData);
        }
        if(uncheckedCount==noOfOptions){
            filteredData=data;
        }
    });
    return [filteredData,uncheckedCount];
}

function addToFilteredData(checkBox:HTMLInputElement, dropdownType:string, data:any, typeOfFilter:string, filteredData:any):any{
    let roles:Role[]=fetchRolesData();
    data.forEach((obj: any) => {
        if ((typeOfFilter == "employees") && (dropdownType == "location" || dropdownType == "department")) {
            let employeeRole = roles.find((role: Role) => role.id == obj.roleId);
            if (employeeRole != undefined) {
                if (employeeRole[dropdownType] == checkBox.value) {
                    filteredData.push(obj);
                }
            }
        }
        else {
            if (obj[dropdownType] == checkBox.value) {
                filteredData.push(obj);
            }
        }
    })
    return filteredData = Array.from(new Set(filteredData));
}

function removeFromFilteredData(checkBox:HTMLInputElement, dropdownType:string, typeOfFilter:string, filteredData:any):any{
    let roles:Role[]=fetchRolesData();
    filteredData.forEach((obj: any, i: number) => {
        if ((typeOfFilter == "employees") && (dropdownType == "location" || dropdownType == "department")) {
            let employeeRole = roles.find((role: Role) => role.id == obj.roleId);
            if (employeeRole != undefined) {
                if (employeeRole[dropdownType] == checkBox.value) {
                    filteredData.splice(i, 1);
                    i = i - 1;
                }
            }
        }
        else {
            if (obj[dropdownType] == checkBox.value) {
                filteredData.splice(i, 1);
                i = i - 1;
            }
        }
    })
    return filteredData;
}