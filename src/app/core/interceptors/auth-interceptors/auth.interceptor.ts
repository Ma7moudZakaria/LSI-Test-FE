import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../../interfaces/user-interfaces/iuser';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  currentUser: Iuser | undefined; 
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}') as Iuser;

    if (this.currentUser) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + this.currentUser.token),
      });
    }

    // if (!request.headers.has("Content-Type")) {
    //   request = request.clone({
    //     headers: request.headers.set("Content-Type", "application/json"),
    //   });
    // }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });

    request = request.clone({
      withCredentials: true
    });

    console.log(request);
    return next.
    handle(request);
  }
}
