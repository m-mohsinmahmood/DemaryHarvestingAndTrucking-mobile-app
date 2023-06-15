/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DWRService {
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private httpClient: HttpClient,
    private session: AuthService
  ) { }

  getDWR(employeeId: string, date: any,
    role: any, type: any, status: any) {
    let params = new HttpParams();
    params = params.set('operation', 'getDWRToVerify');
    params = params.set('employeeId', employeeId);
    params = params.set('date', date);
    params = params.set('dateType', 'day');
    params = params.set('role', role);
    params = params.set('type', type);
    params = params.set('status', status);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getDWRNew(employeeId: string, startDate: string, endDate: string,
    role: any, type: any, status: any) {
    let params = new HttpParams();
    params = params.set('operation', 'getDWRToVerify');
    params = params.set('employeeId', employeeId);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    params = params.set('dateType', 'day');
    params = params.set('role', role);
    params = params.set('type', type);
    params = params.set('status', status);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getMonthDWR(employeeId: string, month: any, year: any) {
    let params = new HttpParams();
    params = params.set('operation', 'getDWRToVerify');
    params = params.set('employeeId', employeeId);
    params = params.set('dateType', 'month');
    params = params.set('month', month);
    params = params.set('year', year);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  verify(operation: any, employeeId: any, dateType, startDate, month, year, endDate) {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('dateType', dateType);
    params = params.set('startDate', startDate);
    params = params.set('month', month);
    params = params.set('year', year);
    params = params.set('endDate', endDate);

    let data;
    data = {
      employeeId,
    };

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .patch<any>('api-1/dwr', data, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  reassignDWR(operation: any, id, login_time, logout_time, supervisorNotes, employeeNotes) {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('id', id);
    params = params.set('login_time', login_time);
    params = params.set('logout_time', logout_time);
    params = params.set('supervisor_notes', supervisorNotes);
    params = params.set('employee_notes', employeeNotes);

    let data;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .patch<any>('api-1/dwr', data, {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getDWRById(id: string, operation: string, dwr_type, employee_id: any, type: any) {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('taskId', id);
    params = params.set('dwr_type', dwr_type);
    params = params.set('employeeId', employee_id);
    params = params.set('type', type);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getJobById(job_id: any) {
    let params = new HttpParams();
    params = params.set('job_id', job_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/customer-job-setup', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getWordOrderById(work_order_id: any) {
    let params = new HttpParams();
    params = params.set('work_order_id', work_order_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/work-order-farming', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getMainenanceRepairTicketById(main_repair_ticket_id: any) {
    let params = new HttpParams();
    params = params.set('ticket_record_id', main_repair_ticket_id);
    params = params.set('entity', 'completedTicket');

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/main_repair', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  gettrainingRecordById(training_record_id: any) {
    let params = new HttpParams();
    params = params.set('record_id', training_record_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/training', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getDWRDetails(employee_id, date, operation, dateType, status, role) {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('employeeId', employee_id);
    params = params.set('date', date);
    params = params.set('startDate', moment(date).startOf('day').toISOString(),);
    params = params.set('endDate', moment(date).endOf('day').toISOString());
    params = params.set('dateType', dateType);
    params = params.set('status', status);
    params = params.set('role', role);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getDWRDetailsWithStatus(operation, date, dateType, employee_id, status, role) {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('startDate', moment(date).startOf('day').toISOString(),);
    params = params.set('endDate', moment(date).endOf('day').toISOString());
    params = params.set('dateType', dateType);
    params = params.set('employeeId', employee_id);
    params = params.set('status', status);
    params = params.set('role', role);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }
}
