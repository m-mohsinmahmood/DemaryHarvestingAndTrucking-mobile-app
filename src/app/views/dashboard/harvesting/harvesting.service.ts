/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HarvestingService {
  //#region customers
  private customer: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  readonly customer$: Observable<any[] | null> = this.customer.asObservable();
  private customerJobSetup: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  readonly customerJobSetup$: Observable<any[] | null> = this.customerJobSetup.asObservable();
  private customerJobSetup2: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  readonly customerJobSetup2$: Observable<any[] | null> = this.customerJobSetup2.asObservable();
  private getjob2: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  readonly getjob2$: Observable<any[] | null> = this.getjob2.asObservable();

  private customerLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly customerLoading$: Observable<boolean> =
    this.customerLoading.asObservable();

  private customerLoading2: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly customerLoading2$: Observable<boolean> =
    this.customerLoading2.asObservable();

  private customerJobSetupLoading2: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly customerJobSetupLoading2$: Observable<boolean> =
    this.customerJobSetupLoading2.asObservable();
  //#endregion

  //#region tickets
  private tickets: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  readonly tickets$: Observable<any[] | null> = this.tickets.asObservable();

  private ticketsLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly ticketsLoading$: Observable<boolean> =
    this.ticketsLoading.asObservable();
  //#endregion

  //#region ticket
  private ticket: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  readonly ticket$: Observable<any[] | null> = this.ticket.asObservable();

  private ticketLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly ticketLoading$: Observable<boolean> =
    this.ticketLoading.asObservable();
  //#endregion

  //#region Get Ticket
  private sentTicket: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  readonly sentTicket$: Observable<any[] | null> =
    this.sentTicket.asObservable();

  private sentTicketLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly sentTicketLoading$: Observable<boolean> =
    this.sentTicketLoading.asObservable();
  //#endregion

  //#region Pending Ticket
  private pendingTicket: BehaviorSubject<any[] | null> = new BehaviorSubject(
    null
  );
  readonly pendingTicket$: Observable<any[] | null> =
    this.pendingTicket.asObservable();

  private completedTicket: BehaviorSubject<any[] | null> = new BehaviorSubject(
    null
  );
  readonly completedTicket$: Observable<any[] | null> =
    this.completedTicket.asObservable();

  private pendingTicketLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly pendingTicketLoading$: Observable<boolean> =
    this.pendingTicketLoading.asObservable();
  //#endregion

  private completedTicketLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly completedTicketLoading$: Observable<boolean> =
    this.completedTicketLoading.asObservable();

  //#region Verified Ticket
  private verifiedTicket: BehaviorSubject<any[] | null> = new BehaviorSubject(
    null
  );
  readonly verifiedTicket$: Observable<any[] | null> =
    this.verifiedTicket.asObservable();

  private verifiedTicketLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly verifiedTicketLoading$: Observable<boolean> =
    this.verifiedTicketLoading.asObservable();
  //#endregion

  unsubscribeBehaviourSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    1
  );

  constructor(
    private _httpClient: HttpClient,
    private toastService: ToastService,
    private session: AuthService
  ) {
  }

  updateBeginningOfDayJobSetup(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  updateStartingOfDayJobSetup(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  updateEndingOfDayJobSetup(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getCustomers(search: string = '', entity: string = '', role: string = '') {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('role', role);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/dropdowns`, {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getFarms(search: string = '', entity: string = '', customerId: string = '') {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/dropdowns`, {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getCrops(search: string = '', entity: string = '', customerId: string = '') {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/dropdowns`, {
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
    entity: string = '',
    customerId: string = '',
    farmId: string = ''
  ) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customerId', customerId);
    params = params.set('search', search);
    params = params.set('farmId', farmId);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/dropdowns`, {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  createJob(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getBeginningOfDayHarvesting(
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

  createDWR(
    employeeId: any,
    jobId: any,
    supervisor_id: any,
    dwrId) {

    let data;

    data = {
      dwr_type: 'harvesting-crew-chief',
      module: 'harvesting-crew-chief',
      employeeId,
      supervisor_id,
      dwrId,
      jobId
    };
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post<any>(`api-1/dwr`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getJobSetup(entity, crew_chief_id?, employeeId?) {
    let params = new HttpParams();

    if (employeeId != null) { params = params.set('employeeId', employeeId); }

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient

        .get(
          `api-1/customer-job-setup?entity=${entity}&crew_chief_id=${crew_chief_id}`,
          { params }
        )
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.customerLoading.next(true);
            this.customerJobSetup.next(res);
            this.customerLoading.next(false);
          },
          (err) => {
            console.log('ERR:', err);
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  getKartOperatorCrewChief(entity, employeeId) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(
          `api-1/havesting-kart-operator?operation=${entity}&employeeId=${employeeId}`
        )
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getJobTesting2(entity, employeeId, crew_chief_id) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(
          `api-1/customer-job-setup?entity=${entity}&employeeId=${employeeId}&crew_chief_id=${crew_chief_id}`
        )
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.customerJobSetupLoading2.next(true);
            this.customerJobSetup2.next(res);
            this.customerJobSetupLoading2.next(false);
          },
          (err) => {
            console.log('ERR:', err);
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  getJob2() {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/customer-job-setup`)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.customerLoading2.next(true);
            this.getjob2.next(res);
            this.customerLoading2.next(false);
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  getDWR(employeeId, searchClause) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(
          `api-1/dwr?employeeId=${employeeId}&searchClause=${searchClause}`
        )
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  closeOutJob(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  changeField(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  closeBeginningDay(data: any) {
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

  getEmployees(search: string = '', entity: string = '', role: string = '') {
    this._httpClient;
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

  getCombineCartOperator(search: string = '', operation: string = '', role: string = '') {
    this._httpClient
    let params = new HttpParams();
    params = params.set('search', search);
    params = params.set('operation', operation);
    params = params.set('role', role);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/customer-job-setup', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  createTicket(data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/harvesting-ticket`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getTicketById(id: any, entity: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(
          `api-1/harvesting-ticket?id=${id}&entity=${entity}`
        )
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.ticketLoading.next(true);
            this.ticket.next(res);
            this.ticketLoading.next(false);
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  updateTicket(ticketID: any, data: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(
          `api-1/harvesting-ticket?ticket_id=${ticketID}`,
          data
        )
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  updatePreTripCheckJob(ticketID: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(
          `api-1/customer-job-setup?id=${ticketID}`,
          {}
        )
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getSentTicket(value: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/harvesting-ticket?status=${value}`)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.sentTicketLoading.next(true);
            this.sentTicket.next(res);
            this.sentTicketLoading.next(false);
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  getPendingTicket(value: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/harvesting-ticket?status=${value}`)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.pendingTicketLoading.next(true);
            this.pendingTicket.next(res);
            this.pendingTicketLoading.next(false);
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  getVerifiedTicket(value: any) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/harvesting-ticket?status=${value}`)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.verifiedTicketLoading.next(true);
            this.verifiedTicket.next(res);
            this.verifiedTicketLoading.next(false);
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  createBeginingDay(data: any, dwr_type: string): Observable<any> {
    data.dwr_type = dwr_type;

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post<any>(`api-1/dwr`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getBeginningOfDay(employeeId: string, searchClause: string, type: string, role) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);
    params = params.set('searchClause', searchClause);
    params = params.set('type', type);
    params = params.set('role', role);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/dwr', {
          params,
        })
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.customerLoading.next(true);
            this.customer.next(res);
            this.customerLoading.next(false);
          },
          (err) => {
            console.log('ERR:', err);
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    else {
      return of(null);
    }
  }

  getBeginningOfDay2(employeeId: string, searchClause: string, type: string) {
    let params = new HttpParams();
    params = params.set('employeeId', employeeId);
    params = params.set('searchClause', searchClause);
    params = params.set('type', type);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient.get<any>('api-1/dwr', {
        params,
      }).pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getMachinery(search: string = '', entity: string = '', vehcileType) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);
    params = params.set('vehicleType', vehcileType);

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

  getDeliveryTickets(
    role: string,
    employeeId?: string,
    isTicketActive?: boolean,
    isPreCHeckFilled?: boolean,
    entity?: string
  ) {
    this._httpClient;
    let params = new HttpParams();
    params = params.set('role', role);
    params = params.set('employeeId', employeeId);

    if (isTicketActive != null) { params = params.set('isTicketActive', isTicketActive); }

    if (entity != null) { params = params.set('entity', entity); }

    if (isPreCHeckFilled != null) { params = params.set('isPreCheckFilled', isPreCHeckFilled); }

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/customer-job-setup', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  removeAssignedRole(data) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }

  }
  removeCrewMember(crew_chief_id, role, employee_id) {
    let params = new HttpParams();
    params = params.set('crew_chief_id', crew_chief_id);
    params = params.set('role', role);
    params = params.set('employee_id', employee_id);
    params = params.set('operation', 'removeAllCrewChiefAssignedRoles');

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .delete(`api-1/customer-job-setup`, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  deleteAssignedRole(data: any) {
    let params = new HttpParams();

    params = params.set('driverIds', data.driverIds);
    params = params.set('kartOperatorId', data.kartOperatorId);
    params = params.set('operation', data.operation);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .delete(`api-1/customer-job-setup`, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  // Cart Operator APIs
  getKartOperatorTruckDriversDropdown(operation: string, search: string = '') {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>(`api-1/havesting-kart-operator`, {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getInvoicedJobs(
    operation: string = '',
    role: string = '',
    employeeId: string = '',
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('role', role);
    params = params.set('employeeId', employeeId);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>('api-1/customer-job-setup', {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getKartOperatorTruckDrivers(
    operation,
    id,
    search: string = ''
  ): Observable<any> {
    let params = new HttpParams();
    params = params.set('operation', operation);
    params = params.set('id', id);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      try {
        return this._httpClient
          .get<any>(`api-1/havesting-kart-operator`, {
            params,
          })
          .pipe(take(1));
      } catch (error) {
        console.log('error', error);
      }
    }
    else {
      return of(null);
    }
  }

  kartOperatorAddTruckDriver(operation, raw) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/havesting-kart-operator`, raw)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  kartOperatorCreateDeliveryTicket(operation, raw) {
    const appendedObject = { ...raw, operation: 'createDeliveryTicket' };

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .post(`api-1/havesting-kart-operator`, appendedObject)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  kartOperatorGetTickets(kartOperatorId, ticketStatus, startDate, endDate) {
    let params = new HttpParams();
    params = params.set('kartOperatorId', kartOperatorId);
    params = params.set('ticketStatus', ticketStatus);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);

    let session = this.session.SessionActiveCheck();

    if (session) {
      try {
        return this._httpClient
          .get<any>(`api-1/harvesting-ticket`, {
            params,
          })
          .pipe(take(1))
          .subscribe((res) => {
            if (ticketStatus == 'sent') {
              this.sentTicketLoading.next(true);
              this.sentTicket.next(res);
              this.sentTicketLoading.next(false);
            } else if (ticketStatus == 'pending') {
              this.pendingTicketLoading.next(true);
              this.pendingTicket.next(res);
              this.pendingTicketLoading.next(false);
            } else {
              this.verifiedTicketLoading.next(true);
              this.verifiedTicket.next(res);
              this.verifiedTicketLoading.next(false);
            }
          });
      } catch (error) {
        console.log('error', error);
      }
    }
    else {
      return of(null);
    }
  }

  getCustomerDestination(
    search: string = '',
    entity: string = '',
    customer_id: string = '',
    farm_id: string = ''
  ) {
    this._httpClient
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('customer_id', customer_id);
    params = params.set('farm_id', farm_id);
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

  kartOperatorVerifyTickets(payload) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/harvesting-ticket`, payload)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  kartOperatorDeleteTicket(body) {
    let session = this.session.SessionActiveCheck();
    if (session) {
      return this._httpClient
        .patch(`api-1/harvesting-ticket`, body)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }


  truckDriverGetTickets(truckDriverId, ticketStatus, startDate, endDate) {
    let params = new HttpParams();
    params = params.set('truckDriverId', truckDriverId);
    params = params.set('ticketStatus', ticketStatus);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);

    let session = this.session.SessionActiveCheck();

    if (session) {
      try {
        return this._httpClient
          .get<any>(`api-1/harvesting-ticket`, {
            params,
          })
          .pipe(take(1))
          .subscribe((res) => {
            if (ticketStatus == 'sent') {
              this.sentTicketLoading.next(true);
              this.sentTicket.next(res);
              this.sentTicketLoading.next(false);
            } else if (ticketStatus == 'pending') {
              this.pendingTicketLoading.next(true);
              this.pendingTicket.next(res);
              this.pendingTicketLoading.next(false);
            }
            else if (ticketStatus == 'verified') {
              this.completedTicketLoading.next(true);
              this.completedTicket.next(res);
              this.completedTicketLoading.next(false);
            }
          });
      } catch (error) {
        console.log('error', error);
      }
    }
    else {
      return of(null);
    }
  }

  truckDriverCompleteTicket(data) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      try {
        return this._httpClient
          .patch(`api-1/harvesting-ticket`, data)
          .pipe(take(1));
      } catch (error) {
        console.log('error', error);
      }
    }
    else {
      return of(null);
    }
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

  reAssignTruckDrivers(data) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch<any>('api-1/havesting-kart-operator', data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  patchHours(endingEngineHours, separatorsHours, jobId, operation, role) {
    let data = {
      endingEngineHours,
      separatorsHours,
      jobId,
      operation,
      role
    };

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch(`api-1/customer-job-setup`, data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getDetails(crewCheifId, jobId) {
    let params = new HttpParams();
    params = params.set('crewCheifId', crewCheifId)
    params = params.set('jobId', jobId)
    params = params.set('operation', 'getEmployeesByJobId')

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/customer-job-setup`, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getRoles(crew_chief_id, role) {
    let params = new HttpParams();
    params = params.set('operation', 'getAllCrewChiefAssignedRoles');
    params = params.set('crew_chief_id', crew_chief_id);
    params = params.set('role', role);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get<any>(`api-1/customer-job-setup`, {
          params,
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  checkJob(customer_id, farm_id, crop_id) {
    let params = new HttpParams();
    params = params.set('operation', 'getSameInvoicedJobs');
    params = params.set('customer_id', customer_id);
    params = params.set('farm_id', farm_id);
    params = params.set('crop_id', crop_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/customer-job-setup`, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  getMaxDeliveryTicket() {
    let params = new HttpParams();

    params = params.set('operation', 'getMaxDeliveryTicket');

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .get(`api-1/harvesting-ticket`, {
          params
        })
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }

  generateUniqueId() {
    var currentTime = new Date().toISOString().replace(/[-:.]/g, "").replace("T", ""); // Get current date and time as a string
    var randomPart = Math.floor(Math.random() * 90000) + 10000; // Generate a random 5-digit number
    var uniqueId = currentTime + randomPart; // Combine current time and random part

    return uniqueId;
  }


  updateTicketInfoPatch(data) {
    let session = this.session.SessionActiveCheck();

    if (session) {
      return this._httpClient
        .patch<any>('api-1/havesting-kart-operator', data)
        .pipe(take(1));
    }
    else {
      return of(null);
    }
  }


}
