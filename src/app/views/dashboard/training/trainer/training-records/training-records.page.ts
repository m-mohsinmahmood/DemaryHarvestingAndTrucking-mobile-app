/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../training.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-training-records',
  templateUrl: './training-records.page.html',
  styleUrls: ['./training-records.page.scss'],
})
export class TrainingRecordsPage implements OnInit {
  @ViewChild('traineeInput') traineeInput: ElementRef;

  formType;
  evaluationType;
  recordsFrom: FormGroup;
  // date: any = moment(new Date()).format('YYYY-MM-DD');
  startDate: any = moment(new Date()).format('YYYY-MM-DD');
  endDate: any = moment(new Date()).format('YYYY-MM-DD');

  public loading = new BehaviorSubject(false);
  //#region trainee drop-down variables
  allTrainees: Observable<any>;
  traineeSearch$ = new Subject();
  trainee_name: any = '';
  traineeSearchValue: any = '';
  traineeUL: any = false;
  isTraineeSelected: any = true;
  roadTestForm: any;
  //#endregion
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private fromBuilder: FormBuilder,
    private renderer: Renderer2,
    private trainingService: TrainingService,
    private toastService: ToastService
  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.traineeInput.nativeElement) {
        this.allTrainees = of([]);
        this.traineeUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    this.recordsFrom = this.fromBuilder.group({
      trainee_id: [''],
      evaluation_type: ['', [Validators.required]],
      evaluation_form: ['', [Validators.required]],
      // date: [moment(new Date()).format('YYYY-MM-DD'), [Validators.required]],
      startDate: [moment(new Date()).format('YYYY-MM-DD'), [Validators.required]],
      endDate: [moment(new Date()).format('YYYY-MM-DD'), [Validators.required]],
    });
    // checking required value
    this.recordsFrom.valueChanges.subscribe((value) => {
      if (value.evaluation_type === 'summary') {
        this.recordsFrom.get('evaluation_form').setValidators(null);
        this.recordsFrom.get('evaluation_form').setErrors(null);
      } else {
        this.recordsFrom.get('evaluation_type').setValidators([Validators.required]);
        this.recordsFrom.get('evaluation_form').setValidators([Validators.required]);

          this.recordsFrom.get('startDate').setValidators(null);
          this.recordsFrom.get('startDate').setErrors(null);

          this.recordsFrom.get('endDate').setValidators(null);
          this.recordsFrom.get('endDate').setErrors(null);
      }
    });

    // trainee subscription
    this.traineeSearchSubscription();
  }
  onSelect(e) {
    this.formType = e.target.value;
  }
  onSelectEvaluation(e) {
    this.evaluationType = e.target.value;
  }
  getStartDate(e) {
    this.startDate = moment(e.detail.value).format('YYYY-MM-DD');
    console.log(this.startDate);
    this.recordsFrom.patchValue({
      startDate: this.startDate
    });
  }
  getEndDate(e) {
    this.endDate = moment(e.detail.value).format('YYYY-MM-DD');
    console.log(this.endDate);
    this.recordsFrom.patchValue({
      endDate: this.endDate
    });
  }

  navigate() {
    console.log(this.recordsFrom.value);
    this.loading.next(true);
    if (this.formType === 'summary') {
      this.loading.next(false);
      this.router.navigate(
        [
          '/tabs/home/training/trainer/training-records/search-records/view-records',
        ],
        {
          queryParams: {
            formType: this.formType,
            evaluationType: 'summary',
            trainee_id: this.recordsFrom.get('trainee_id').value,
            // date: this.recordsFrom.get('date').value,
            startDate: this.recordsFrom.get('startDate').value,
            endDate: this.recordsFrom.get('endDate').value,
          },
        }
      );
    } else {
      this.router.navigate(
        ['/tabs/home/training/trainer/training-records/search-records'],
        {
          queryParams: {
            formType: this.formType,
            evaluationType: this.evaluationType,
            trainee_id: this.recordsFrom.get('trainee_id').value,
          },
        }
      );
    }
  }


  //#region Trainee
  traineeSearchSubscription() {
    this.traineeSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.traineeSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isTraineeSelected = true;
        }

        // calling API
        this.allTrainees = this.trainingService.getEmployees(
          this.traineeSearchValue,
          'allEmployees',
          'Trainee'
        );

        // subscribing to show/hide  UL
        this.allTrainees.subscribe((trainee) => {
          console.log('trainee:', trainee);

          if (trainee.count === 0) {
            // hiding UL
            this.traineeUL = false;
          } else {
            this.traineeUL = true;
          }
        });
      });
  }
  inputClickedTrainee() {
    // getting the serch value to check if there's a value in input
    this.traineeSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.traineeSearchValue = v;
      });

    const value =
      this.traineeSearchValue === undefined
        ? this.trainee_name
        : this.traineeSearchValue;

    // calling API
    this.allTrainees = this.trainingService.getEmployees(
      this.traineeSearchValue,
      'allEmployees',
      'Trainee'
    );

    // subscribing to show/hide field UL
    this.allTrainees.subscribe((trainee) => {
      console.log('trainee:', trainee);
      if (trainee.count === 0) {
        // hiding UL
        this.traineeUL = false;
      } else {
        // showing UL
        this.traineeUL = true;
      }
    });
  }
  listClickedTrainee(trainee) {
    console.log('Trainee Object:', trainee);
    // hiding UL
    this.traineeUL = false;

    // passing name in select's input
    this.traineeInput.nativeElement.value = trainee.first_name + ' ' + trainee.last_name;

    // to enable submit button
    this.isTraineeSelected = false;

    // assigning values in form
    this.recordsFrom.patchValue({
      trainee_id: trainee.id,
    });

    // clearing array
    this.allTrainees = of([]);
  }
  //#endregion
}


