import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Taskservice } from '../../services/taskservice';
import { TaskModel } from '../../models/taskmodel';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddNewTask } from '../add-new-task/add-new-task';
import { TaskHighlightDirective } from '../../task-highlighter';
import { Errorpage } from '../errorpage/errorpage';
import { Loadingcomponent } from '../loadingcomponent/loadingcomponent';

@Component({
  selector: 'app-tasklist',
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink,
    AddNewTask,
    Errorpage,
    Loadingcomponent,
    TaskHighlightDirective,
  ],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css',
})
export class Tasklist implements OnInit {
  tassk$;
  isError: boolean = false;
  isLoading: boolean = false;

  errMessage: string = 'Sorry, could not load your tasks';

  constructor(
    private taskService: Taskservice,
    private cdr: ChangeDetectorRef,
  ) {
    this.tassk$ = this.taskService.$task;
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        console.log('Sucess');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        //console.log(' ERROR - Error received:', err);
        this.isLoading = false;
        this.isError = true;
        err.message = this.errMessage;
        this.cdr.detectChanges();
      },
    });
  }

  toggleCompletion(task: TaskModel) {
    task.completed = !task.completed;
    this.taskService.makeTaskComplete(task).subscribe({
      next: (updatedTask) => {
        console.log('Task updated successfully:', updatedTask);
      },
      error: (err) => {
        alert(err.message);
        task.completed = !task.completed;
      },
    });
  }

  deleteTask(task: TaskModel) {
    this.taskService.deleteTask(task).subscribe({
      next: (data) => console.log(`Deleted ${data.title} succesfully`),
      error: (err) => alert(err.message),
    });
  }
}
