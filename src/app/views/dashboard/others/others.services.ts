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
export class OthersService {

  constructor(
    private httpClient: HttpClient,
    private alertSerice: AlertService
  ) {}

  getEmployees(search: any,entityType: any) {
    let params = new HttpParams();
    params = params.set('entity', 'employeeSupervisor');
    params = params.set('entityType', entityType);
    params = params.set('search', search);
    return this.httpClient
      .get<any>('http://api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
  getOthers(data: any, dwr_type: string): Observable<any> {
    data.dwr_type = dwr_type;
    console.log(data);
    console.log(dwr_type);
    return this.httpClient
        .post<any>(`http://api-1/dwr`,data)
        .pipe(take(1));
  }


}
