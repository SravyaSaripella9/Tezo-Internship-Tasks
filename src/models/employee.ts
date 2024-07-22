import { Status } from "./constants.js";

export class Employee{
    empImage:string;
    empNo:string;
    firstName:string;
    lastName:string;
    dob:Date;
    mail:string;
    contactNo:number;
    joinDate:Date;
    manager:string;
    projectName:string;
    roleId:number;
    status:Status;
    constructor(empImage:string, empNo:string, firstName:string, lastName:string, dob:Date, mail:string, contactNo:number, joinDate:Date, manager:string, projectName:string, roleId:number, status:Status){
        this.empImage=empImage;
        this.empNo=empNo;
        this.firstName=firstName;
        this.lastName=lastName;
        this.dob=dob;
        this.mail=mail;
        this.contactNo=contactNo;
        this.joinDate=joinDate;
        this.manager=manager;
        this.projectName=projectName;
        this.roleId=roleId;
        this.status=status;
    }
}