import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AddTaskModel } from '../../models/addTaskModel';
import { ResponseDetails } from '../../models/responseDetails';
import { Task } from '../../models/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnChanges {
  @Output() onCloseAddTaskPopupEvent = new EventEmitter<string>();
  @Output() onCloseEditTaskPopupEvent = new EventEmitter<string>();
  @Input() taskToBeEdited!: Task;
  invalidMessage: string = "";
  newTask!: AddTaskModel;
  responseDetails: ResponseDetails = { isSuccess: false, message: "" };
  addOrEditTaskForm = new FormGroup(
    {
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      taskDate: new FormControl()
    }
  );

  constructor(private taskService: TaskService) { }

  ngOnChanges(): void {
    this.addOrEditTaskForm.setValue({
      title: this.taskToBeEdited!.Title,
      description: this.taskToBeEdited!.Description,
      taskDate: this.taskToBeEdited?.TaskDate
    })
  }

  addOrEditTask(task?: Task): void {
    if (task?.Id == 0)
      this.addTask();
    else
      this.editTask(task!);
  }

  addTask(): void {
    var taskDetails = this.addOrEditTaskForm.value;
    if (taskDetails.title == "")
      this.invalidMessage = "Please enter required fields";
    else {
      if (!this.addOrEditTaskForm.invalid) {
        this.invalidMessage = "";
        this.newTask = new AddTaskModel(taskDetails.title!, taskDetails.description!, taskDetails.taskDate);
        this.taskService.addTask(this.newTask).subscribe({
          next: t => {
            this.responseDetails.isSuccess = true;
            this.responseDetails.message = "Task added successfully";
            this.addOrEditTaskForm.reset();
          },
          error: (errorResponse: any) => {
            this.responseDetails.isSuccess = false;
            this.responseDetails.message = errorResponse.error;
            this.addOrEditTaskForm.reset();
          },
        });
      }
    }
  }

  editTask(task: Task): void {
    var taskDetails = this.addOrEditTaskForm.value;
    if (taskDetails.title == "")
      this.invalidMessage = "Please enter required fields";
    else {
      if (!this.addOrEditTaskForm.invalid) {
        this.invalidMessage = "";
        task.Title = <string>taskDetails.title;
        task.Description = <string>taskDetails.description;
        task.TaskDate = <Date>taskDetails.taskDate;
        this.taskService.updateTask(task.Id, task).subscribe({
          next: t => {
            this.responseDetails.isSuccess = true;
            this.responseDetails.message = "Task updated successfully";
            this.addOrEditTaskForm.reset();
          },
          error: (errorResponse: any) => {
            this.responseDetails.isSuccess = false;
            this.responseDetails.message = errorResponse.error;
            this.addOrEditTaskForm.reset();
          },
        });
      }
    }
  }

  closeAddTaskPopup(): void {
    this.onCloseAddTaskPopupEvent.emit();
  }

  closeEditTaskPopup(): void {
    this.onCloseEditTaskPopupEvent.emit();
  }

}