/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
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
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class HarvestingService{
  private customer: BehaviorSubject<any[] | null> =
  new BehaviorSubject(null);
readonly customer$: Observable<any[] | null> =
  this.customer.asObservable();

  private customerLoading: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(true);
readonly customerLoading$: Observable<boolean> =
  this.customerLoading.asObservable();


  constructor(
    private _httpClient: HttpClient,
    private alertSerice: AlertService,
    private toastService: ToastService

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
        search: string = '',
        entity: string = '',
        role: string = '',
) {

  let params = new HttpParams();
  params = params.set('entity', entity);
  params = params.set('role', role);
  params = params.set('search', search);

  return this._httpClient
       .get(`http://localhost:7071/api/dropdowns`, {
        params
       })
       .pipe(take(1));
 }

 getFarms(
  search: string = '',
  entity: string = '',
  customerId: string = '',
) {

let params = new HttpParams();
params = params.set('entity', entity);
params = params.set('customerId', customerId);
params = params.set('search', search);

return this._httpClient
 .get(`http://localhost:7071/api/dropdowns`, {
  params
 })
 .pipe(take(1));
}
getCrops(
  search: string = '',
  entity: string = '',
  customerId: string = '',
) {

let params = new HttpParams();
params = params.set('entity', entity);
params = params.set('customerId', customerId);
params = params.set('search', search);

return this._httpClient
 .get(`http://localhost:7071/api/dropdowns`, {
  params
 })
 .pipe(take(1));
}
getFields(
  search: string = '',
  entity: string = '',
  customerId: string = '',
  farmId: string = '',
) {

let params = new HttpParams();
params = params.set('entity', entity);
params = params.set('customerId', customerId);
params = params.set('search', search);
params = params.set('farmId',farmId);

return this._httpClient
 .get(`http://localhost:7071/api/dropdowns`, {
  params
 })
 .pipe(take(1));
}

createJob(data: any) {
 return this._httpClient
      .post(`http://localhost:7071/api/customer-job-setup`, data)
      .pipe(take(1));
}
getJob() {
  return this._httpClient
       .get(`http://localhost:7071/api/customer-job-setup`)
       .pipe(take(1))
       .subscribe(
        (res: any)=>{
          this.customerLoading.next(true);
         this.customer.next(res.customer_job);
         this.customerLoading.next(false)
       },
       (err)=>{
        this.toastService.presentToast(err,'danger');

       })
 }

startJob(data: any) {
  return this._httpClient
       .post(`http://localhost:7071/api/customer-job-start`, data)
       .pipe(take(1));
 }
 closeJob(data: any) {
  return this._httpClient
       .post(`http://localhost:7071/api/customer-job-close`, data)
       .pipe(take(1));
 }
 closeOutJob(data: any) {
  return this._httpClient
       .post(`http://localhost:7071/api/customer-job-close-out`, data)
       .pipe(take(1));
 }

 changeField(data: any) {
  console.log('Payload Change Field:',data);
  return this._httpClient
       .put(`http://localhost:7071/api/customer-job-setup`, data)
       .pipe(take(1));
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
