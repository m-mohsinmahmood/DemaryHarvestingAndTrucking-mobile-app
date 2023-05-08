/* eslint-disable @angular-eslint/use-lifecycle-interface */
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
import { HarvestingService } from './../../harvesting/harvesting.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.page.html',
  styleUrls: ['./trainee.page.scss'],
})
export class TraineePage implements OnInit {
  @ViewChild('employeeInput') employeeInput: ElementRef;
  @ViewChild('supervisorInput') supervisorInput: ElementRef;


  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  traineeForm: FormGroup;
  states: string[];
  state;
  city;
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

   //#region supervisor drop-down variables
  allSupervisors: Observable<any>;
  supervisorSearch$ = new Subject();
  supervisor_name: any = '';
  supervisorSearchValue: any = '';
  supervisorUL: any = false;
  isSupervisorSelected: any = true;
  //#endregion

  trainee_record_id: any;
  active_check_in_id: any;
  hasOther = false;
  public activeCheckInSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private router: Router,
    private dwrServices: CheckInOutService,
    private harvestingService: HarvestingService

  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.employeeInput.nativeElement) {
        this.allEmployees = of([]);
        this.employeeUL = false; // to hide the UL
      }
      if (e.target !== this.supervisorInput.nativeElement) {
        this.allSupervisors = of([]);
        this.supervisorUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    // pasing states
    this.states = states;

   this.initForm();

    // to get city & state
this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res)=>{
  console.log('Employee Details:',res);
  // setting in local storage
  localStorage.setItem('state',res.state);
  localStorage.setItem('city',res.city);

  // getting id & role
 this.getRoleAndID();

  // getting Trainer profile data
  this.getTrainee();

  this.initForm();


});

    // employee/trainer/supervisor subscription
    this.employeeSearchSubscription();
    this.supervisorSearchSubscription();
  }
  ngAfterViewInit(): void {
    this.setDefaultSupervisor();

  }

  async ionViewDidEnter() {


    this.getRoleAndID();
  this.getTrainee(); // getting Trainer profile data
    this.initForm();
    this.setDefaultSupervisor();


    this.upload_1 = false;
    this.upload_2 = false;
    this.upload_3 = false;
  }
  getRoleAndID(){
    this.role = localStorage.getItem('role');
    this.trainee_id = localStorage.getItem('employeeId');
    this.state = localStorage.getItem('state');
    this.city = localStorage.getItem('city');

  }
  initForm(){
    this.traineeForm = this.formBuilder.group({
      trainee_id: [''],
      trainer_id: [''],
      trainer_third_party: [''],
      supervisor_id: ['f676c59d-5e39-4051-a730-b907ccce1f48'],
      city: [this.city !== 'null'? this.city: '', [Validators.required]],
      state: [this.state !== 'null'? this.state: '', [Validators.required]],
      training_type: ['', [Validators.required]],
      topic: [''],
      detail: [''],
      image_1: [''],
      image_2: [''],
      image_3: [''],
      notes: [''],
      dwr_id:['']
    });
  }
  setDefaultSupervisor(){
    // passing name in select's input to pre-fill
    this.supervisorInput.nativeElement.value = 'Bill Demeray';

    // to enable submit button to pre-fill
    this.isSupervisorSelected = false;
  }

  onSelectedFiles(file, name) {

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
        console.log('RES',res);
        this.loading.next(true);
        this.trainee_name = res.summary[0].first_name + ' ' + res.summary[0].last_name;
        this.loading.next(false);

        // patching trainee id
        this.traineeForm.patchValue({
          trainee_id: res.summary[0].trainee_id,
          city: res.summary[0].town_city != null ? res.summary[0].town_city : '',
        state: res.summary[0].state != null ? res.summary[0].state : ''
        });
      },
      (err) => {
        console.log(err);

      }
    );
  }
  submit(){
// start loader
this.loadingSpinner.next(true);

// get check-in ID
this.getCheckInID();

  }
  submitData() {
    console.log(this.traineeForm.value);

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

          // create DWR
          this.createDWR();

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

    if(employee.first_name === 'Other'){
      this.hasOther= true;
    }else{
      this.hasOther= false;
    }

    // clearing array
    this.allEmployees = of([]);
  }
  //#endregion

  //#region Supervisor
  supervisorSearchSubscription() {
    this.supervisorSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.supervisorSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isSupervisorSelected = true;
        }

        // calling API
        this.allSupervisors = this.trainingService.getSupervisors(
          this.supervisorSearchValue
        );

        // subscribing to show/hide  UL
        this.allSupervisors.subscribe((supervisor) => {
          console.log('supervisor:', supervisor);

          if (supervisor.count === 0) {
            // hiding UL
            this.supervisorUL = false;
          } else {
            this.supervisorUL = true;
          }
        });
      });
  }
  inputClickedSupervisor() {
    // getting the serch value to check if there's a value in input
    this.supervisorSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.supervisorSearchValue = v;
      });

    const value =
      this.supervisorSearchValue === undefined
        ? this.supervisor_name
        : this.supervisorSearchValue;

    // calling API
    this.allSupervisors = this.trainingService.getSupervisors(
      this.supervisorSearchValue,
    );

    // subscribing to show/hide field UL
    this.allSupervisors.subscribe((supervisor) => {
      console.log('supervisor:', supervisor);
      if (supervisor.count === 0) {
        // hiding UL
        this.supervisorUL = false;
      } else {
        // showing UL
        this.supervisorUL = true;
      }
    });
  }
  listClickedSupervisor(supervisor) {
    console.log('supervisor Object:', supervisor);
    // hiding UL
    this.supervisorUL = false;

    // passing name in select's input
    this.supervisorInput.nativeElement.value = supervisor.first_name + ' ' + supervisor.last_name;

    // to enable submit button
    this.isSupervisorSelected = false;

    // assigning values in form
    this.traineeForm.patchValue({
      supervisor_id: supervisor.id,
    });



    // clearing array
    this.allSupervisors = of([]);
  }
  //#endregion
  getCheckInID(){
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeCheckInSpinner.next(true);
      this.active_check_in_id = workOrder.dwr[0].id;
      this.activeCheckInSpinner.next(false);

      // patch
      this.traineeForm.patchValue({
        dwr_id: this.active_check_in_id
      });

       // submit data
      this.submitData();
    });

  }

  createDWR(){
     let supervisor_id;
     supervisor_id = this.traineeForm.get('supervisor_id').value;
    this.trainingService
     .createDWR(this.trainee_id,'', this.trainee_record_id,'','','',supervisor_id,this.active_check_in_id)
     .subscribe(
       (res) => {
         console.log('RES:', res);
         if (res.status === 200) {

          // to stop loader
          this.loadingSpinner.next(false);

           // form resetting
           this.traineeForm.reset();
           this.employeeInput.nativeElement.value = '';
           this.supervisorInput.nativeElement.value = '';
           this.isEmployeeSelected = true;


            // get city & state
          this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((response)=>{
            console.log('Employee Details:',response);

            // setting in local storage
            localStorage.setItem('state',response.state);
            this.state = localStorage.getItem('state');
            this.city = localStorage.getItem('city');
            this.initForm();
          });

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
