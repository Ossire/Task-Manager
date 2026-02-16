import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '../models/taskmodel';
import { BehaviorSubject, tap, catchError } from 'rxjs';
import { ErrorService } from './errorservice';

@Injectable({
  providedIn: 'root',
})
export class Taskservice {
  private taskSubject = new BehaviorSubject<TaskModel[]>([]);
  $task = this.taskSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
  ) {}

  private apiUrl = 'http://localhost:3000/tasks';

  getAllTasks() {
    return this.http.get<TaskModel[]>(this.apiUrl).pipe(
      tap((data) => this.taskSubject.next(data)),
      catchError(this.errorService.handleError),
    );
  }

  getTaskById(id: number) {
    return this.http
      .get<TaskModel>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.errorService.handleError));
  }

  postNewTasks(newtask: TaskModel) {
    return this.http.post<TaskModel>(this.apiUrl, newtask).pipe(
      tap((createdTask) => {
        const currentTask = this.taskSubject.getValue();
        this.taskSubject.next([...currentTask, createdTask]);
      }),
      catchError(this.errorService.handleError),
    );
  }

  deleteTask(task: TaskModel) {
    return this.http.delete<TaskModel>(`${this.apiUrl}/${task.id}`).pipe(
      tap(() => {
        const currentTasks = this.taskSubject.getValue();
        const updatedTasks = currentTasks.filter((tsk) => tsk.id !== task.id);
        this.taskSubject.next(updatedTasks);
      }),
      catchError(this.errorService.handleError),
    );
  }

  makeTaskComplete(task: TaskModel) {
    return this.http
      .patch<TaskModel>(`${this.apiUrl}/${task.id}`, { completed: task.completed })
      .pipe(
        tap((updatedTask) => {
          const currentTasks = this.taskSubject.getValue();
          const updatedList = currentTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          );

          this.taskSubject.next(updatedList);
        }),
        catchError(this.errorService.handleError),
      );
  }
}
