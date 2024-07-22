import { Component } from '@angular/core';
import { TaskStatistics } from '../../models/taskStatistics';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  statistics: TaskStatistics[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getStatsitics().subscribe({
      next: t => {
        this.statistics = t.map(obj => new TaskStatistics(obj));
      },
      error: (errorResponse: any) => {
        console.log(errorResponse.error);
      },
    });
  }
}
