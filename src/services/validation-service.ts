import { Employee } from "../models/employee.js";

export function validateMail(mail: string): boolean {
    return mail.includes("@") && mail.includes(".");
}

export function validateMobileNumber(contactNo: number): boolean {
    return contactNo.toString().length == 10;
}

export function isEmpNoUnique(id:string,employees:Employee[]):boolean{
    for(let i:number=0;i<employees.length;i++){
        if(id==employees[i].empNo){
            return false;
        }
    }
    return true;
}