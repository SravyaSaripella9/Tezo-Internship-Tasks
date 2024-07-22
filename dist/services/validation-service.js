export function validateMail(mail) {
    return mail.includes("@") && mail.includes(".");
}
export function validateMobileNumber(contactNo) {
    return contactNo.toString().length == 10;
}
export function isEmpNoUnique(id, employees) {
    for (let i = 0; i < employees.length; i++) {
        if (id == employees[i].empNo) {
            return false;
        }
    }
    return true;
}
