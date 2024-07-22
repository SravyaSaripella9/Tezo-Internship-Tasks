let employees = JSON.parse(localStorage.getItem('employees')) || [];
let roles = JSON.parse(localStorage.getItem('roles')) || [];

window.onload = () => {
    createTable(employees);
}

function createTable(employees) {
    const tableBody = document.querySelector(".employees-table-body");
    tableBody.innerHTML = "";
    for (i = 0; i < employees.length; i++) {
        let employeeRole=roles.find(role => role.id==employees[i].roleId);
        let tableRow = document.createElement("tr");
        tableRow.classList.add("row");
        tableRow.innerHTML += `<td class="check-box"><input type="checkbox" onclick="toggleEmployee(this,'${employees[i].empNo}')"/></td>
            <td class="table-data">
                <div class="table-profile">
                    <img src="${employees[i].empImage}">
                    <div class="employee-details">
                        <div class="employee-name">${employees[i].firstName + " " + employees[i].lastName}</div>
                        <div class="employee-mail">${employees[i].mail}</div>
                    </div>
                </div>
            </td>
            <td class="table-data">${employeeRole?.location || ""}</td>
            <td class="table-data">${employeeRole?.department || ""}</td>
            <td class="table-data">${employeeRole?.name || ""}</td>
            <td class="table-data">${employees[i].empNo}</td>
            <td class="table-data"><button class="active-button" title="Active">Active</button></td>
            <td class="table-data">${employees[i].joinDate}</td>
            <td class="table-data" id='cell-${i}'>
                <button class="ellipsis-button" onclick="showOrHideMenu(${i})">
                    <img class="ellipsis" src="assets/dots.png" alt="Ellipsis" />
                </button>
            </td>
        </tr>`;
        tableBody.appendChild(tableRow);
    }
}

function filterEmployeesByName(){
    let searchInput=document.querySelector("input[type='search']").value;
    const tableRow=document.querySelectorAll("tr");
    for(i=0;i<employees.length;i++){
        empName=((employees[i].firstName+" "+employees[i].lastName).toUpperCase());
        searchInput=searchInput.toUpperCase();
        if(empName.indexOf(searchInput)>-1){
            tableRow[i+1].style.display="flex";
            tableRow[i+1].style.alignItems="center";
        }
        else
            tableRow[i+1].style.display="none";
    }
}

//Code for functionality of export button
let employeesFilteredByAlphabet=[];
function exportData(){
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    if(employeesFilteredByAlphabet.length==0){
        employees.forEach(emp=>{
            employeesFilteredByAlphabet.push(emp);
        })
    }
    const csvRows=[[]];   
    csvRows[0][0]="USER";
    csvRows[0][1]="MAIL";
    csvRows[0][2]="LOCATION";
    csvRows[0][3]="DEPARTMENT";
    csvRows[0][4]="ROLE";
    csvRows[0][5]="EMP NO";
    csvRows[0][6]="STATUS";
    csvRows[0][7]="JOIN DT";
    for(i=0;i<employeesFilteredByAlphabet.length;i++){
        employeeRole=roles.find(role => role.id==employeesFilteredByAlphabet[i].roleId);
        csvRows[i+1]=[{}];
        csvRows[i+1][0]=employeesFilteredByAlphabet[i].firstName+" "+employeesFilteredByAlphabet[i].lastName;
        csvRows[i+1][1]=employeesFilteredByAlphabet[i].mail;
        csvRows[i+1][2]=employeeRole?.location || "";
        csvRows[i+1][3]=employeeRole?.department || "";
        csvRows[i+1][4]=employeeRole?.name || "";
        csvRows[i+1][5]=employeesFilteredByAlphabet[i].empNo;
        csvRows[i+1][6]=employeesFilteredByAlphabet[i].status;
        csvRows[i+1][7]=employeesFilteredByAlphabet[i].joinDate;
    }
    const csvObject=csvRows.map(row=>row.join(',')).join('\n');
    const blob = new Blob([csvObject], {type: 'text/csv'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employees-table.csv';
    link.click();
}

//Code for sorting of table columns.
let currentHeader;
let sort_order = {};
function sortColumn(col) {
    const table = document.querySelector(".employees-table table");
    const row = Array.from(table.rows).slice(1);
    currentHeader = document.querySelectorAll(".sorted-table-header");
    if (currentHeader.length > 0) {
        currentHeader[0].className = currentHeader[0].className.replace("sorted-table-header", "");
    }
    const tableRowHeader=document.querySelectorAll("thead th div")[col-1];
    tableRowHeader.classList.add("sorted-table-header");
    row.sort((a, b) => {
        let cell1 = a.cells[col].textContent.trim();
        let cell2 = b.cells[col].textContent.trim();
        //if the column is date
        if (col == 7) {
            cell1 = cell1.split('/').reverse().join('');
            cell2 = cell2.split('/').reverse().join('');
        }
        if (sort_order[col] != "asc") {
            if (!isNaN(cell1) && !isNaN(cell2)) {
                return (parseInt(cell1) - parseInt(cell2));
            }
            else {
                return cell1.localeCompare(cell2);
            }
        }
        else {
            if (!isNaN(cell1) && !isNaN(cell2)) {
                return (parseInt(cell2) - parseInt(cell1));
            }
            else {
                return cell2.localeCompare(cell1);
            }
        }
    });
    if (sort_order[col] == "asc")
        sort_order[col] = "desc";
    else
        sort_order[col] = "asc";
    table.tBodies[0].innerHTML = "";
    table.tBodies[0].append(...row);
}

let alphabeticalButtons = document.querySelector(".alphabetical-buttons-container");
let filterImageRed = document.querySelector(".filter-red-image");
let filterImageBlack = document.querySelector(".filter-black-image");
let current;

//Code for alphabetical buttons creation.
for (let i = 65; i <= 90; i++) {
    alphabeticalButtons.innerHTML += `<button onclick="applyAlphabetFilter(this,'${String.fromCharCode(i)}')" class="alphabet-button" value=${String.fromCharCode(i)}>${String.fromCharCode(i)}</button>`
}

//Code for click function of alphabetical buttons.
let currentCharacter = "";
function applyAlphabetFilter(element, character) {
    current = document.querySelectorAll(".active-alphabet");
    if (current.length > 0) {
        current[0].className = current[0].className.replace("active-alphabet", "");
    }
    element.classList.add("active-alphabet");
    filterImageBlack.style.display = "none";
    filterImageRed.style.display = "block";
    currentCharacter = character;
    applyFilter();
}

function changeFilterIconColor(){
    filterImageRed.style.display = "none";
    filterImageBlack.style.display = "block";
    current = document.querySelectorAll(".active-alphabet");
    if (current.length > 0) {
        current[0].className = current[0].className.replace("active-alphabet", "");
    }
    currentCharacter = "";
    applyFilter();
}

const statusHeader=document.getElementById("status"); 
const statusOptionsContainer=document.querySelector(".status-options"); 
const locationHeader=document.getElementById("location");
const locationOptionsContainer=document.querySelector(".location-options");
const departmentHeader=document.getElementById("department");
const departmentOptionsContainer=document.querySelector(".department-options");
let statusdropdownDisplay=false;
let locationdropdownDisplay=false;
let departmentdropdownDisplay=false;

function displayDropdown(dropdownType) {
    if (dropdownType == "status") {
        toggleDropdown(statusOptionsContainer, statusdropdownDisplay);
        statusdropdownDisplay = !statusdropdownDisplay;
    }
    else if (dropdownType == "location") {
        toggleDropdown(locationOptionsContainer, locationdropdownDisplay);
        locationdropdownDisplay = !locationdropdownDisplay;
    }
    else if (dropdownType == "department") {
        toggleDropdown(departmentOptionsContainer, departmentdropdownDisplay);
        departmentdropdownDisplay = !departmentdropdownDisplay;
    }
}

function toggleDropdown(optionsElement, display){
    if(display){
        optionsElement.style.display="none";
    }
    else{
        optionsElement.style.display="block";
    }
}

const statusSelectOptions=document.querySelectorAll(".status-option input"); 
const locationSelectOptions=document.querySelectorAll(".location-option input");
const departmentSelectOptions=document.querySelectorAll(".department-option input");

function fetchFilteredData(options,dropdownType,data,uncheckedCount,noOfOptions){
    let filteredData=[];
    options.forEach(checkBox=>{
        if (checkBox.checked) {
            data.filter(emp => {
                if (dropdownType == "location" || dropdownType == "department") {
                    employeeRole = roles.find(role => role.id == emp.roleId);
                    if (employeeRole[dropdownType] == checkBox.value) {
                        filteredData.push(emp);
                        filteredData = Array.from(new Set(filteredData));
                    }
                }
                else {
                    if (emp[dropdownType] == checkBox.value) {
                        filteredData.push(emp);
                        filteredData = Array.from(new Set(filteredData));
                    }
                }
            })
        }
        else {
            uncheckedCount++;
            filteredData.forEach(emp => {
                if (dropdownType == "location" || dropdownType == "department")
                    emp = roles.find(role => role.id == emp.roleId);
                if (emp[dropdownType] == checkBox.value) {
                    filteredData.splice(i, 1);
                    i = i - 1;
                }
            })
        }
        if(uncheckedCount==noOfOptions){
            data.filter(emp=>{
                filteredData.push(emp);
            })
        }
    });
    return [filteredData,uncheckedCount];
}

function applyFilter() {
    let statusFilter=[];
    let locationFilter=[];
    let departmentFilter=[];
    employeesFilteredByAlphabet=[];
    let statusUncheckedCount=0;
    let locationUncheckedCount=0;
    let departmentUncheckedCount=0;
    [statusFilter,statusUncheckedCount]=fetchFilteredData(statusSelectOptions,"status",employees,statusUncheckedCount,statusSelectOptions.length);
    [locationFilter,locationUncheckedCount]=fetchFilteredData(locationSelectOptions,"location",statusFilter,locationUncheckedCount,locationSelectOptions.length);
    [departmentFilter,departmentUncheckedCount]=fetchFilteredData(departmentSelectOptions,"department",locationFilter,departmentUncheckedCount,departmentSelectOptions.length);
    if(currentCharacter!=""){
        departmentFilter.filter(emp=>{
            if(emp.firstName.charAt(0).toUpperCase()==currentCharacter){
                employeesFilteredByAlphabet.push(emp);
            }
        })
    }
    else{
        departmentFilter.filter(emp=>{
            employeesFilteredByAlphabet.push(emp);
        })
    }
    if(statusUncheckedCount!=statusSelectOptions.length || locationUncheckedCount!=locationSelectOptions.length || departmentUncheckedCount!=departmentSelectOptions.length){
        statusHeader.innerHTML="Status: "+(statusSelectOptions.length-statusUncheckedCount)+" selected";
        statusHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
        statusHeader.style.color="#F44848";
        statusOptionsContainer.style.display="none";
        if(statusdropdownDisplay==true)
            statusdropdownDisplay = !statusdropdownDisplay;
        locationHeader.innerHTML="Location: "+(locationSelectOptions.length-locationUncheckedCount)+" selected";
        locationHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
        locationHeader.style.color="#F44848";
        locationOptionsContainer.style.display="none";
        if(locationdropdownDisplay==true)
            locationdropdownDisplay = !locationdropdownDisplay;
        departmentHeader.innerHTML="Department: "+(departmentSelectOptions.length-departmentUncheckedCount)+" selected";
        departmentHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
        departmentHeader.style.color="#F44848";
        departmentOptionsContainer.style.display="none";
        if(departmentdropdownDisplay==true)
            departmentdropdownDisplay = !departmentdropdownDisplay;
    }
    createTable(employeesFilteredByAlphabet);
}

function resetFilter() {
    // // resetButton.disabled=true;
    // // resetButton.style.cursor="not-allowed";
    // // applyButton.disabled=true;
    // // applyButton.style.cursor="not-allowed";
    statusSelectOptions.forEach(checkBox=>{
        checkBox.checked=false;
    })
    locationSelectOptions.forEach(checkBox=>{
        checkBox.checked=false;
    })
    departmentSelectOptions.forEach(checkBox=>{
        checkBox.checked=false;
    })
    applyFilter();
    statusHeader.innerHTML="Status";
    statusHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
    statusHeader.style.color="#505F7C";
    locationHeader.innerHTML="Location";
    locationHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
    locationHeader.style.color="#505F7C";
    departmentHeader.innerHTML="Department";
    departmentHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
    departmentHeader.style.color="#505F7C";
}

//Code for delete button functionality
let deleteButton = document.querySelector(".delete-button button");
let selectedEmployees=[];

function toggleEmployee(element,id) {
    if(element.checked){
        deleteButton.style.display = "block";
        selectedEmployees.push(id);
    }
    else if(!anyCheckboxChecked())
        deleteButton.style.display="none";
    else if(!element.checked){
        for(i=0;i<selectedEmployees.length;i++){
            if(selectedEmployees[i]==id){
                selectedEmployees.splice(i,1);
            }
        }
    }
    let headerCheckbox=document.querySelector("thead .check-box input");
    if(allCheckboxesChecked()){
        headerCheckbox.checked=true;
    }
    else{
        headerCheckbox.checked=false;
    }
}

function anyCheckboxChecked(){
    let checkBoxes = document.querySelectorAll(".check-box input");
    return Array.from(checkBoxes).some(checkbox=>checkbox.checked);
}

function allCheckboxesChecked(){
    let checkBoxes = document.querySelectorAll("tbody .check-box input");
    return Array.from(checkBoxes).every(checkbox=>checkbox.checked);
}

function toggleAllEmployees(element) {
    checkBoxes = document.querySelectorAll(".check-box input");
    if(element.checked){
        checkBoxes.forEach(check => {
            check.checked = true;
        })
        selectedEmployees=[];
        employees.filter(emp=>{
            selectedEmployees.push(emp.empNo);
        })
        deleteButton.style.display="block";
    }
    else{
        checkBoxes.forEach(check => {
            check.checked = false;
        })
        selectedEmployees=[];
        deleteButton.style.display="none";
    }
}

function deleteEmployee(){
    for(i=0;i<selectedEmployees.length;i++){
        employees.forEach((ele,j)=>{
            if(ele.empNo==selectedEmployees[i]){
                employees.splice(j,1);
            }
        });
    }
    localStorage.setItem("employees", JSON.stringify(employees));
    location.reload();
}

const menuarray = ["View Details", "Edit", "Delete"];
let ellipsisMenu = true;
function showOrHideMenu(index) {
    if (ellipsisMenu) {
        showMenu(index);
    }
    else {
        hideMenu(index);
    }
    ellipsisMenu = !ellipsisMenu;
}

function showMenu(index) {
    const ellipsis = document.getElementById(`cell-${index}`);
    const ellipsis_div = document.createElement("div");
    ellipsis_div.classList.add("ellipse-menu");
    ellipsis_div.setAttribute('id', `row-${index}`);
    const list = document.createElement("ul");
    list.style.margin = "0";
    list.style.padding = "0 0 0 20px";
    for (i = 0; i < menuarray.length; i++) {
        const list_item = document.createElement("li");
        const link = document.createElement("a");
        if(i==0)
            link.href=`add-employee.html?action=View-Details&id=${employees[index].empNo}`;
        else if(i==1)
            link.href=`add-employee.html?action=Edit-Employee&id=${employees[index].empNo}`;
        else{
            link.addEventListener("click",function(){
                employees.splice(index,1);
                localStorage.setItem("employees", JSON.stringify(employees));
                createTable(employees);
            })
        }
        link.style.cursor = "pointer";
        link.innerHTML = menuarray[i];
        list_item.append(link);
        list.appendChild(list_item);
    }
    ellipsis_div.append(list);
    ellipsis.append(ellipsis_div);
}

function hideMenu(index) {
    const ellipsis_div = document.getElementById(`row-${index}`);
    ellipsis_div.remove();
}