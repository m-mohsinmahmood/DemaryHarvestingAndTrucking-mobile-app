/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {

  constructor(
    private httpClient: HttpClient,
    private session: AuthService
  ) { }

  getTrainee(trainee_id: any) {
    let params = new HttpParams();
    params = params.set('trainee_id', trainee_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/training', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getTrainerById(trainer_id: any) {
    let params = new HttpParams();
    params = params.set('trainer_id', trainer_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/training', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getEmployees(
    search: string = '',
    entity: string = '',
    role: string = ''
  ) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('role', role);
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  save(data, entity: any) {
    let params = new HttpParams();
    params = params.set('entity', entity);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .post<any>('api-1/training', data, {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  saveFroms(data, entity: any) {
    let params = new HttpParams();
    params = params.set('entity', entity);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .patch<any>('api-1/training', data, {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getData(entity, trainer_id) {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('trainer_pre_trip_id', trainer_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/training', {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getRecordsById(trainee_id, evaluation_type, evaluation_form) {
    let params = new HttpParams();
    params = params.set('trainee_record_id', trainee_id);
    params = params.set('evaluation_type', evaluation_type);
    params = params.set('evaluation_form', evaluation_form);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/training', {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getRecordById(record_id) {
    let params = new HttpParams();
    params = params.set('record_id', record_id);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/training', {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getSummary(trainee_id, trainer_id, evaluation_type, startDate, endDate) {
    let params = new HttpParams();
    params = params.set('trainee_id', trainee_id);
    params = params.set('trainer_id', trainer_id);
    params = params.set('evaluation_type', evaluation_type);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/training', {
          params
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  createDWR(
    employeeId: any,
    training_record_id: any,
    trainee_record_id: any,
    trainer_record_id: any,
    evaluation_type,
    evaluation_form,
    supervisor_id: any,
    dwrId) {
    let data;

    if (trainee_record_id) {
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
    else if (training_record_id) {
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
    else if (trainer_record_id) {
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
    console.log('DATA:', data);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .post<any>(`api-1/dwr`, data)

        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getMachinery(search: string = '', entity: string = '') {
    let params = new HttpParams();
    params = params.set('entity', entity);
    params = params.set('search', search);
    params = params.set('vehicleType', 'Truck IFTA');

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }

  getSupervisors(search: any) {
    let params = new HttpParams();
    params = params.set('entity', 'allSupervisors');
    params = params.set('search', search);

    let session = this.session.SessionActiveCheck();

    if (session) {
      return this.httpClient
        .get<any>('api-1/dropdowns', {
          params,
        })
        .pipe(take(1));
    } else {
      return of(null);
    }
  }
}
