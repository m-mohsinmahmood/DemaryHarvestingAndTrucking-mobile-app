/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TruckingService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private _httpClient: HttpClient,
    private session: AuthService
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

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
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

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  createNewDeliveryTicket(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/delivery_ticket_trucking`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  createNewDeliveryTicketCommercial(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/delivery_ticket_trucking`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getNewDeliveryTicketById(id) {
    let params = new HttpParams();
    params = params.set('id', id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/delivery_ticket_trucking`, {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getCrops(search: string = '', entity: string = '', customerId: string = '') {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/dropdowns`, {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  updateDeliveryTicket(data: any, ticketStatus: string) {
    data.ticketStatus = ticketStatus;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/delivery_ticket_trucking`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  createDWR(data: any, dwr_type: String) {
    data.dwr_type = dwr_type;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/dwr`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  updateDWR(data: any, dwr_type: String) {
    data.dwr_type = dwr_type;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/dwr`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getMotorizedVehicles(
    id: string
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('id', id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/motorized-vehicles', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
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

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/delivery_ticket_trucking', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getTruckingRates(
    entity: string,
    customerId?: string
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
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

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }
}
