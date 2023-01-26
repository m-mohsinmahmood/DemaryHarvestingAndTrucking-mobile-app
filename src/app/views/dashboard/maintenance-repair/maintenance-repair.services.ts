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
export class MaintenanceRepairService {

  constructor(
    private httpClient: HttpClient,
    private alertSerice: AlertService
  ) {}

  getEmployees(search: any,entityType: any) {
    let params = new HttpParams();
    params = params.set('entity', 'allEmployees');
    params = params.set('entityType', entityType);
    params = params.set('search', search);
    return this.httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
  getMachinery(
    search: string = '',
    entity: string = '',
  ) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);

    return this.httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
  getEmployeeById(employee_id: any){
    let params = new HttpParams();
    params = params.set('employee_id',employee_id);
    params = params.set('entity','getEmployeeById');
    return this.httpClient
    .get<any>('http://localhost:7071/api/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getTicketsById(employee_id: any,entity: any){
    let params = new HttpParams();
    params = params.set('employee_id',employee_id);
    params = params.set('entity',entity);
    return this.httpClient
    .get<any>('http://localhost:7071/api/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getTicketRecordById(ticket_record_id: any,ticketRecord: any){
    let params = new HttpParams();
    params = params.set('ticket_record_id',ticket_record_id);
    params = params.set('entity',ticketRecord);
    return this.httpClient
    .get<any>('http://localhost:7071/api/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getRepairMaintenanceTickets(employee_id: any,entity: any){
    let params = new HttpParams();
    params = params.set('employee_id',employee_id);
    params = params.set('entity',entity);
    return this.httpClient
    .get<any>('http://localhost:7071/api/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  save(data, entity: any){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    return this.httpClient
    .post<any>('http://localhost:7071/api/main_repair', data,{
      params
    })
    .pipe(take(1));
  }
  assignTicket(data, ticketRecordId: any){
    let params=  new HttpParams();
    params = params.set('ticketRecordId', ticketRecordId);
    return this.httpClient
    .patch<any>('http://localhost:7071/api/main_repair', data,{
      params
    })
    .pipe(take(1));
  }


}
