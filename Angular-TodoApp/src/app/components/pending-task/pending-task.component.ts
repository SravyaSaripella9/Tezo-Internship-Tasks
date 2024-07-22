import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-pending-task',
  standalone: true,
  imports: [HeaderComponent, TaskListComponent],
  templateUrl: './pending-task.component.html',
  styleUrl: './pending-task.component.css'
})
export class PendingTaskComponent implements OnInit{
  pendingTasks: Task[] = [];
  @Output() onEditTaskEvent = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getPendingTasks().subscribe({
      next:t=>{
        this.pendingTasks=t.map(obj=>new Task(obj));
      },
      error:(errorResponse:any)=>{
        console.log(errorResponse.error);
      },
    });
  }

  openEditTaskPopup(task:Task): void{
    this.onEditTaskEvent.emit(task);
  }
  
}
