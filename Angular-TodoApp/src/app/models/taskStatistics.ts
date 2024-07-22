export class TaskStatistics {
    Percentage: number;
    Category: string;
    constructor(args:any) {
        this.Percentage = args.percentage || args.Percentage || 0;
        this.Category = args.category || args.Category || '';
    }
}