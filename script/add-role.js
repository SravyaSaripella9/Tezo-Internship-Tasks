let employees=JSON.parse(localStorage.getItem('employees')) || [];
let roles=JSON.parse(localStorage.getItem('roles')) || [];

function addRole(){
    roles=JSON.parse(localStorage.getItem('roles')) || [];
    const id=performance.now();
    const name=document.getElementById("roleName").value;
    const department=document.getElementById("department").value;
    const roleDescription=document.getElementById("roleDescription").value;
    const location=document.getElementById("location").value;
    for(i=0;i<selectedEmployees.length;i++){
        for(j=0;j<employees.length;j++){
            if(employees[j].empNo==selectedEmployees[i].empNo){
                employees[j].roleId=id;
            }
        }
        localStorage.setItem("employees",JSON.stringify(employees));
    }
    const role={
        id,
        name,
        department,
        roleDescription,
        location
    }   
    roles.push(role);
    localStorage.setItem("roles",JSON.stringify(roles));
    location.reload();
    location.href="roles.html";
}

const assignEmployeesOptions=document.querySelector(".assign-employees");
for(i=0;i<employees.length;i++){
    assignEmployeesOptions.innerHTML+=`<div class="assign-employees-option">
    <div>
        <img src="${employees[i].empImage}" alt="Employee-Image">
        ${employees[i].firstName+" "+employees[i].lastName}
    </div>
    <div><input type="checkbox" onclick="selectEmployee(this,'${employees[i].empNo}')"/></div>
</div>`
}

function searchEmployee(){
    let searchInput=document.querySelector("input[type='search']").value;
    const assignEmployeesOption=document.querySelectorAll(".assign-employees-option");
    for(i=0;i<employees.length;i++){
        empName=((employees[i].firstName+" "+employees[i].lastName).toUpperCase());
        searchInput=searchInput.toUpperCase();
        if(empName.indexOf(searchInput)>-1)
            assignEmployeesOption[i].style.display="inline-flex";
        else
            assignEmployeesOption[i].style.display="none";
    }
}

let selectedEmployees=[];
function selectEmployee(element,id){
    if(element.checked){
        for(i=0;i<employees.length;i++)
        {
            if(employees[i].empNo==id){
                selectedEmployees.push(employees[i]);
            }
        }
    }
    else{
        for(i=0;i<selectedEmployees.length;i++)
        {
            if(selectedEmployees[i].empNo==id)
                selectedEmployees.splice(i,1);
        }
    }
}

function navigateToRolesPage(){
    location.href="roles.html";
}