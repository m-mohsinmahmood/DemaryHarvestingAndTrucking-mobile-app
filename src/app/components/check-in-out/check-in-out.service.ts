/* eslint-disable prefer-const */
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { AlertService } from "src/app/alert/alert.service";

@Injectable({
  providedIn: 'root',
})
export class CheckInOutService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private _httpClient: HttpClient,
    private alertSerice: AlertService
  ) { }

  createNewDWR(data: any) {
    return this._httpClient
      .post(`api-1/dwr_employees`, data)
      .pipe(take(1));
  }

  updateDWR(id: any) {
    return this._httpClient
      .patch(`api-1/dwr_employees`, id)
      .pipe(take(1));
  }

  getDWR(employeeId: string) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);

    return this._httpClient
      .get<any>('api-1/dwr_employees', {
        params,
      })
      .pipe(take(1));
  }

  getTicketsPerDwr(operation: string, dwrId: string) {
    this._httpClient
    let params = new HttpParams();

    params = params.set('operation', operation);
    params = params.set('id', dwrId);

    return this._httpClient
      .get<any>('api-1/dwr_employees', {
        params,
      })
      .pipe(take(1));
  }
}


