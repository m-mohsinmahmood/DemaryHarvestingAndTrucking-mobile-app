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
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DWRService {
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private httpClient: HttpClient,
    private alertSerice: AlertService
  ) {}

  getDWR(employeeId: string, date: any,
    role: any,type: any, status: any) {
    let params = new HttpParams();
    params = params.set('operation','getDWRToVerify');
    params = params.set('employeeId', employeeId);
    params = params.set('date', date);
    params = params.set('dateType', 'day');
    params = params.set('role', role);
    params = params.set('type', type);
    params = params.set('status', status);

    return this.httpClient
      .get<any>('api-1/dwr', {
        params,
      })
      .pipe(take(1));
  }
  getDWRNew(employeeId: string, startDate: string, endDate: string,
    role: any,type: any, status: any) {
    let params = new HttpParams();
    params = params.set('operation','getDWRToVerify');
    params = params.set('employeeId', employeeId);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    params = params.set('dateType', 'day');
    params = params.set('role', role);
    params = params.set('type', type);
    params = params.set('status', status);

    return this.httpClient
      .get<any>('api-1/dwr', {
        params,
      })
      .pipe(take(1));
  }
  getMonthDWR(employeeId: string, month: any, year: any) {
    let params = new HttpParams();
    params = params.set('operation','getDWRToVerify');
    params = params.set('employeeId', employeeId);
    params = params.set('dateType', 'month');
    params = params.set('month', month);
    params = params.set('year', year);
    // params = params.set('role', role);
    // params = params.set('type', type);

    return this.httpClient
      .get<any>('api-1/dwr', {
        params,
      })
      .pipe(take(1));
  }
  verify(operation: any,employeeId: any,dateType,startDate,month,year,endDate){
    let params = new HttpParams();
    params = params.set('operation',operation);
    params = params.set('dateType',dateType);
    // params = params.set('date', date);
    params = params.set('startDate', startDate);
    params = params.set('month', month);
    params =  params.set('year',year);
    params = params.set('endDate', endDate);

    let data;
    data={
      employeeId,
    };

    return this.httpClient
      .patch<any>('api-1/dwr', data,{
        params
      })
      .pipe(take(1));
  }
  reassignDWR(operation: any,id,login_time,logout_time, supervisorNotes, employeeNotes){
    let params = new HttpParams();
    params = params.set('operation',operation);
    params = params.set('id',id);
    params = params.set('login_time',login_time);
    params = params.set('logout_time',logout_time);
    params = params.set('supervisor_notes',supervisorNotes);
    params = params.set('employee_notes',employeeNotes);

    let data;

    return this.httpClient
      .patch<any>('api-1/dwr',data,{
        params,
      })
      .pipe(take(1));
  }
  getDWRById(id: string, operation: string,dwr_type, employee_id: any, type: any) {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('taskId', id);
    params = params.set('dwr_type', dwr_type);
    params = params.set('employeeId', employee_id);
    params = params.set('type', type);

    return this.httpClient
      .get<any>('api-1/dwr', {
        params,
      })
      .pipe(take(1));
  }
  getJobById(job_id: any){
    let params = new HttpParams();
    params = params.set('job_id',job_id);
    return this.httpClient
    .get<any>('api-1/customer-job-setup', {
      params,
    })
    .pipe(take(1));
  }
  getWordOrderById(work_order_id: any){
    let params = new HttpParams();
    params = params.set('work_order_id',work_order_id);
    return this.httpClient
    .get<any>('api-1/work-order-farming', {
      params,
    })
    .pipe(take(1));
  }
  getMainenanceRepairTicketById(main_repair_ticket_id: any){
    let params = new HttpParams();
    params = params.set('ticket_record_id',main_repair_ticket_id);
    params = params.set('entity','completedTicket');

    return this.httpClient
    .get<any>('api-1/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  gettrainingRecordById(training_record_id: any){
    let params = new HttpParams();
    params = params.set('record_id',training_record_id);
    return this.httpClient
    .get<any>('api-1/training', {
      params,
    })
    .pipe(take(1));
  }
  getDWRDetails(employee_id,date,operation,dateType, status){
    let params = new HttpParams();
    params = params.set('operation',operation);
    params = params.set('employeeId',employee_id);
    params = params.set('date',date); // (comment)
    params = params.set('startDate',moment(date).startOf('day').toISOString(),);
    params = params.set('endDate',moment(date).endOf('day').toISOString());
    params = params.set('dateType',dateType);
    params = params.set('status',status);
    return this.httpClient
    .get<any>('api-1/dwr', {
      params,
    })
    .pipe(take(1));
  }
  getDWRDetailsWithStatus(operation,date,dateType,employee_id,status){
    let params = new HttpParams();
    params = params.set('operation',operation);
    // params = params.set('date',date); // (comment)
    params = params.set('startDate',moment(date).startOf('day').toISOString(),);
    params = params.set('endDate',moment(date).endOf('day').toISOString());
    params = params.set('dateType',dateType);
    params = params.set('employeeId',employee_id);
    params = params.set('status',status);
    return this.httpClient
    .get<any>('api-1/dwr', {
      params,
    })
    .pipe(take(1));
  }

}
