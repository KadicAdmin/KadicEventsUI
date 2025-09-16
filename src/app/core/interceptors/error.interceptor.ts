import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        if (error.error?.message) {
          errorMessage = error.error.message;
        }

        if (error.error?.errors) {
          // Si errors es un array, hacemos join
          if (Array.isArray(error.error.errors)) {
            errorMessage = error.error.errors.join(', ');
          }
          // Si errors es un objeto, convertimos a string
          else if (typeof error.error.errors === 'object') {
            const errorValues = Object.values(error.error.errors).flat();
            errorMessage = errorValues.join(', ');
          }
          // Si es otra cosa, lo convertimos a string
          else {
            errorMessage = String(error.error.errors);
          }
        }
      }

      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
