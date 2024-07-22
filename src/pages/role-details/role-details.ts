import { Employee } from '../../models/employee.js';
import { Role } from '../../models/role.js';
import { fetchRolesData } from '../../services/role-service.js';
import { fetchDOMElementByQuerySelector } from '../../common/dom-utils.js';
import { displaySideNav } from '../../common/side-nav-bar.js';
import { handleRoleDetailsPageNavigation } from '../../services/role-service.js';
import { emp_details } from '../../services/role-service.js';

window.onload = () => {
    (window as any).emp_details=emp_details;
    handleRoleDetailsPageNavigation(window.location.search);
    createRoleDetailsCard(emp_details);
    (window as any).displaySideNav=displaySideNav;
}

function createRoleDetailsCard(emp_details:Employee[]):void{
    const cardContainer=fetchDOMElementByQuerySelector<HTMLElement>(".cards");
    cardContainer.innerHTML="";
    let roles:Role[]=fetchRolesData();
    for(let i:number=0;i<emp_details.length;i++){
        let employeeRole=roles.find((role:Role) => role.id==emp_details[i].roleId);
        const card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML+=`<div class="card-profile">
                <div class="profile-image">
                    <img src="${emp_details[i].empImage}" />
                </div>
                <div class="details">
                    <div>${emp_details[i].firstName + " " + emp_details[i].lastName}</div>
                    <div>${employeeRole?.name}</div>
                </div>
            </div>
            <div class="card-data">
                <img src="../../../assets/id.svg" />
                ${emp_details[i].empNo}
            </div>
            <div class="card-data">
                <img src="../../../assets/mail.svg" />
                ${emp_details[i].mail}
            </div>
            <div class="card-data">
                <img src="../../../assets/department.svg" />
                ${employeeRole?.department}
            </div>
            <div class="card-data">
                <img src="../../../assets/location.svg" />
                ${employeeRole?.location}
            </div>
            <div class="card-footer">
                View
                <img src="../../../assets/vector.svg" />
            </div>
        </div>`;
        cardContainer.append(card);
    }
}

export function updateAddEmployeeLinkForRole(roleId:number):void{
    const addEmp = fetchDOMElementByQuerySelector<HTMLAnchorElement>(".add-employee-button a");
    addEmp.href = `../add-employee/add-employee.html?action=Add-Employee&id=${roleId}`;
}