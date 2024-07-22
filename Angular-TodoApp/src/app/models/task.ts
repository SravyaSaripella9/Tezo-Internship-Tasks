export class Task {
    Id: number=0;
    Title: string='';
    Description: string='';
    IsCompleted: boolean=false;
    CreatedOn: Date;
    TaskDate: Date;
    CompletedOn: Date | undefined;
    constructor(args:any) {
        this.Id = args.id || args.Id || 0;
        this.Title = args.title || args.Title || '';
        this.Description = args.description || args.Description || '';
        this.IsCompleted = args.isCompleted || args.IsCompleted || false;
        this.CreatedOn = args.createdOn || args.CreatedOn || new Date();
        this.TaskDate = args.taskDate || args.TaskDate || new Date();
        this.CompletedOn = args.completedOn || args.CompletedOn;
    }
}