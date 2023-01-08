import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AlertService } from "src/app/alert/alert.service";

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
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('status', status);
    params = params.set('search', search);

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getEmployees(
    search: string = '',
    entity: string = '',
    role: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('role', role);
    params = params.set('search', search);

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  createNewDeliveryTicket(data: any, role: string, truckingType: string, ticketStatus: string) {
    data.role = role;

    data.ticketStatus = ticketStatus;
    data.truckingType = truckingType

    return this._httpClient
      .post(`http://localhost:7071/api/delivery_ticket_trucking`, data)
      .pipe(take(1));
  }

  updateDeliveryTicket(data: any, ticketStatus: string) {
    data.ticketStatus = ticketStatus;

    return this._httpClient
      .patch(`http://localhost:7071/api/delivery_ticket_trucking`, data)
      .pipe(take(1));
  }

  getDeliveryTickets(
    role: string,
    ticketStatus: string,
    employeeId?: string,
    truckingType?: string
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('role', role);
    params = params.set('ticketStatus', ticketStatus);
    params = params.set('employeeId', employeeId);
    params = params.set('truckingType', truckingType);

    return this._httpClient
      .get<any>('http://localhost:7071/api/delivery_ticket_trucking', {
        params,
      })
      .pipe(take(1));
  }

  getTruckingRates(
    entity: string,
    customerId?: string
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getTruck(
    search: string = '',
    entity: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
}
