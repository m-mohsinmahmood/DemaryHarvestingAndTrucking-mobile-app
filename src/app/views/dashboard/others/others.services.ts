/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
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
  ) { }

  getEmployees(search: any, role) {
    let params = new HttpParams();
    params = params.set('entity', 'allEmployees');
    params = params.set('role', role);
    params = params.set('search', search);
    return this.httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getSupervisors(search: any) {
    let params = new HttpParams();
    params = params.set('entity', 'allSupervisors');
    params = params.set('search', search);
    return this.httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getOthers(data: any, dwr_type: string): Observable<any> {
    data.dwr_type = dwr_type;
    return this.httpClient
      .post<any>(`http://api-1/dwr`, data)
      .pipe(take(1));
  }

  save(data, entity: any) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    return this.httpClient
      .post<any>('api-1/other', data, {
        params
      })
      .pipe(take(1));
  }

  createDWR(
    employeeId: any,
    other_record_id: any,
    supervisor_id: any,
    dwrId,
    taskType: any) {
    let data;

    data = {
      dwr_type: 'other',
      module: 'other',
      employeeId,
      supervisor_id,
      dwrId,
      other_record_id,
      taskType
    };
    console.log('DATA:', data);
    return this.httpClient
      .post<any>(`api-1/dwr`, data)
      .pipe(take(1));
  }
}
