/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {

  constructor(
    private httpClient: HttpClient,
    private alertSerice: AlertService
  ) {}

  getTrainee(trainee_id: any){
    let params = new HttpParams();
    params = params.set('trainee_id',trainee_id);
    return this.httpClient
    .get<any>('api-1/training', {
      params,
    })
    .pipe(take(1));
  }
  getTrainerById(trainer_id: any){
    let params = new HttpParams();
    params = params.set('trainer_id',trainer_id);
    return this.httpClient
    .get<any>('api-1/training', {
      params,
    })
    .pipe(take(1));
  }
  getEmployees(
    search: string = '',
    entity: string = '',
    role: string = ''
  ) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    // params = params.set('entityType', entityType);
    params = params.set('role', role);
    params = params.set('search', search);
    return this.httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
  save(data, entity: any){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    return this.httpClient
    .post<any>('api-1/training', data,{
      params
    })
    .pipe(take(1));
  }
  saveFroms(data, entity: any){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    return this.httpClient
    .patch<any>('api-1/training', data,{
      params
    })
    .pipe(take(1));
  }
  getData(entity,trainer_id){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    params = params.set('trainer_pre_trip_id', trainer_id);
    return this.httpClient
    .get<any>('api-1/training',{
      params
    })
    .pipe(take(1));
  }
  getRecordsById(trainee_id,evaluation_type,evaluation_form){
    let params = new HttpParams();
    params = params.set('trainee_record_id',trainee_id);
    params = params.set('evaluation_type',evaluation_type);
    params = params.set('evaluation_form',evaluation_form);
    return this.httpClient
    .get<any>('api-1/training', {
      params
    })
    .pipe(take(1));
  }
  getRecordById(record_id){
    let params = new HttpParams();
    params = params.set('record_id',record_id);
    return this.httpClient
    .get<any>('api-1/training', {
      params
    })
    .pipe(take(1));
  }
  getSummary(trainee_id,trainer_id,evaluation_type, startDate, endDate){
    let params = new HttpParams();
    params = params.set('trainee_id',trainee_id);
    params = params.set('trainer_id',trainer_id);
    params = params.set('evaluation_type',evaluation_type);
    // params = params.set('date',date);
    params = params.set('startDate',startDate);
    params = params.set('endDate',endDate);

    return this.httpClient
    .get<any>('api-1/training', {
      params
    })
    .pipe(take(1));
  }
  createDWR(
    employeeId: any,
    training_record_id: any,
    trainee_record_id: any,
    trainer_record_id: any,
    evaluation_type,
    evaluation_form,
    supervisor_id: any,
    dwrId){
    let data;


    if(trainee_record_id){
       data = {
        dwr_type: 'training',
        module: 'training',
        employeeId,
        evaluation_type,
        evaluation_form,
        supervisor_id,
        dwrId,
        trainee_record_id
      };
    }
     else if(training_record_id){
         data = {
          dwr_type: 'training',
          module: 'training',
          training_record_id,
          employeeId,
          evaluation_type,
          evaluation_form,
          supervisor_id,
          dwrId,
        };
    }
    else if(trainer_record_id){
         data = {
          dwr_type: 'training',
          module: 'training',
          trainer_record_id,
          employeeId,
          evaluation_type,
          evaluation_form,
          supervisor_id,
          dwrId,
        };
    }
    console.log('DATA:',data);
    return this.httpClient
      .post<any>(`api-1/dwr`, data)

      .pipe(take(1));
  }
  getMachinery(search: string = '', entity: string = '') {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);
    params = params.set('vehicleType', 'Truck IFTA');

    return this.httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }

  getSupervisors(search: any) {
    let params = new HttpParams();
    params = params.set('entity', 'allSupervisors');
    params = params.set('search', search);
    return this.httpClient
      .get<any>('api-1/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
}
