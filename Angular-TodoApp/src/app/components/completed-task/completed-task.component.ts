import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TaskListComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.css'
})
export class CompletedTaskComponent implements OnInit{
  completedTasks:Task[]=[];

  constructor(private taskService: TaskService) {}

  currentDate:string = this.taskService.currentDate;

  ngOnInit(): void {
    this.getCompletedTasks();
  }

  getCompletedTasks(): void{
    this.taskService.getCompletedTasks().subscribe({
      next:t=>{
        this.completedTasks=t.map(obj=>new Task(obj));
      },
      error:(errorResponse:any)=>{
        console.log(errorResponse.error);
      },
    });
  }

  updateTaskList(): void{
    this.getCompletedTasks();
  }

}
