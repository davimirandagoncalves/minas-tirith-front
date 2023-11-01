import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private fireAuth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.fireAuth.idToken.pipe(
      take(1),
      switchMap(token => {
        if (!!token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
        }

        return next.handle(request);
      })
    )
  }
}
