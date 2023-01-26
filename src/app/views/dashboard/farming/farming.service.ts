import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AlertService } from "src/app/alert/alert.service";

@Injectable({
  providedIn: 'root',
})
export class FarmingService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private _httpClient: HttpClient,
    private alertSerice: AlertService
  ) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
      this.alertSerice.showAlert({
        type: 'error',
        shake: false,
        slideRight: true,
        title: 'Error',
        message: error.error.message,
        time: 6000,
      });
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.alertSerice.showAlert({
        type: 'error',
        shake: false,
        slideRight: true,
        title: 'Error',
        message: error.error.message,
        time: 6000,
      });
    }
  }


  createNewWorkOrder(data: any, role: string, completeInfo: boolean) {
    data.role = role;
    data.completeInfo = completeInfo;

    if (role === 'dispatcher') {
      data.workOrderStatus = 'sent';
      data.workOrderIsCompleted = false;
      data.workOrderCloseOut = false;
    }
    else {
      data.workOrderStatus = 'sent';
      data.workOrderCloseOut = false;
    }

    return this._httpClient
      .post(`http://localhost:7071/api/work-order-farming`, data)
      .pipe(take(1));
  }

  updateWorkOrder(data: any, role: string, searchClause?: string) {
    data.role = role;
    data.searchClause = searchClause;

    return this._httpClient
      .patch(`http://localhost:7071/api/work-order-farming`, data)
      .pipe(take(1));
  }

  createBeginningDay(data: any, dwr_type: String) {
    data.dwr_type = dwr_type;

    return this._httpClient
      .post(`http://localhost:7071/api/dwr`, data)
      .pipe(take(1));
  }

  closeBeginningDay(data: any, workOrder: any) {
    data.workOrderId = workOrder.work_order_id;

    return this._httpClient
      .patch(`http://localhost:7071/api/dwr`, data)
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

  getEmployeesById(
    id: string
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('id', id);

    return this._httpClient
      .get<any>('http://localhost:7071/api/employee', {
        params,
      })
      .pipe(take(1));
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

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
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

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
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

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
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

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
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

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getAllWorkOrders(
    search: string,
    searchClause: string,
    employeeId?: string
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('search', search);
    params = params.set('searchClause', searchClause);
    params = params.set('employeeId', employeeId);

    return this._httpClient
      .get<any>('http://localhost:7071/api/work-order-farming', {
        params,
      })
      .pipe(take(1));
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

    return this._httpClient
      .get<any>('http://localhost:7071/api/dwr', {
        params,
      })
      .pipe(take(1));
  }
}


