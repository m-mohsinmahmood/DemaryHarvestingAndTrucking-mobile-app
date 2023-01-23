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
    .get<any>('http://localhost:7071/api/training', {
      params,
    })
    .pipe(take(1));
  }
  getTrainerById(trainer_id: any){
    let params = new HttpParams();
    params = params.set('trainer_id',trainer_id);
    return this.httpClient
    .get<any>('http://localhost:7071/api/training', {
      params,
    })
    .pipe(take(1));
  }
  getEmployees(
    search: string = '',
    entity: string = '',
    role: string = '',
  ) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('role', role);
    params = params.set('search', search);
    return this.httpClient
      .get<any>('http://localhost:7071/api/dropdowns', {
        params,
      })
      .pipe(take(1));
  }
  save(data, entity: any){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    return this.httpClient
    .post<any>('http://localhost:7071/api/training', data,{
      params
    })
    .pipe(take(1));
  }
  saveFroms(data, entity: any){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    return this.httpClient
    .patch<any>('http://localhost:7071/api/training', data,{
      params
    })
    .pipe(take(1));
  }
  getData(entity,trainer_id){
    let params=  new HttpParams();
    params = params.set('entity', entity);
    params = params.set('trainer_pre_trip_id', trainer_id);
    return this.httpClient
    .get<any>('http://localhost:7071/api/training',{
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
    .get<any>('http://localhost:7071/api/training', {
      params
    })
    .pipe(take(1));
  }
  getRecordById(record_id){
    let params = new HttpParams();
    params = params.set('record_id',record_id);
    return this.httpClient
    .get<any>('http://localhost:7071/api/training', {
      params
    })
    .pipe(take(1));
  }
  getSummary(trainee_id,trainer_id,evaluation_type){
    let params = new HttpParams();
    params = params.set('trainee_id',trainee_id);
    params = params.set('trainer_id',trainer_id);
    params = params.set('evaluation_type',evaluation_type);
    return this.httpClient
    .get<any>('http://localhost:7071/api/training', {
      params
    })
    .pipe(take(1));
  }

}
