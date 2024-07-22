import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ActiveTaskComponent } from '../active-task/active-task.component';
import { Task } from '../../models/task';
import { HeaderComponent } from '../header/header.component';
import { CompletedTaskComponent } from '../completed-task/completed-task.component';
import { MediaService } from '../../services/media.service';
import { PendingTaskComponent } from '../pending-task/pending-task.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideNavComponent, HeaderComponent, AddTaskComponent, ActiveTaskComponent, CompletedTaskComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  isAddTaskPopupVisible: boolean = false;
  isEditTaskPopupVisible: boolean = false;
  taskToBeEdited: Task = new Task({ id: 0, title: '', description: '', isCompleted: false });
  @Output() editEmitter = new EventEmitter<void>();
  mediaType: string = "";

  constructor(private router: Router, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.mediaType = this.mediaService.onResize();
  }

  subscribeToEmitter(componentRef: any): void {
    if (componentRef instanceof ActiveTaskComponent){
      const child: ActiveTaskComponent = componentRef;
      child.onEditTaskEvent.subscribe((task: Task) => {
        this.taskToBeEdited = task;
        this.isEditTaskPopupVisible = true;
        this.editEmitter.emit();
      })
    }
    else if(componentRef instanceof PendingTaskComponent){
      const child: PendingTaskComponent = componentRef;
      child.onEditTaskEvent.subscribe((task: Task) => {
        this.taskToBeEdited = task;
        this.isEditTaskPopupVisible = true;
        this.editEmitter.emit();
      })
    }
    return;
  }

  showAddTaskPopup(): void {
    this.taskToBeEdited = new Task({ id: 0, title: '', description: '', isCompleted: false });
    this.isAddTaskPopupVisible = true;
  }

  hideAddTaskPopup(): void {
    this.isAddTaskPopupVisible = false;
  }

  hideEditTaskPopup(): void {
    this.isEditTaskPopupVisible = false;
  }

  navigateTo(event: Event): void {
    if (event)
      this.router.navigate([(event.target as HTMLSelectElement).value]);
  }
  
}