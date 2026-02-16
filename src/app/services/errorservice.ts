import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  handleError(httperrorresponse: HttpErrorResponse) {
    let errorMessage = 'Something went wrong!';

    if (httperrorresponse.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${httperrorresponse.error.message} `;
    } else {
      switch (httperrorresponse.status) {
        case 400:
          errorMessage = 'Bad Request. Please check your input.';
          break;
        case 401:
          errorMessage = 'You are not logged in!';
          break;
        case 403:
          errorMessage = 'Access denied. You cannot do that.';
          break;
        case 404:
          errorMessage = 'Not found. We could not find that item.';
          break;
        case 500:
          errorMessage = 'Server error. Our robots are fixing it.';
          break;
        default:
          errorMessage = `Error Code: ${httperrorresponse.status}\nMessage: ${httperrorresponse.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
