const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roleId = urlParams.get('id');

let employees = JSON.parse(localStorage.getItem('employees')) || [];
let roles = JSON.parse(localStorage.getItem('roles')) || [];

let emp_details;
emp_details=employees.filter(emp=>emp.roleId==roleId);

window.onload = () => {
    createRoleDetailsCard(emp_details);
}

function createRoleDetailsCard(emp_details){
    const cardContainer=document.querySelector(".cards");
    cardContainer.innerHTML="";
    for(i=0;i<emp_details.length;i++){
        let employeeRole=roles.find(role => role.id==emp_details[i].roleId);
        const card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML+=`<div class="card-profile">
                <div class="profile-image">
                    <img src="${emp_details[i].empImage}" />
                </div>
                <div class="details">
                    <div>${emp_details[i].firstName + " " + emp_details[i].lastName}</div>
                    <div>${employeeRole.name}</div>
                </div>
            </div>
            <div class="card-data">
                <img src="assets/id.svg" />
                ${emp_details[i].empNo}
            </div>
            <div class="card-data">
                <img src="assets/mail.svg" />
                ${emp_details[i].mail}
            </div>
            <div class="card-data">
                <img src="assets/department.svg" />
                ${employeeRole.department}
            </div>
            <div class="card-data">
                <img src="assets/location.svg" />
                ${employeeRole.location}
            </div>
            <div class="card-footer">
                View
                <img src="assets/vector.svg" />
            </div>
        </div>`;
        cardContainer.append(card);
    }
}

const addEmp=document.querySelector(".add-employee-button a");
addEmp.href=`add-employee.html?action=Add-Employee&id=${roleId}`;
