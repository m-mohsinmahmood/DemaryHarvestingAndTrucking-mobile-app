/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRepairService {

  constructor(
    private httpClient: HttpClient,
    private alertSerice: AlertService,
    private session: AuthService
  ) { }

  getEmployees(search: any, entityType: any) {
    let params = new HttpParams();
    params = params.set('entity', 'allEmployees');
    params = params.set('entityType', entityType);
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

  getMachinery(
    search: string = '',
    entity: string = '',
  ) {
    let params = new HttpParams();
    params = params.set('entity', entity);
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

  getEmployeeById(employee_id: any) {
    let params = new HttpParams();
    params = params.set('employee_id', employee_id);
    params = params.set('entity', 'getEmployeeById');

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

  getTicketsById(employee_id: any, entity: any) {
    let params = new HttpParams();
    params = params.set('employee_id', employee_id);
    params = params.set('entity', entity);

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

  getTicketRecordById(ticket_record_id: any, entity) {
    let params = new HttpParams();
    params = params.set('ticket_record_id', ticket_record_id);
    params = params.set('entity', entity);

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

  getRepairMaintenanceTickets(employee_id: any, entity: any) {
    let params = new HttpParams();
    params = params.set('employee_id', employee_id);
    params = params.set('entity', entity);

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

  getExistingRepairMaintenanceTickets(employee_id: any, entity: any, ticketType: any) {
    let params = new HttpParams();
    params = params.set('employee_id', employee_id);
    params = params.set('entity', entity);
    params = params.set('ticketType', ticketType);

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

  getExistingTicketRecordById(ticket_record_id: any, entity,) {
    let params = new HttpParams();
    params = params.set('ticket_record_id', ticket_record_id);
    params = params.set('entity', entity);

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

  save(data, entity: any, active_check_in_id) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('dwr_id', active_check_in_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .post<any>('api-1/main_repair', data, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  ticket(data, ticketRecordId: any, entity, active_check_in_id) {
    let params = new HttpParams();
    params = params.set('ticketRecordId', ticketRecordId);
    params = params.set('entity', entity);
    params = params.set('dwr_id', active_check_in_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .patch<any>('api-1/main_repair', data, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  createDWR(
    employeeId: any,
    main_repair_ticket_id: any,
    supervisor_id: any,
    dwrId,
    taskType: any) {
    let data;

    data = {
      dwr_type: 'maintenance-repair',
      module: 'maintenance-repair',
      employeeId,
      supervisor_id,
      dwrId,
      main_repair_ticket_id,
      taskType
    };
    console.log('DATA:', data);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .post<any>(`api-1/dwr`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getAllTickets(entity, ticketType, employee_id) {
    let params = new HttpParams();
    params = params.set('employee_id', employee_id);
    params = params.set('entity', entity);
    params = params.set('ticketType', ticketType);

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
}
