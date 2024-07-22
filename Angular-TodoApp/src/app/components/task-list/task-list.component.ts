import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks!: Task[];
  @Input() status!: string;
  cardDetails: number | null = null;
  @Output() onEdit = new EventEmitter<Task>();
  currentTime!: Date;
  createdTimeDifference: string = "";
  completedTimeDifference: string = "";
  @Output() updateTaskListEvent = new EventEmitter<string>;
  isConfirm: boolean = false;

  constructor(private taskService: TaskService) { }

  displayCardDetails(index: number, createdTime: Date, completedTime: Date | undefined) {
    if (completedTime == undefined)
      this.createdTimeDifference = this.calculateTimeDifference(createdTime);
    if (completedTime != undefined)
      this.completedTimeDifference = this.calculateTimeDifference(completedTime);
    this.cardDetails = this.cardDetails == index ? null : index;
  }

  calculateTimeDifference(time: Date): string {
    time = new Date(time);
    let timeDiffInMilliSeconds: number = Math.abs(Date.now() - time.valueOf());
    let timeDiffInMinutes: number = Math.floor(timeDiffInMilliSeconds / (1000 * 60));
    let timeDiffInHours: number = Math.floor(timeDiffInMinutes / 60);
    let timeDiffInDays: number = Math.floor(timeDiffInHours / 24);
    if (timeDiffInMinutes < 1)
      return "just now";
    else if (timeDiffInMinutes == 1)
      return `${timeDiffInMinutes} minute ago`;
    else if (timeDiffInMinutes <= 60)
      return `${timeDiffInMinutes} minutes ago`;
    else if (timeDiffInHours == 1)
      return `${timeDiffInHours} hour ago`;
    else if (timeDiffInHours <= 24)
      return `${timeDiffInHours} hours ago`;
    else if (timeDiffInDays == 1)
      return `${timeDiffInDays} day ago`;
    else
      return `${timeDiffInDays} days ago`;
  }

  markAsCompleted(task: Task): void {
    this.isConfirm = window.confirm("Are you sure to mark the task as completed?");
    if(this.isConfirm){
      task.IsCompleted = true;
      this.taskService.updateTaskStatus(task.Id, task).subscribe({
        next: t => {
          console.log("Task marked as completed");
          this.updateTaskListEvent.emit();
        },
        error: (errorResponse: any) => {
          console.log(errorResponse.error);
        },
      });
    }
  }

  markAsIncomplete(task: Task): void{
    this.isConfirm = window.confirm("Are you sure to mark the task as incomplete?");
    if(this.isConfirm){
      task.IsCompleted = false;
      this.taskService.updateTaskStatus(task.Id, task).subscribe({
        next: t => {
          console.log("Task marked as incomplete");
          this.updateTaskListEvent.emit();
        },
        error: (errorResponse: any) => {
          console.log(errorResponse.error);
        },
      });
    }
  }

  openEditTaskPopup(task: Task): void {
    this.onEdit.emit(task);
  }

  deleteTask(id: number): void {
    this.isConfirm = window.confirm("Do you want to proceed with deleting the task?");
    if(this.isConfirm){
      this.taskService.deleteTask(id).subscribe({
        next: t => {
          console.log("Task deleted successfully");
          this.updateTaskListEvent.emit();
        },
        error: (errorResponse: any) => {
          console.log(errorResponse.error);
        },
      });
    }
  }

}
