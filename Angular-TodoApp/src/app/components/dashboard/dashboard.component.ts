import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { MediaService } from '../../services/media.service';
import { StatisticsComponent } from '../statistics/statistics.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TaskListComponent, StatisticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  noOfActiveTasks: number = 0;
  noOfCompletedTasks: number = 0;
  completedTasksPercentage: number = 0;
  mediaType: string = "";
  nameOfUser: string = "";

  constructor(private userService: UserService, private taskService: TaskService, private mediaService: MediaService) { }

  currentDate: string = this.taskService.currentDate;

  ngOnInit(): void {
    this.mediaType = this.mediaService.onResize();
    this.userService.getUserByUserName().subscribe({
      next: (t: any) => {
        this.nameOfUser = t.firstName;
        console.log(this.nameOfUser);
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      }
    })
    this.taskService.getAllTasks().subscribe({
      next: t => {
        this.tasks = t.map(obj => new Task(obj));
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      },
    });
  }

  deleteAllTasks(): void {
    this.taskService.deleteAllTasks().subscribe({
      next: t => {
        console.log("All tasks deleted successfully");
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      },
    });
  }

}