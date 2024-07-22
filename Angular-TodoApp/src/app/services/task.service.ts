import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { AddTaskModel } from '../models/addTaskModel';
import { TaskStatistics } from '../models/taskStatistics';
import { Constants } from '../models/constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  day: any = new Date().getDay();
  date: number = new Date().getDate();
  month = new Date().getMonth();
  year: number = new Date().getFullYear();
  currentDate: string = `${Constants.weekDays[this.day]}, ${this.date} ${Constants.months[this.month]} ${this.year}`;

  constructor(private api: ApiService) { }

  getAllTasks(): Observable<Task[]> {
    return this.api.get('GetAllTasks');
  }

  getActiveTasks(): Observable<Task[]> {
    return this.api.get('GetActiveTasks');
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.api.get('GetCompletedTasks');
  }

  getPendingTasks(): Observable<Task[]> {
    return this.api.get('GetPendingTasks');
  }

  getStatsitics(): Observable<TaskStatistics[]> {
    return this.api.get('GetStatistics');
  }

  addTask(task: AddTaskModel): Observable<string> {
    return this.api.post('AddTask', task);
  }

  updateTask(id: number, task: Task): Observable<object> {
    return this.api.put('UpdateTask', id, task);
  }

  updateTaskStatus(id: number, task: Task): Observable<object>{
    return this.api.put('UpdateTaskStatus', id, task);
  }

  deleteTask(id: number): Observable<object> {
    return this.api.delete('DeleteTask', id);
  }

  deleteAllTasks(): Observable<object> {
    return this.api.deleteAll('DeleteAllTasks');
  }
}
