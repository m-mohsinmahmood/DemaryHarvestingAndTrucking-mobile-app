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
import { Observable, Subject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OthersService {

  constructor(
    private httpClient: HttpClient,
    private session: AuthService
  ) { }

  getEmployees(search: any, role) {
    let params = new HttpParams();
    params = params.set('entity', 'allEmployees');
    params = params.set('role', role);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getSupervisors(search: any) {
    let params = new HttpParams();
    params = params.set('entity', 'allSupervisors');
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getOthers(data: any, dwr_type: string): Observable<any> {
    data.dwr_type = dwr_type;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .post<any>(`http://api-1/dwr`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  save(data, entity: any) {
    let params = new HttpParams();
    params = params.set('entity', entity);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .post<any>('api-1/other', data, {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
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

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .post<any>(`api-1/dwr`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }
}
