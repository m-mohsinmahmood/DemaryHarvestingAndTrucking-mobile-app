/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {  take, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { ToastService } from 'src/app/services/toast/toast.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HarvestingService{
  //#region customers
  private customer: BehaviorSubject<any[] | null> =
  new BehaviorSubject(null);
readonly customer$: Observable<any[] | null> =
  this.customer.asObservable();

  private customerLoading: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(true);
  readonly customerLoading$: Observable<boolean> =
  this.customerLoading.asObservable();

  private customerLoading2: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(true);
  readonly customerLoading2$: Observable<boolean> =
  this.customerLoading2.asObservable();
  //#endregion

  //#region tickets
 private tickets: BehaviorSubject<any[] | null> =
  new BehaviorSubject(null);
  readonly tickets$: Observable<any[] | null> =
  this.tickets.asObservable();

  private ticketsLoading: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(true);
  readonly ticketsLoading$: Observable<boolean> =
  this.ticketsLoading.asObservable();
  //#endregion

  //#region ticket
  private ticket: BehaviorSubject<any[] | null> =
  new BehaviorSubject(null);
readonly ticket$: Observable<any[] | null> =
  this.ticket.asObservable();

  private ticketLoading: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(true);
  readonly ticketLoading$: Observable<boolean> =
  this.ticketLoading.asObservable();
//#endregion

//#region Get Ticket
private sentTicket: BehaviorSubject<any[] | null> =
new BehaviorSubject(null);
readonly sentTicket$: Observable<any[] | null> =
this.sentTicket.asObservable();

private sentTicketLoading: BehaviorSubject<boolean> =
new BehaviorSubject<boolean>(true);
readonly sentTicketLoading$: Observable<boolean> =
this.sentTicketLoading.asObservable();
//#endregion

//#region Pending Ticket
private pendingTicket: BehaviorSubject<any[] | null> =
new BehaviorSubject(null);
readonly pendingTicket$: Observable<any[] | null> =
this.pendingTicket.asObservable();

private pendingTicketLoading: BehaviorSubject<boolean> =
new BehaviorSubject<boolean>(true);
readonly pendingTicketLoading$: Observable<boolean> =
this.pendingTicketLoading.asObservable();
//#endregion

//#region Verified Ticket
private verifiedTicket: BehaviorSubject<any[] | null> =
new BehaviorSubject(null);
readonly verifiedTicket$: Observable<any[] | null> =
this.verifiedTicket.asObservable();

private verifiedTicketLoading: BehaviorSubject<boolean> =
new BehaviorSubject<boolean>(true);
readonly verifiedTicketLoading$: Observable<boolean> =
this.verifiedTicketLoading.asObservable();
//#endregion

unsubscribeBehaviourSubject: BehaviorSubject<any> =
new BehaviorSubject<any>(1);


  constructor(
    private _httpClient: HttpClient,
    private alertSerice: AlertService,
    private toastService: ToastService

  ){
    // console.log('UnSUBSCRIBE:',this._unsubscribeAll);
    // console.log('UnSUBSCRIBE:',this.unsubscribeBehaviourSubject.value);
  }

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
updateJob(data: any) {
  return this._httpClient
       .patch(`http://localhost:7071/api/customer-job-setup`, data)
       .pipe(take(1));
 }

getJob() {
  return this._httpClient
       .get(`http://localhost:7071/api/customer-job-setup`)
       .pipe(take(1))
       .subscribe(
        (res: any)=>{
          this.customerLoading.next(true);
         this.customer.next(res);
         this.customerLoading.next(false)
       },
       (err)=>{
        this.toastService.presentToast(err,'danger');

       })
 }
 getJobTesting(entity) {
  return this._httpClient
       .get(`http://localhost:7071/api/customer-job-setup?entity=${entity}`)
       .pipe(take(1))
       .subscribe(
        (res: any)=>{
          this.customerLoading.next(true);
         this.customer.next(res);
         this.customerLoading.next(false)
       },
       (err)=>{
        console.log('ERR:',err);
        this.toastService.presentToast(err,'danger');

       })
 }
 getJobTesting2(entity,employeeId) {
  return this._httpClient
       .get(`http://localhost:7071/api/customer-job-setup?entity=${entity}&employeeId=${employeeId}`)
       .pipe(take(1))
       .subscribe(
        (res: any)=>{
          this.customerLoading.next(true);
         this.customer.next(res);
         this.customerLoading.next(false)
       },
       (err)=>{
        console.log('ERR:',err);
        this.toastService.presentToast(err,'danger');

       })
 }
 getJob2() {
  return this._httpClient
       .get(`http://localhost:7071/api/customer-job-setup`)
       .pipe(take(1))
       .subscribe(
        (res: any)=>{
          this.customerLoading2.next(true);
         this.customer.next(res);
         this.customerLoading2.next(false)
       },
       (err)=>{
        this.toastService.presentToast(err,'danger');

       })
 }
 getDWR(employeeId,searchClause){
  return this._httpClient
       .get(`http://localhost:7071/api/dwr?employeeId=${employeeId}&searchClause=${searchClause}`)
       .pipe(take(1));
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
       .patch(`http://localhost:7071/api/customer-job-setup`, data)
       .pipe(take(1));
 }

 changeField(data: any) {
  // return this._httpClient
  //      .put(`http://localhost:7071/api/customer-job-setup`, data)
  //      .pipe(take(1));
  return this._httpClient
       .post(`http://localhost:7071/api/customer-job-setup`, data)
       .pipe(take(1));
 }
 closeBeginningDay(data: any) {
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
createTicket(data: any) {
  return this._httpClient
       .post(`http://localhost:7071/api/harvesting-ticket`, data)
       .pipe(take(1));
 }
 getTickets() {
  return this._httpClient
       .get(`http://localhost:7071/api/harvesting-ticket`)
       .pipe(take(1))
       .subscribe((res: any)=>{
        this.ticketsLoading.next(true);
        this.tickets.next(res);
        this.ticketsLoading.next(false);
       },
       (err)=>{
        this.toastService.presentToast(err,'danger');

       }
       )
 }
 getTicketById(id: any,entity: any) {
  return this._httpClient
       .get(`http://localhost:7071/api/harvesting-ticket?id=${id}&entity=${entity}`)
       .pipe(take(1))
       .subscribe((res: any)=>{
        this.ticketLoading.next(true);
        this.ticket.next(res);
        this.ticketLoading.next(false);
   console.log('Response Ticket ID::',res);
      },
       (err)=>{
        this.toastService.presentToast(err,'danger');

       }
       )
 }
 updateTicket(ticketID: any,data: any) {
  return this._httpClient
       .patch(`http://localhost:7071/api/harvesting-ticket?ticket_id=${ticketID}`,data)
       .pipe(take(1));
 }
 getSentTicket(value: any) {
  return this._httpClient
       .get(`http://localhost:7071/api/harvesting-ticket?status=${value}`)
       .pipe(take(1))
       .subscribe((res: any)=>{
        this.sentTicketLoading.next(true);
        this.sentTicket.next(res);
        this.sentTicketLoading.next(false);

      },
       (err)=>{
        this.toastService.presentToast(err,'danger');
       }
       )
 }
 getPendingTicket(value: any) {
  return this._httpClient
       .get(`http://localhost:7071/api/harvesting-ticket?status=${value}`)
       .pipe(take(1))
       .subscribe((res: any)=>{
        this.pendingTicketLoading.next(true);
        this.pendingTicket.next(res);
        this.pendingTicketLoading.next(false);
      },
       (err)=>{
        this.toastService.presentToast(err,'danger');

       }
       )
 }
 getVerifiedTicket(value: any) {
  return this._httpClient
       .get(`http://localhost:7071/api/harvesting-ticket?status=${value}`)
       .pipe(take(1))
       .subscribe((res: any)=>{
        this.verifiedTicketLoading.next(true);
        this.verifiedTicket.next(res);
        this.verifiedTicketLoading.next(false);
      },
       (err)=>{
        this.toastService.presentToast(err,'danger');

       }
       )
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
createBeginingDay(data: any, dwr_type: string): Observable<any> {
  data.dwr_type = dwr_type
  console.log(data);
  console.log(dwr_type)
  return this._httpClient
      .post<any>(`http://localhost:7071/api/dwr`,data)
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

    return this._httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
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
getRoles(combine_operator_id,cart_operator_id, crew_chief_id){
  let params = new HttpParams();
  params = params.set('combine_operator_id', combine_operator_id);
  params = params.set('cart_operator_id', cart_operator_id);
  params = params.set('crew_chief_id', crew_chief_id);
  return this._httpClient
      .get<any>(`http://localhost:7071/api/customer-job-setup`,{
        params
      })
      .pipe(take(1));
}
}
