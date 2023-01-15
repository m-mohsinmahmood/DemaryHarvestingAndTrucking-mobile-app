/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { TrainingService } from './../../training.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-training-tasks',
  templateUrl: './training-tasks.page.html',
  styleUrls: ['./training-tasks.page.scss'],
})
export class TrainingTasksPage implements OnInit {
  @ViewChild('employeeInput') employeeInput: ElementRef;

  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  route;
  trainingTasksForm: FormGroup;
  states: string[];

  trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';
 profileData: any;
  // behaviour subject for loader
  public loading = new BehaviorSubject(true);

  //#region supervisor drop-down variables
  allEmployees: Observable<any>;
  employeesearch$ = new Subject();
  employee_name: any = '';
  employeeSearchValue: any = '';
  employeeUL: any = false;
  isEmployeeSelected: any = true;
//#endregion
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private router: Router, private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private renderer: Renderer2,
    private toastService: ToastService

    ) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.employeeInput.nativeElement) {
          this.allEmployees = of([]);
          this.employeeUL = false; // to hide the UL
        }
      });
    }

  ngOnInit() {
    console.log(
      'route-name:',
      this.router.getCurrentNavigation().extras.state.routeName
    );
    this.route = this.router.getCurrentNavigation().extras.state.routeName;

    this.trainingTasksForm = this.formBuilder.group({
      trainer_id: ['', [Validators.required]],
      supervisor_id: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      training_type: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      uploadDocs1: ['', [Validators.required]],
      uploadDocs2: ['', [Validators.required]],
      uploadDocs3: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    });

    // passing value in training type
    if(this.route === 'Company Training'){
      this.trainingTasksForm.patchValue({
        training_type: 'company-training'
      });
    }else if(this.route === 'Safety Training'){
      this.trainingTasksForm.patchValue({
        training_type: 'safety-training'
      });
    }else if(this.route === 'CDL Training'){
      this.trainingTasksForm.patchValue({
        training_type: 'cdl-training'
      });
    }

    // pasing states
    this.states = states;


    // getting Trainer profile data
    this.getTrainer();

    // supervisor subscription
    this.employeeSearchSubscription();

  }


  onSelectedFiles(file, name) {
    console.log('file:', file);

    if (name === 'upload_1') {
      this.upload_1 = !this.upload_1;
    }
    if (name === 'upload_2') {
      this.upload_2 = !this.upload_2;
    }
    if (name === 'upload_3') {
      this.upload_3 = !this.upload_3;
    }
  }
  getTrainer(){
    this.trainingService.getTrainerById(this.trainer_id)
    .subscribe((res)=>{
      this.loading.next(true);
      console.log('Res:',res);
      this.profileData = res;

      // patching values
      this.trainingTasksForm.patchValue({
        trainer_id: res.trainer_id,
        city:  res.town_city,
        state: res.state,
      });
      this.loading.next(false);
    });
  }

  submit() {
    console.log(this.trainingTasksForm.value);
    this.trainingService.save(this.trainingTasksForm.value,'trainer')
    .subscribe((res)=>{
      console.log('RES:',res);
      if(res.status === 200){
        this.toastService.presentToast('Your details have been submitted','success');
      }else{
        console.log('Something happened :)');
        this.toastService.presentToast(res.mssage,'danger');
      }
    },(err)=>{
console.log('ERROR::',err);
this.toastService.presentToast(err.mssage,'danger');

    });
  }

  //#region Supervisor
  employeeSearchSubscription() {
    this.employeesearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.employeeSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isEmployeeSelected = true;
        }

        // calling API
        this.allEmployees = this.trainingService.getEmployees(
          this.employeeSearchValue,
          'allEmployees',
          'Supervisor'
        );

        // subscribing to show/hide field UL
        this.allEmployees.subscribe((employees) => {
          console.log('Employees:', employees);

          if (employees.count === 0) {
            // hiding UL
            this.employeeUL = false;
          } else {
            this.employeeUL = true;
          }
        });
      });
  }
  inputClickedEmployee() {
    // getting the serch value to check if there's a value in input
    this.employeesearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.employeeSearchValue = v;
      });

    const value =
      this.employeeSearchValue === undefined
        ? this.employee_name
        : this.employeeSearchValue;

    // calling API
    this.allEmployees = this.trainingService.getEmployees(
      this.employeeSearchValue,
      'allEmployees',
      'Supervisor'
    );

    // subscribing to show/hide field UL
    this.allEmployees.subscribe((employees) => {
      console.log('Employees:', employees);
      if (employees.count === 0) {
        // hiding UL
        this.employeeUL = false;
      } else {
        // showing UL
        this.employeeUL = true;
      }
    });
  }
  listClickedEmployee(employee) {
    console.log('Employee Object:', employee);
    // hiding UL
    this.employeeUL = false;

    // passing name in select's input
    this.employee_name = employee.first_name + ' ' + employee.last_name;

    // to enable submit button
    this.isEmployeeSelected = false;

    // assigning values in form
    this.trainingTasksForm.patchValue({
      supervisor_id: employee.id,
    });

    // clearing array
    this.allEmployees = of([]);
  }
  //#endregion
}
