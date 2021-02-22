import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          this.router.navigate(["/notAuth"]);
        }

        // if (err.status === 0) {
        //   if (this.translate.currentLang == 'ar') {
        //     alert('خطأ فى الاتصال')
        //   } else {
        //     alert('Communicatrion error')
        //   }
        // }

        // if (err.status === 403){
        //     alert('unauthorized, please contact your adminstrator');
        //     this.router.navigate(['/dashboard'])
        // }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
