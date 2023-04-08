/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { TrainingService } from '../training.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Renderer2 } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.page.html',
  styleUrls: ['./trainee.page.scss'],
})
export class TraineePage implements OnInit {
  @ViewChild('employeeInput') employeeInput: ElementRef;

  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  traineeForm: FormGroup;
  states: string[];
  trainee_id;
  trainee_name: any;

  //#region loaders
  public loading = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);
 //#endregion

  //#region employee variables
  allEmployees: Observable<any>;
  employeesearch$ = new Subject();
  employee_name: any = '';
  employeeSearchValue: any = '';
  employeeUL: any = false;
  isEmployeeSelected: any = true;
  role: any;
  //#endregion

  trainee_record_id: any;
  active_check_in_id: any;
  public activeCheckInSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private router: Router,
    private dwrServices: CheckInOutService

  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.employeeInput.nativeElement) {
        this.allEmployees = of([]);
        this.employeeUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
   this.initForm();

   // getting id & role
   this.getRoleAndID();

    // pasing states
    this.states = states;

    // getting trainee details
    this.getTrainee();

    // employee/trainer subscription
    this.employeeSearchSubscription();
  }
  async ionViewDidEnter() {
    this.getRoleAndID();
  }
  getRoleAndID(){
    this.role = localStorage.getItem('role');
    this.trainee_id = localStorage.getItem('employeeId');

  }
  initForm(){
    this.traineeForm = this.formBuilder.group({
      trainee_id: [''],
      trainer_id: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      training_type: ['', [Validators.required]],
      topic: [''],
      detail: [''],
      image_1: [''],
      image_2: [''],
      image_3: [''],
    });
  }

  onSelectedFiles(file, name) {
    console.log('file:', file.target.files);

    if (name === 'upload_1') {
      this.upload_1 = !this.upload_1;
      if ( file.target.files &&file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.traineeForm.controls.image_1?.setValue(file.target.files[0]);
      };
      reader.readAsDataURL(file.target.files[0]);
      } else {

      }
    }
    if (name === 'upload_2') {
      this.upload_2 = !this.upload_2;
        if ( file.target.files &&file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.traineeForm.controls.image_2?.setValue(file.target.files[0]);
        };
        reader.readAsDataURL(file.target.files[0]);
        } else {

        }
    }
    if (name === 'upload_3') {
      this.upload_3 = !this.upload_3;
      if ( file.target.files &&file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.traineeForm.controls.image_3?.setValue(file.target.files[0]);
      };
      reader.readAsDataURL(file.target.files[0]);
      } else {

      }
    }
  }
  getTrainee() {
    this.trainingService.getTrainee(this.trainee_id).subscribe(
      (res) => {
        this.loading.next(true);
        console.log('res:::',res);
        this.trainee_name = res[0].first_name + ' ' + res[0].last_name;
        this.loading.next(false);

        // patching trainee id
        this.traineeForm.patchValue({
          trainee_id: res[0].trainee_id
        });
      },
      (err) => {
        console.log(err);

      }
    );
  }
  submit() {
    console.log(this.traineeForm.value);
    // to start the loader
    this.loadingSpinner.next(true);
    // Form Data
    var formData: FormData = new FormData();
    formData.append('traineeForm',JSON.stringify(this.traineeForm.value));
    formData.append('image_1', this.traineeForm.get('image_1').value);
    formData.append('image_2', this.traineeForm.get('image_2').value);
    formData.append('image_3', this.traineeForm.get('image_3').value);

    this.trainingService.save(formData,'trainee')
    .subscribe((res)=>{
      this.trainee_record_id  = res.id.record_id;
      if(res.status === 200){

         // getting check-in id
         this.getCheckInID();

      }else{
        console.log('Something happened :)');
        this.loadingSpinner.next(false);
        this.toastService.presentToast(res.mssage,'danger');
      }
    },(err)=>{
      console.log('ERR:',err);
      this.loadingSpinner.next(false);
      this.toastService.presentToast(err.mssage,'danger');
    });
  }

  //#region Employee
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
          'Trainer'
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
      'Trainer'
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
    this.employeeInput.nativeElement.value = employee.first_name + ' ' + employee.last_name;

    // to enable submit button
    this.isEmployeeSelected = false;

    // assigning values in form
    this.traineeForm.patchValue({
      trainer_id: employee.id,
    });

    // clearing array
    this.allEmployees = of([]);
  }
  //#endregion

  getCheckInID(){
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeCheckInSpinner.next(true);
      this.active_check_in_id = workOrder.dwr[0].id;
      this.activeCheckInSpinner.next(false);

       // creating DWR
      this.createDWR();
    });

  }

  createDWR(){
     let supervisor_id;
     supervisor_id = this.traineeForm.get('trainer_id').value
    this.trainingService
     .createDWR(this.trainee_id,'', this.trainee_record_id,'','','',supervisor_id,this.active_check_in_id)
     .subscribe(
       (res) => {
         console.log('RES:', res);
         if (res.status === 200) {

          // to stop loader
          this.loadingSpinner.next(false);

           // tooltip
           this.toastService.presentToast(
            'Details have been submitted',
            'success'
          );


        // navigating
           this.router.navigateByUrl('/tabs/home/training');
         } else {
           console.log('Something happened :)');
           this.loadingSpinner.next(false);
           this.toastService.presentToast(res.mssage, 'danger');
         }
       },
       (err) => {
         console.log('ERROR::', err);
         this.loadingSpinner.next(false);
         this.toastService.presentToast(err.mssage, 'danger');
       }
     );
 }
}
