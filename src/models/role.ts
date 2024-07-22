export class Role{
    id:number;
    name:string;
    department:string;
    roleDescription:string;
    location:string;
    constructor(id:number, name:string, department:string, roleDescription:string, location:string){
        this.id=id;
        this.name=name;
        this.department=department;
        this.roleDescription=roleDescription;
        this.location=location;
    }
}