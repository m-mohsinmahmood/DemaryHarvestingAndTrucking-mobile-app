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
      .get<any>('api-1/dropdowns', {
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
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
  getEmployeeById(employee_id: any){
    let params = new HttpParams();
    params = params.set('employee_id',employee_id);
    params = params.set('entity','getEmployeeById');
    return this.httpClient
    .get<any>('api-1/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getTicketsById(employee_id: any,entity: any){
    let params = new HttpParams();
    params = params.set('employee_id',employee_id);
    params = params.set('entity',entity);
    return this.httpClient
    .get<any>('api-1/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getTicketRecordById(ticket_record_id: any,entity){
    let params = new HttpParams();
    params = params.set('ticket_record_id',ticket_record_id);
    params = params.set('entity',entity);
    return this.httpClient
    .get<any>('api-1/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getRepairMaintenanceTickets(employee_id: any,entity: any){
    let params = new HttpParams();
    params = params.set('employee_id',employee_id);
    params = params.set('entity',entity);
    return this.httpClient
    .get<any>('api-1/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getExistingRepairMaintenanceTickets(employee_id: any,entity: any,ticketType: any){
    let params = new HttpParams();
    params = params.set('employee_id',employee_id);
    params = params.set('entity',entity);
    params = params.set('ticketType',ticketType);
    return this.httpClient
    .get<any>('api-1/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  getExistingTicketRecordById(ticket_record_id: any,entity,){
    let params = new HttpParams();
    params = params.set('ticket_record_id',ticket_record_id);
    params = params.set('entity',entity);
    return this.httpClient
    .get<any>('api-1/main_repair', {
      params,
    })
    .pipe(take(1));
  }
  save(data, entity: any){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    return this.httpClient
    .post<any>('api-1/main_repair', data,{
      params
    })
    .pipe(take(1));
  }
  ticket(data, ticketRecordId: any, entity){
    let params=  new HttpParams();
    params = params.set('ticketRecordId', ticketRecordId);
    params = params.set('entity', entity);
    return this.httpClient
    .patch<any>('api-1/main_repair', data,{
      params
    })
    .pipe(take(1));
  }
  // createDWR(employeeId: any, main_repair_ticket_id: any,supervisor_id: any){
  //   const data = {
  //     dwr_type: 'main-repair',
  //     main_repair_ticket_id,
  //     employeeId,
  //     supervisor_id,
  //   };
  //   return this.httpClient
  //     .post<any>(`api-1/dwr`, data)
  //     .pipe(take(1));
  // }
  createDWR(
    employeeId: any,
    ticketRecordId: any,
    supervisor_id: any,
    dwrId){
    let data;

       data = {
        dwr_type: 'main-repair',
        module: 'main-repair',
        employeeId,
        supervisor_id,
        dwrId,
        ticketRecordId
    };
    console.log('DATA:',data);
    return this.httpClient
      .post<any>(`api-1/dwr`, data)
      .pipe(take(1));
  }


}
