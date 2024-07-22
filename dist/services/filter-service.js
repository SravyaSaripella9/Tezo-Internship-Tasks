import { fetchRolesData } from "./role-service.js";
import { isOptionSelected } from "../pages/employees/employees.js";
let Sort = [
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
];
// Code for sorting of table columns.
export function applySort(table, row, col) {
    row.sort((a, b) => {
        var _a, _b;
        let cell1 = ((_a = a.cells[col].textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        let cell2 = ((_b = b.cells[col].textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        //if the column is date
        if (col == 7) {
            cell1 = cell1.split('/').reverse().join('');
            cell2 = cell2.split('/').reverse().join('');
        }
        if (Sort[col - 1].direction != "asc") {
            return cell1 === null || cell1 === void 0 ? void 0 : cell1.localeCompare(cell2);
        }
        else {
            return cell2 === null || cell2 === void 0 ? void 0 : cell2.localeCompare(cell1);
        }
    });
    if (Sort[col - 1].direction == "asc")
        Sort[col - 1].direction = "desc";
    else
        Sort[col - 1].direction = "asc";
    return row;
}
export function fetchFilteredData(options, dropdownType, data, uncheckedCount, noOfOptions, typeOfFilter) {
    let filteredData = [];
    options.forEach(checkBox => {
        if (isOptionSelected(checkBox)) {
            filteredData = addToFilteredData(checkBox, dropdownType, data, typeOfFilter, filteredData);
        }
        else {
            uncheckedCount++;
            filteredData = removeFromFilteredData(checkBox, dropdownType, typeOfFilter, filteredData);
        }
        if (uncheckedCount == noOfOptions) {
            filteredData = data;
        }
    });
    return [filteredData, uncheckedCount];
}
function addToFilteredData(checkBox, dropdownType, data, typeOfFilter, filteredData) {
    let roles = fetchRolesData();
    data.forEach((obj) => {
        if ((typeOfFilter == "employees") && (dropdownType == "location" || dropdownType == "department")) {
            let employeeRole = roles.find((role) => role.id == obj.roleId);
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
    });
    return filteredData = Array.from(new Set(filteredData));
}
function removeFromFilteredData(checkBox, dropdownType, typeOfFilter, filteredData) {
    let roles = fetchRolesData();
    filteredData.forEach((obj, i) => {
        if ((typeOfFilter == "employees") && (dropdownType == "location" || dropdownType == "department")) {
            let employeeRole = roles.find((role) => role.id == obj.roleId);
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
    });
    return filteredData;
}
