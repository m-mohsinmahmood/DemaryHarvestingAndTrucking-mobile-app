/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';

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

  getDWR(employeeId: string, date: any) {
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);
    params = params.set('dateType', 'day');
    params = params.set('date', date);

    return this.httpClient
      .get<any>('http://localhost:7071/api/dwr', {
        params,
      })
      .pipe(take(1));
  }
  getDWRById(id: string) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.httpClient
      .get<any>('http://localhost:7071/api/dwr', {
        params,
      })
      .pipe(take(1));
  }
  getJobById(job_id: any){
    let params = new HttpParams();
    params = params.set('job_id',job_id);
    return this.httpClient
    .get<any>('http://localhost:7071/api/customer-job-setup', {
      params,
    })
    .pipe(take(1));
  }
  getWordOrderById(work_order_id: any){
    let params = new HttpParams();
    params = params.set('work_order_id',work_order_id);
    return this.httpClient
    .get<any>('http://localhost:7071/api/work-order-farming', {
      params,
    })
    .pipe(take(1));
  }
  getMainenanceRepairTicketById(main_repair_ticket_id: any){
    let params = new HttpParams();
    params = params.set('ticket_record_id',main_repair_ticket_id);
    params = params.set('entity','completedTicket');

    return this.httpClient
    .get<any>('http://localhost:7071/api/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  gettrainingRecordById(training_record_id: any){
    let params = new HttpParams();
    params = params.set('record_id',training_record_id);
    return this.httpClient
    .get<any>('http://localhost:7071/api/training', {
      params,
    })
    .pipe(take(1));
  }
  getMonthDWR(employeeId: string, month: any, year: any) {
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);
    params = params.set('dateType', 'month');
    params = params.set('month', month);
    params = params.set('year', year);
    return this.httpClient
      .get<any>('http://localhost:7071/api/dwr', {
        params,
      })
      .pipe(take(1));
  }
}
