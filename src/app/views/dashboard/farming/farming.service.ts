import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { take } from "rxjs/operators";
import { AlertService } from "src/app/alert/alert.service";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class FarmingService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private _httpClient: HttpClient,
    private session: AuthService
  ) { }

  createNewWorkOrder(data: any, role: string, completeInfo: boolean) {
    data.role = role;
    data.completeInfo = completeInfo;

    if (role.includes('Dispatcher')) {
      data.workOrderStatus = 'sent';
      data.workOrderIsCompleted = false;
      data.workOrderCloseOut = false;
    }
    else {
      data.workOrderStatus = 'sent';
      data.workOrderCloseOut = false;
    }

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/work-order-farming`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  createFarmingInvoice(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/customer-invoices`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  updateWorkOrder(data: any, role: string, searchClause?: string) {
    data.role = role;
    data.searchClause = searchClause;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/work-order-farming`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  updateEndingEngineHours(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/work-order-farming`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  createBeginningDay(data: any, dwr_type: String) {
    data.dwr_type = dwr_type;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/dwr`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  closeBeginningDay(data: any, workOrder: any) {
    data.workOrderId = workOrder.work_order_id;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/dwr`, data)
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
    this._httpClient
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
    }
    else {
      return of(null);
    }
  }

  getEmployeesById(
    id: string
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('id', id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/employee', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

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

  getFarms(
    search: string = '',
    customerId: string = '',
    entity: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
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

  getFields(
    search: string = '',
    customerId: string = '',
    farmId: string = '',
    entity: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
    params = params.set('farmId', farmId);
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

  getServices(
    search: string = '',
    customerId: string = '',
    entity: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
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

  getMachinery(
    search: string = '',
    entity: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);
    params = params.set('vehicleType', 'Tractor');

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

  getAllWorkOrders(
    search: string,
    searchClause: string,
    employeeId?: string,
    fieldId?: string,
  ) {
    this._httpClient
    let params = new HttpParams();

    if (fieldId != null)
      params = params.set('fieldId', fieldId);

    params = params.set('search', search);
    params = params.set('searchClause', searchClause);
    params = params.set('employeeId', employeeId);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/work-order-farming', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getBeginningOfDay(
    employeeId: string,
    searchClause: string,
    type: string
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);
    params = params.set('searchClause', searchClause);
    params = params.set('type', type);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getWorkOrderById(
    workOrderId: string
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('work_order_id', workOrderId);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/work-order-farming', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }
}


