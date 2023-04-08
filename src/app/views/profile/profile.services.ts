/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient,
    private alertSerice: AlertService
  ) {}


  getEmployeeDetailsByFirbaseId(fb_id) {
    let params = new HttpParams();
    params = params.set('fb_id', fb_id);
    return this.httpClient
      .get<any>('api-1/employee', {
        params,
      })
      .pipe(take(1));
  }

}
