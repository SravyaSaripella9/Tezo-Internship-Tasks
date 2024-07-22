export class AddTaskModel{
    Title: string;
    Description:string;
    TaskDate:Date | null;
    constructor(title:string, description:string, taskDate:Date | null){
        this.Title=title;
        this.Description=description;
        this.TaskDate=taskDate;
    }
}