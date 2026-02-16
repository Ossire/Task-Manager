import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { TaskModel } from '../../models/taskmodel';
import { Taskservice } from '../../services/taskservice';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Loadingcomponent } from '../loadingcomponent/loadingcomponent';
import { Errorpage } from '../errorpage/errorpage';

@Component({
  selector: 'app-taskdetail',
  imports: [DatePipe, AsyncPipe, RouterLink, Loadingcomponent, Errorpage],
  templateUrl: './taskdetail.html',
  styleUrl: './taskdetail.css',
})
export class Taskdetail {
  task$: Observable<TaskModel> | undefined;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage = "sorry, we couldn't load that particlular item";

  private route = inject(ActivatedRoute);
  private taskService = inject(Taskservice);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.isLoading = true;
      this.task$ = this.taskService.getTaskById(id);

      this.task$.subscribe({
        next: () => {
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err) {
            this.isLoading = false;
            this.isError = true;
            err.message = this.errorMessage;
            this.cdr.detectChanges();
          }
        },
      });
    }
  }
}
