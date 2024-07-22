let employees = JSON.parse(localStorage.getItem('employees')) || [];
let roles=JSON.parse(localStorage.getItem('roles')) || [];

let locations=[];
let jobTitles=[];
let departments=[];
for(i=0;i<roles.length;i++){
    locations[i]=roles[i].location;
    jobTitles[i]=roles[i].name;
    departments[i]=roles[i].department;
}
locations=Array.from(new Set(locations));
jobTitles=Array.from(new Set(jobTitles));
departments=Array.from(new Set(departments));

let locationOptions=document.getElementById("location");
let jobTitleOptions=document.getElementById("jobTitle");
let departmentOptions=document.getElementById("department");
locationOptions.innerHTML+=`<option value="Unassigned">Unassigned</option>`;
jobTitleOptions.innerHTML+=`<option value="Unassigned">Unassigned</option>`;
departmentOptions.innerHTML+=`<option value="Unassigned">Unassigned</option>`;
for(i=0;i<locations.length;i++){
    locationOptions.innerHTML+=`<option value="${locations[i]}" id="${locations[i]}">${locations[i]}</option>`;
}
for(i=0;i<jobTitles.length;i++){
    jobTitleOptions.innerHTML+=`<option value="${jobTitles[i]}" id="${jobTitles[i]}">${jobTitles[i]}</option>`;
}
for(i=0;i<departments.length;i++){
    departmentOptions.innerHTML+=`<option value="${departments[i]}" id="${departments[i]}">${departments[i]}</option>`;
}

let profileImageSrc;
function uploadImage() {
    var imageInput = document.getElementById('imageInput');
    if(imageInput.files && imageInput.files[0]){
        var reader=new FileReader();
        reader.onload=function(event){
            profileImageSrc=event.target.result;
            employeeImage.setAttribute("src",profileImageSrc);
        }
        reader.readAsDataURL(imageInput.files[0]);
    }
}

let roleCount;
function addEmployee(){
    let count=0;
    employees=JSON.parse(localStorage.getItem('employees')) || [];
    roles=JSON.parse(localStorage.getItem('roles')) || [];
    const empImage=document.getElementById("employeeImage").src;
    const empNo=document.getElementById("empNo").value;
    const firstName=document.getElementById("firstName").value;
    const lastName=document.getElementById("lastName").value;
    const dob=document.getElementById("dob").value;
    const mail=document.getElementById("mail").value;
    const contactNo=document.getElementById("contactNo").value;
    const joinDate=document.getElementById("joinDate").value;
    const location=document.getElementById("location").value;
    const jobTitle=document.getElementById("jobTitle").value;
    const department=document.getElementById("department").value;
    const manager=document.getElementById("manager").value;
    const project=document.getElementById("project").value;
    if(!validateMobileNumber(contactNo)){
        alert("Please enter valid mobile number");
        return;
    }
    if(!validateMail(mail)){
        alert("Please enter valid email ID");
        return;
    }
    let dateOfBirth = document.getElementById('dob').value;
    let joiningDate = document.getElementById('joinDate').value;
    dateOfBirth = new Date(dateOfBirth);
    joiningDate = new Date(joiningDate);
    let diff = (joiningDate - dateOfBirth)/(1000*60*60*24*365);
    if(diff < 18)
    {
        alert("The employee should be of minimum 18 years to join the organization");
        return;
    }
    let roleCount=0;
    roles.forEach(role=>{
        if(role.location==location && role.name==jobTitle && role.department==department){
            roleCount++;
            roleId=role.id;
            return;
        }
    })
    if(roleCount==roles.length){
        roleId:"";
    }
    for(i=0;i<employees.length;i++){
        if(empNo!=employees[i].empNo){
            count++;
        }
        else{
            let employeeRole=roles.find(role=>role.id==employees[i].roleId);
            console.log(employeeRole.id);
            employees[i].empImage=empImage;
            employees[i].firstName=firstName;
            employees[i].lastName=lastName;
            employees[i].dob=dob;
            employees[i].mail=mail;
            employees[i].contactNo=contactNo;
            employees[i].joinDate=joinDate;
            employees[i].roleId=roleId;
            employees[i].manager=manager;
            employees[i].project=project;
            break;
        }
    }
    if(count==employees.length){
        const employee={
            empImage,
            empNo,
            firstName,
            lastName,
            dob,
            mail,
            contactNo,
            joinDate,
            roleId,
            manager,
            project,
            status:"Active"
        };
        employees.push(employee);
    }
    localStorage.setItem("employees",JSON.stringify(employees));  
    location.reload();
    location.href="employees.html";
}

function validateMail(mail){
    return mail.includes("@") && mail.includes(".");
}
function validateMobileNumber(contactNo){
    return contactNo.length==10;
}

assignManager=document.getElementById("manager");
assignManager.innerHTML=`<option value="Search" selected disabled hidden>Search</option>`;
for(i=0;i<employees.length;i++){
    assignManager.innerHTML+=`<option value="${employees[i].firstName+" "+employees[i].lastName}">${employees[i].firstName+" "+employees[i].lastName}</option>`
}

function handleChange(elementType){
    const value=document.getElementById(elementType).value;
    jobTitleOptions.innerHTML = "";
    locationOptions.innerHTML = "";
    departmentOptions.innerHTML = "";
    assignManager.innerHTML="";
    let filteredRoles=[];
    let managers=[];
    switch(elementType){
        case "location":
            if(value=="Unassigned")
                filteredRoles=roles;
            else
                filteredRoles=roles.filter(role=>role.location==value);
            break;
        case "jobTitle":
            if(value=="Unassigned")
                filteredRoles=roles;
            else
                filteredRoles=roles.filter(role=>role.name==value);
            break;
        case "department":
            if(value=="Unassigned")
                filteredRoles=roles;
            else
                filteredRoles=roles.filter(role=>role.department==value);
            break;
        default:
            break;
    }
    const uniqueLocations = Array.from(new Set(filteredRoles.map(role => role.location)));
    uniqueLocations.forEach(location => {
        locationOptions.innerHTML += `<option value="${location}">${location}</option>`;
    });
    const uniqueJobTitles = Array.from(new Set(filteredRoles.map(role => role.name)));
    uniqueJobTitles.forEach(jobTitle => {
        jobTitleOptions.innerHTML += `<option value="${jobTitle}">${jobTitle}</option>`;
    });
    const uniqueDepartments = Array.from(new Set(filteredRoles.map(role => role.department)));
    uniqueDepartments.forEach(department => {
        departmentOptions.innerHTML += `<option value="${department}">${department}</option>`;
    });
    for(i=0;i<employees.length;i++){
        for(j=0;j<filteredRoles.length;j++){
            if(employees[i].roleId==filteredRoles[j].id){
                managers.push(employees[i].firstName+" "+employees[i].lastName);
            }
        }
    }
    jobTitleOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    locationOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    departmentOptions.innerHTML += `<option value="Unassigned">Unassigned</option>`;
    for(i=0;i<managers.length;i++){
        assignManager.innerHTML+=`<option value="${managers[i]}">${managers[i]}</option>`
    }
}

function navigateToEmployeesPage(){
    location.href="employees.html";
}

//Code for functionality of ellipse menu in employees page.
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let action;
let empID;
if(urlParams!=null){
    action=urlParams.get('action');
    empID = urlParams.get('id');
    if(action=="View-Details"){
        let employee=employees.find(emp=>emp.empNo==empID);
        document.querySelector(".add-employee-heading").innerHTML="Employee Details";
        displayDefaultData(employee);
        document.querySelector(".add-employee-profile input").setAttribute("disabled",true);
        document.querySelector(".add-employee-profile button").setAttribute("disabled",true);
        document.getElementById("empNo").readOnly=true;
        document.getElementById("firstName").readOnly=true;
        document.getElementById("lastName").readOnly=true;
        document.getElementById("dob").readOnly=true;
        document.getElementById("mail").readOnly=true;
        document.getElementById("contactNo").readOnly=true;
        document.getElementById("joinDate").readOnly=true;
        document.getElementById("location").setAttribute("disabled",true);
        document.getElementById("jobTitle").setAttribute("disabled",true);
        document.getElementById("department").setAttribute("disabled",true);
        document.getElementById("manager").setAttribute("disabled",true);
        document.getElementById("project").setAttribute("disabled",true);
        document.getElementById("submitButton").style.display="none";
    }
}

queryString = window.location.search;
urlParams = new URLSearchParams(queryString);
if(urlParams!=null){
    action=urlParams.get('action');
    empID = urlParams.get('id');
    if(action=="Edit-Employee"){
        employee=employees.find(emp=>emp.empNo==empID);
        document.querySelector(".add-employee-heading").innerHTML="Edit Employee";
        displayDefaultData(employee);
        document.getElementById("empNo").readOnly=true;
        document.getElementById("submitButton").innerHTML="Edit";
    }
}

function displayDefaultData(employee){
    let employeeRole=roles.find(role => role.id==employee.roleId);
    document.getElementById("employeeImage").src=employee.empImage;
    document.getElementById("empNo").value=employee.empNo;
    document.getElementById("firstName").value=employee.firstName;
    document.getElementById("lastName").value=employee.lastName;
    document.getElementById("dob").value=employee.dob;
    document.getElementById("mail").value=employee.mail;
    document.getElementById("contactNo").value=employee.contactNo;
    document.getElementById("joinDate").value=employee.joinDate;
    document.getElementById(`${employeeRole.location}`).selected="true";
    document.getElementById(`${employeeRole.name}`).selected="true";
    document.getElementById(`${employeeRole.department}`).selected="true";
    document.getElementById("manager").value=employee.manager;
    document.getElementById("project").value=employee.project;
}

// Code for functionality of add employee page in role-details.
queryString = window.location.search;
urlParams = new URLSearchParams(queryString);
let roleID;
if(urlParams!=null){
    action=urlParams.get('action');
    roleID = urlParams.get('id');
    if(action=="Add-Employee"){
        let role=roles.find(role=>role.id==roleID)
        document.getElementById(`${role.location}`).selected="true";
        document.getElementById(`${role.name}`).selected="true";
        document.getElementById(`${role.department}`).selected="true";  
    }
}

