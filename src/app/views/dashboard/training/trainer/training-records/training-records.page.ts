/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../training.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

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
    },
    );
    // checking required value
    this.recordsFrom.valueChanges.subscribe((value)=>{
     if(value.evaluation_type === 'summary'){
      this.recordsFrom.get('evaluation_form').setValidators(null);
     this.recordsFrom.get('evaluation_form').setErrors(null);
     }else{
      this.recordsFrom.get('evaluation_type').setValidators([Validators.required]);
      this.recordsFrom.get('evaluation_form').setValidators([Validators.required]);
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

  navigate() {
    console.log('Evaluation type', this.evaluationType);
    console.log('Evaluation Form', this.formType);
    console.log(this.recordsFrom.value);
    if (this.formType === 'summary') {
      // this.router.navigateByUrl(
      //   '/tabs/home/training/trainer/training-records/search-records/view-records',
      //   {
      //     state: {
      //       formType: this.formType,
      //     },
      //   }
      // );
      this.router.navigate(['/tabs/home/training/trainer/training-records/search-records/view-records'],
      {
        queryParams:{
            formType: this.formType,
            evaluationType: 'summary',
            trainee_id: this.recordsFrom.get('trainee_id').value
        }
      });
    } else {
      this.router.navigate(['/tabs/home/training/trainer/training-records/search-records'],
      {
        queryParams:{
            formType: this.formType,
            evaluationType: this.evaluationType,
            trainee_id: this.recordsFrom.get('trainee_id').value
        }
      });
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
    this.trainee_name = trainee.first_name + ' ' + trainee.last_name;

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


