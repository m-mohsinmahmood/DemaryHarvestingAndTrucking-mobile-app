/* eslint-disable prefer-const */
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class CheckInOutService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private _httpClient: HttpClient,
    private session: AuthService
  ) { }

  createNewDWR(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/dwr_employees`, data)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  updateDWR(id: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/dwr_employees`, id)
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getDWR(employeeId: string) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dwr_employees', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getTicketsPerDwr(operation: string, dwrId: string) {
    this._httpClient
    let params = new HttpParams();

    params = params.set('operation', operation);
    params = params.set('id', dwrId);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dwr_employees', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }
}


