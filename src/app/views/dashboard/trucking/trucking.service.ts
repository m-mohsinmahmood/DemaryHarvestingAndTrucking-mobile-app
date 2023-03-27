/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class TruckingService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private _httpClient: HttpClient,
    private alertSerice: AlertService
  ) { }

  getCustomers(
    search: string = '',
    status: string = '',
    entity: string = '',
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('status', status);
    params = params.set('search', search);

    return this._httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getEmployees(
    search: string = '',
    entity: string = '',
    role: string = '',
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('role', role);
    params = params.set('search', search);

    return this._httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  createNewDeliveryTicket(data: any) {
    return this._httpClient
      .post(`api-1/delivery_ticket_trucking`, data)
      .pipe(take(1));
  }

  createNewDeliveryTicketCommercial(data: any) {
    return this._httpClient
      .post(`api-1/delivery_ticket_trucking`, data)
      .pipe(take(1));
  }

  getNewDeliveryTicketById(id) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this._httpClient
      .get(`api-1/delivery_ticket_trucking`, {
        params
      })
      .pipe(take(1));
  }

  getCrops(search: string = '', entity: string = '', customerId: string = '') {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
    params = params.set('search', search);

    return this._httpClient
      .get(`api-1/dropdowns`, {
        params,
      })
      .pipe(take(1));
  }

  updateDeliveryTicket(data: any, ticketStatus: string) {
    data.ticketStatus = ticketStatus;

    return this._httpClient
      .patch(`api-1/delivery_ticket_trucking`, data)
      .pipe(take(1));
  }

  createDWR(data: any, dwr_type: String) {
    data.dwr_type = dwr_type;

    return this._httpClient
      .post(`api-1/dwr`, data)
      .pipe(take(1));
  }

  updateDWR(data: any, dwr_type: String) {
    data.dwr_type = dwr_type;

    return this._httpClient
      .patch(`api-1/dwr`, data)
      .pipe(take(1));
  }

  getMotorizedVehicles(
    id: string
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient
      .get<any>('api-1/motorized-vehicles', {
        params,
      })
      .pipe(take(1));
  }

  getDeliveryTickets(
    role: string,
    ticketStatus: string,
    employeeId?: string,
    truckingType?: string,
    isTicketInfoComplete?: boolean,
    isTicketActive?: boolean,
    isPreCHeckFilled?: boolean
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('role', role);
    params = params.set('ticketStatus', ticketStatus);
    params = params.set('employeeId', employeeId);
    params = params.set('truckingType', truckingType);

    if (isTicketInfoComplete != null) { params = params.set('isTicketInfoComplete', isTicketInfoComplete); }

    if (isTicketActive != null) { params = params.set('isTicketActive', isTicketActive); }

    if (isPreCHeckFilled != null) { params = params.set('isPreCheckFilled', isPreCHeckFilled); }

    return this._httpClient
      .get<any>('api-1/delivery_ticket_trucking', {
        params,
      })
      .pipe(take(1));
  }

  getTruckingRates(
    entity: string,
    customerId?: string
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);

    return this._httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getTruck(
    search: string = '',
    entity: string = '',
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);
    params = params.set('vehicleType', 'Truck');

    return this._httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
}
