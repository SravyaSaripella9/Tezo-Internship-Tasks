let employees = JSON.parse(localStorage.getItem('employees')) || [];
let roles = JSON.parse(localStorage.getItem('roles')) || [];

let emp_details;

window.onload = () => {
    createRoleCard(roles);
}

function createRoleCard(roles){
    const cardContainer=document.querySelector(".cards");
    cardContainer.innerHTML="";
    for(i=0;i<roles.length;i++){
        const card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML+=`<div class="card-header">
                <div>${roles[i].name}</div>
                <img src="assets/edit.svg" />
            </div>
            <div class="card-content">
                <div class="category">
                    <img src="assets/department.svg" />
                    <div>Department</div>
                </div>
                <div class="value">${roles[i].department}</div>
            </div>
            <div class="card-content">
                <div class="category">
                    <img src="assets/location.svg" />
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
                <a href="role-details.html?id=${roles[i].id}">
                    View all Employees
                    <img src="assets/vector.svg"/>
                </a>
            </div>
        </div>`;
        cardContainer.append(card);
    }
    addProfiles();
}

function addProfiles(){
    for(i=0;i<roles.length;i++){
        const profiles=document.getElementById(`profiles-${roles[i].id}`)
        emp_details=employees.filter(emp=>emp.roleId==roles[i].id);
        for(j=0;j<emp_details.length;j++){
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

const locationHeader=document.getElementById("location");
const locationOptionsContainer=document.querySelector(".location-options");
const departmentHeader=document.getElementById("department");
const departmentOptionsContainer=document.querySelector(".department-options");
let locationdropdownDisplay=false;
let departmentdropdownDisplay=false;

function displayDropdown(dropdownType) {
    if (dropdownType == "location") {
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

const locationSelectOptions=document.querySelectorAll(".location-option input");
const departmentSelectOptions=document.querySelectorAll(".department-option input");

function fetchFilteredData(options,dropdownType,data,uncheckedCount,noOfOptions){
    let filteredData=[];
    options.forEach(checkBox=>{
        if (checkBox.checked) {
            data.filter(role => {
                    if (role[dropdownType] == checkBox.value) {
                        filteredData.push(role);
                        filteredData = Array.from(new Set(filteredData));
                    }
            })
        }
        else {
            uncheckedCount++;
            filteredData.forEach(role => {
                if (role[dropdownType] == checkBox.value) {
                    filteredData.splice(i, 1);
                    i = i - 1;
                }
            })
        }
        if(uncheckedCount==noOfOptions){
            data.filter(role=>{
                filteredData.push(role);
            })
        }
    });
    return [filteredData,uncheckedCount];
}

function applyFilter(){
    let locationFilter=[];
    let departmentFilter=[];
    let locationUncheckedCount=0;
    let departmentUncheckedCount=0;
    [locationFilter,locationUncheckedCount]=fetchFilteredData(locationSelectOptions,"location",roles,locationUncheckedCount,locationSelectOptions.length);
    [departmentFilter,departmentUncheckedCount]=fetchFilteredData(departmentSelectOptions,"department",locationFilter,departmentUncheckedCount,departmentSelectOptions.length);
    if(locationUncheckedCount!=locationSelectOptions.length || departmentUncheckedCount!=departmentSelectOptions.length){
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
    createRoleCard(departmentFilter);
}

function resetFilter() {
    locationSelectOptions.forEach(checkBox=>{
        checkBox.checked=false;
    })
    departmentSelectOptions.forEach(checkBox=>{
        checkBox.checked=false;
    })
    applyFilter();
    locationHeader.innerHTML="Location";
    locationHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
    locationHeader.style.color="#505F7C";
    departmentHeader.innerHTML="Department";
    departmentHeader.innerHTML+=`<img src="assets/down-arrow.png" />`;
    departmentHeader.style.color="#505F7C";
}