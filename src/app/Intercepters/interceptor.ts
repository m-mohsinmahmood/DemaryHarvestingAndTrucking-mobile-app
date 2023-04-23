/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private AuthService: AuthService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let requestUrl = request.url;
    if (requestUrl.indexOf('api-1') !== -1) {
      requestUrl = requestUrl.replace('api-1', 'http://localhost:7071/api');
      // requestUrl = requestUrl.replace('api-1', 'https://dht-dev.azurewebsites.net/api');
    }

    request = request.clone({
      url: requestUrl,
    });
    // move to next HttpClient request life cycle
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // this.logOut();
          this.refreshToken();
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
  async refreshToken() {
    this.AuthService.refreshToken();
  }
}


