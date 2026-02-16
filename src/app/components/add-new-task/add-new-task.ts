import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { TaskModel } from '../../models/taskmodel';
import { FormsModule, NgForm } from '@angular/forms';
import { Taskservice } from '../../services/taskservice';

@Component({
  selector: 'app-add-new-task',
  imports: [FormsModule],
  templateUrl: './add-new-task.html',
  styleUrl: './add-new-task.css',
})
export class AddNewTask {
  taskService = inject(Taskservice);
  cdr = inject(ChangeDetectorRef);

  isSubmitting: boolean = false;
  successMessage = false;

  newTask: TaskModel = {
    title: '',
    description: '',
    priority: 'low',
    dueDate: '',
    createdAt: '',
    completed: false,
  };

  addTask() {
    this.isSubmitting = true;
    this.newTask.createdAt = new Date().toISOString();
    console.log('Task being sent:', JSON.stringify(this.newTask));
    this.taskService.postNewTasks(this.newTask).subscribe({
      next: (data) => {
        this.successMessage = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = false;
          console.log('Toast hidden!');
          this.cdr.detectChanges();
        }, 3000);
        this.isSubmitting = false;
        this.resetForm();
      },
      error: (err) => {
        this.isSubmitting = false;
        alert('Error creating this task');
        this.cdr.detectChanges();
      },
    });
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      priority: 'low',
      dueDate: '',
      createdAt: '',
      completed: false,
    };
  }
}
