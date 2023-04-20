/* eslint-disable max-len */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OthersService } from './others.services';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Renderer2 } from '@angular/core';
import { states } from './../../../../JSON/state';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';
import { HarvestingService } from '../harvesting/harvesting.service';

@Component({
  selector: 'app-others',
  templateUrl: './other.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {
  @ViewChild('employeeInput') employeeInput: ElementRef;
  @ViewChild('supervisorInput') supervisorInput: ElementRef;


  otherForm: FormGroup;
   // observables
   allEmployees: Observable<any>;
   allSupervisors: Observable<any>;

  // subjects
  employeesearch$ = new Subject();
  supervisorsearch$ = new Subject();

   // input values
  employee_name: any = '';
  supervisor_name: any = '';

    // input's search values
  employeeSearchValue: any ='';
  supervisorSearchValue: any = '';

    // to show UL's
  employeeUL: any = false;
  supervisorUL: any = false;

    // for invalid
  isEmployeeSelected: any = true;
  isSupervisorSelected: any = true;

  states: string[];
  activeDwr: Observable<any>;
  data;
  isModalOpen;
  record_id;

  public activeCheckInSpinner = new BehaviorSubject(false);
  public loadingSpinner = new BehaviorSubject(false);
  public loading = new BehaviorSubject(true);

  active_check_in_id: any;
  state;

  // unsubscribe object
  private _unsubscribeAll: Subject<any> = new Subject<any>();




  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private othersService: OthersService,
     private renderer: Renderer2,
     private toastService: ToastService,
     private dwrServices: CheckInOutService,
     private harvestingService: HarvestingService


     ) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.supervisorInput.nativeElement) {
          this.allSupervisors = of([]);
          this.supervisorUL = false; // to hide the UL
        }
      });
      }

  ngOnInit() {
    // this.getEmployeeDetailsByFirbaseId();
    this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res)=>{
      this.loading.next(true);
      console.log('Employee Details:',res);

      // setting in local storage
      localStorage.setItem('state',res.state);
      this.loading.next(false);

      if(!this.loading.getValue()){
        this.state = localStorage.getItem('state');
        this.initForm();

        // pasing states
     this.states = states;

     // subscription
     this.supervisorSearchSubscription();

     // check-in/check-out
     this.checkInOut();

      }

    });

    // subscription
    this.supervisorSearchSubscription();

    // check-in/check-out
    this.checkInOut();

    this.state = localStorage.getItem('state');
    this.initForm();


  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initForm(){
    // if(this.state !== null){
    //   this.otherForm
    // }
    this.otherForm = this.formBuilder.group({
      state:[this.state !== 'null'? this.state: '',Validators.required],
      module: ['', Validators.required],
      supervisor_id: [''],
      notes_other: ['', Validators.required],
      employee_id:[localStorage.getItem('employeeId')],
      active_check_in_id: ['']
    });
  }
checkInOut(){
   // Check-in/Check-out
   this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
    console.log('Active Check In ', workOrder.dwr);
    this.activeDwr = workOrder.dwr;
    this.data = this.activeDwr[0];

    if (workOrder.dwr.length > 0)
      {this.isModalOpen = false;}
    else
      {this.isModalOpen = true;}
  });
}
  navigateTo() {
    console.log(this.otherForm.value);
    // this.router.navigateByUrl('/tabs/home');
    this.loadingSpinner.next(true);
    this.othersService.getOthers(this.otherForm.value,'others')
    .subscribe(
      (res: any) => {
          console.log('Response:',res);
          if(res.status === 200){

            this.record_id  = res.id.record_id;

             // getting check-in id
             this.getCheckInID();

            // this.toastService.presentToast('form has beed submitted','success');
          }else{
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage,'danger');
          }
        },
      (err) => {
        this.toastService.presentToast(err.message,'danger');
        console.log('Error:',err);
      },
     );
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
        console.log('---',value);
        this.employeeSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isEmployeeSelected = true;
        }

        // calling API
        this.allEmployees = this.othersService.getEmployees(
          this.employeeSearchValue,
          'employee'
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
    this.allEmployees = this.othersService.getEmployees(
      this.employeeSearchValue,
      'employee'
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
    this.employeeInput.nativeElement.value =
    employee.first_name + ' ' + employee.last_name;

    // to enable submit button
    this.isEmployeeSelected = false;

    // assigning values in form
    this.otherForm.patchValue({
      employeeId: employee.employee_id,
    });

    // clearing array
    this.allEmployees = of([]);
  }
  //#endregion

   //#region Supervisor
   supervisorSearchSubscription() {
    this.supervisorsearch$
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
        this.allSupervisors = this.othersService.getSupervisors(
          this.supervisorSearchValue
        );

        // subscribing to show/hide field UL
        this.allSupervisors.subscribe((supervisors) => {
          console.log('supervisors:', supervisors);

          if (supervisors.count === 0) {
            // hiding UL
            this.supervisorUL = false;
          } else {
            this.supervisorUL = true;
          }
        });
      });
  }
  inputClickedsupervisor() {
    // getting the serch value to check if there's a value in input
    this.supervisorsearch$
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
     this.allSupervisors = this.othersService.getSupervisors(
      this.supervisorSearchValue
    );

    // subscribing to show/hide field UL
    this.allSupervisors.subscribe((supervisors) => {
      console.log('supervisors:', supervisors);
      if (supervisors.count === 0) {
        // hiding UL
        this.supervisorUL = false;
      } else {
        // showing UL
        this.supervisorUL = true;
      }
    });
  }
  listClickedSupervisor(supervisor) {
    console.log('Supervisor Object:', supervisor);
    // hiding UL
    this.supervisorUL = false;

    // passing name in select's input
    this.supervisorInput.nativeElement.value = supervisor.first_name + ' ' + supervisor.last_name;

    // to enable submit button
    this.isSupervisorSelected = false;

    // assigning values in form
    this.otherForm.patchValue({
      supervisor_id: supervisor.id,
    });

    // clearing array
    this.allSupervisors = of([]);
  }
  //#endregion
submit(){
  // to start the loader
this.loadingSpinner.next(true);

 // getting check-in id
 this.getCheckInID();

}
getCheckInID(){
  this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
    this.activeCheckInSpinner.next(true);
    this.active_check_in_id = workOrder.dwr[0].id;
    this.activeCheckInSpinner.next(false);

    // patching
    this.otherForm.patchValue({
      active_check_in_id: this.active_check_in_id
    });

    // data submit
    this.submitData();

  });

}
  submitData(){
    console.log(this.otherForm.value);

this.othersService.save(this.otherForm.value,'other')
    .subscribe((res)=>{
      console.log('res:',res);
      this.record_id  = res.id.record_id;
      if(res.status === 200){
       // creating DWR
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
  createDWR(){
    console.log('RECORD ID:',this.record_id);
   this.othersService
    .createDWR(localStorage.getItem('employeeId'),this.record_id, this.otherForm.get('supervisor_id').value,this.active_check_in_id,'')
    .subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {

         // to stop loader
         this.loadingSpinner.next(false);

         // form resetting
         this.otherForm.reset();
        this.supervisorInput.nativeElement.value = '';

        // this.getEmployeeDetailsByFirbaseId();
        this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((response)=>{
          console.log('Employee Details:',response);

          // setting in local storage
          localStorage.setItem('state',response.state);
          this.state = localStorage.getItem('state');
          this.initForm();
        });

          // tooltip
          this.toastService.presentToast(
           'Details have been submitted',
           'success'
         );

       // navigating
          // this.router.navigateByUrl('/tabs/home');
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

  getEmployeeDetailsByFirbaseId(){
    this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res)=>{
      console.log('Employee Details:',res);

      // setting in local storage
      localStorage.setItem('state',res.state);

      // this.initForm();
    });
  }
}
