/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, throwError } from 'rxjs';
import {  take, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';


import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HarvestingService{
  private jobs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  constructor(
    private _httpClient: HttpClient,
    private alertSerice: AlertService
  ){}

 //#region Error Function
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
  return throwError(errorMessage);
}

//#endregion

getCustomers(
  page: number = 1,
  limit: number = 10,
  sort: string = '',
  order: 'asc' | 'desc' | '' = '',
  search: string = '',
  filters: any = { type: '', status: '' },
) {
  let params = new HttpParams();
  params = params.set('page', page);
  params = params.set('limit', limit);
  params = params.set('search', search);
  params = params.set('sort', sort);
  params = params.set('order', order);
  params = params.set('type', filters.type);
  params = params.set('status', filters.status);
  return this._httpClient
      .get<any>('api-1/customers', {
          params,
      })
      .pipe(take(1));
      // .subscribe(
      //     (res: any) => {
      //        console.log('res',res);
      //     },
      //     (err) => {
      //         console.log('error,',err);
      //     }
      // );
}

createJob(data: any) {
  this._httpClient
      .post(`api-1/customer-job-setup`, data)
      .pipe(take(1))
      .subscribe(
          (res: any) => {
              // this.closeDialog.next(true);
              // this.isLoadingCustomerField.next(false);
              //show notification based on message returned from the api
              this.alertSerice.showAlert({
                  type: 'success',
                  shake: false,
                  slideRight: true,
                  title: 'Success',
                  message: res.message,
                  time: 5000,
              });
          },
          (err) => {
              this.handleError(err);
              // this.closeDialog.next(false);
              // this.isLoadingCustomerField.next(false);
          },
          // () => {
          //     this.getCustomerField(data.customer_id, 1, limit, sort, order, search, filters);
          // }
      );
}

getCustomerFarm(
  customerId: string,
  page: number = 1,
  limit: number = 10,
  sort: string = '',
  order: 'asc' | 'desc' | '' = '',
  search: string = ''
) {
  let params = new HttpParams();
  params = params.set('page', page);
  params = params.set('limit', limit);
  params = params.set('search', search);
  params = params.set('sort', sort);
  params = params.set('order', order);
  return this._httpClient
      .get<any>(`api-1/customer-farm?customerId=${customerId}`, {
          params,
      })
      .pipe(take(1));
      // .subscribe(
      //     (res: any) => {
      //         this.isLoadingCustomerFarmList.next(true);
      //         this.customerFarmList.next(res);
      //         this.isLoadingCustomerFarmList.next(false);
      //     },
      //     (err) => {
      //         this.handleError(err);
      //     }
      // );
}

getCustomerCrops(
  customer_id: string,
  page: number = 1,
  limit: number = 10,
  sort: string = '',
  order: 'asc' | 'desc' | '' = '',
  search: string = '',
  filters: any = { status: '', calendar_year: '' },
) {
  let params = new HttpParams();
  params = params.set('page', page);
  params = params.set('limit', limit);
  params = params.set('search', search);
  params = params.set('sort', sort);
  params = params.set('order', order);
  params = params.set('status', filters.status);
  params = params.set('year', filters.calendar_year);
  return this._httpClient
      .get<any>(`api-1/customer-crop?customerId=${customer_id}`, {
          params,
      })
      .pipe(take(1));
      // .subscribe(
      //     (res: any) => {
      //         this.isLoadingCustomerCropList.next(true);
      //         this.customerCropList.next(res);
      //         this.isLoadingCustomerCropList.next(false);
      //     },
      //     (err) => {
      //         this.handleError(err);
      //     }
      // );
}

getDropdownCustomerCrops(customerId: string, search: string): Observable<any> {
  console.log('DropDownAPICropsCAlled');
  console.log('dd')
  let params = new HttpParams();
  params = params.set('search', search);
  return this._httpClient
      .get<any>(`api-1/dropdowns?entity=customerCrops&customerId=${customerId}`, { params })
      .pipe(take(1));
}

getDropdownCustomerFarms(customerId: string, search: string): Observable<any> {
  console.log('DropDownAPIFarmsCAlled');
  let params = new HttpParams();
  params = params.set('search', search);
  return this._httpClient
      .get<any>(`api-1/dropdowns?entity=customerFarms&customerId=${customerId}`, { params })
      .pipe(take(1));
}

getDropdownCustomerCropsAll(search: string = ''): Observable<any> {
  let params = new HttpParams();
  params = params.set('search', search);
  return this._httpClient
      .get<any>(`api-1/dropdowns?entity=allCrops`, { params })
      .pipe(take(1))
}
}
