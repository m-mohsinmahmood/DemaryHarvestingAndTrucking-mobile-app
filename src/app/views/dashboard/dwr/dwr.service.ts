import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class DWRService {

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  constructor(
    private httpClient: HttpClient,
    private alertSerice: AlertService
  ) { }

  getDWR(
    employeeId: string,
    searchClause: string,
    date: any
  ) {
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);
    params = params.set('searchClause', searchClause);
    params = params.set('date', date);

    return this.httpClient
      .get<any>('http://localhost:7071/api/dwr', {
        params,
      })
      .pipe(take(1));
  }
}


