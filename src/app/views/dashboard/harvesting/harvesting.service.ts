/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
// import { ApplicantPagination, Applicant } from 'app/modules/admin/apps/applicants/applicants.types';
// import { applicantNavigationLeft,applicantNavigationRight } from './applicantnavigation';
import {  take, tap } from 'rxjs/operators';

// import { map } from 'rxjs';
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
    private _httpClient: HttpClient
  ){}


getApplicants(
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
      .pipe(take(1))
      .subscribe(
          (res: any) => {
             console.log('res',res);
          },
          (err) => {
              console.log('error,',err);
          }
      );
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
