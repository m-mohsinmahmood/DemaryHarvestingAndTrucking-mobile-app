import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AlertService } from "src/app/alert/alert.service";

@Injectable({
  providedIn: 'root',
})
export class TripCheckService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private _httpClient: HttpClient,
    private alertSerice: AlertService
  ) { }

  createNewPreTripCheckForm(data: any, category: number, truckNo: string, trailerNo: string, employeeId: string) {
    data.category = category;
    data.truckNo = truckNo;
    data.trailerNo = trailerNo;
    data.employeeId = employeeId;

    return this._httpClient
      .post(`api-1/trip_check_form`, data)
      .pipe(take(1));
  }

  updatePreTripCheckForm(data: any, category: number, id: string) {
    data.category = category;
    data.ticketId = id;

    return this._httpClient
      .patch(`api-1/trip_check_form`, data)
      .pipe(take(1));
  }

  getTrailer(
    search: string = '',
    entity: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);
    params = params.set('vehicleType', 'Trailer');

    return this._httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getActivePreCheckTicket(clause: string, employeeId?: string, id?: string) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('clause', clause);
    params = params.set('employeeId', employeeId);
    params = params.set('id', id);

    return this._httpClient
      .get<any>('api-1/trip_check_form', {
        params,
      })
      .pipe(take(1));
  }

  getPreCheckListAll(employeeId: string, requestType?: string) {
    this._httpClient
    let params = new HttpParams();

    params = params.set('employeeId', employeeId);
    params = params.set('requestType', requestType);

    return this._httpClient
      .get<any>('api-1/trip_check_form', {
        params,
      })
      .pipe(take(1));
  }

  getPreCheckListDay(employeeId: string, startDate,endDate, requestType?: string) {
    this._httpClient
    let params = new HttpParams();

    params = params.set('employeeId', employeeId);
    params = params.set('requestType', requestType);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);

    return this._httpClient
      .get<any>('api-1/trip_check_form', {
        params,
      })
      .pipe(take(1));
  }

  getPreCheckListMonth(employeeId: string, month: any, year: any, requestType?: string) {
    this._httpClient
    let params = new HttpParams();

    params = params.set('employeeId', employeeId);
    params = params.set('requestType', requestType);
    params = params.set('month', month);
    params = params.set('year', year);

    return this._httpClient
      .get<any>('api-1/trip_check_form', {
        params,
      })
      .pipe(take(1));
  }

  getPreCheckListYear(employeeId: string, year: any, requestType?: string) {
    this._httpClient
    let params = new HttpParams();

    params = params.set('employeeId', employeeId);
    params = params.set('requestType', requestType);
    params = params.set('year', year);

    return this._httpClient
      .get<any>('api-1/trip_check_form', {
        params,
      })
      .pipe(take(1));
  }
}
