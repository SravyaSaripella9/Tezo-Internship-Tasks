import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-active-task',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TaskListComponent],
  templateUrl: './active-task.component.html',
  styleUrl: './active-task.component.css'
})
export class ActiveTaskComponent implements OnInit{
  activeTasks: Task[] = [];
  @Output() onEditTaskEvent = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}
  
  currentDate:string = this.taskService.currentDate;

  ngOnInit(): void {
    this.getActiveTasks();
  }

  getActiveTasks(): void{
    this.taskService.getActiveTasks().subscribe({
      next:t=>{
        this.activeTasks=t.map(obj=>new Task(obj));
      },
      error:(errorResponse:any)=>{
        console.log(errorResponse.error);
      },
    });
  }

  openEditTaskPopup(task:Task): void{
    this.onEditTaskEvent.emit(task);
  }

  updateTaskList(): void{
    this.getActiveTasks();
  }
  
}