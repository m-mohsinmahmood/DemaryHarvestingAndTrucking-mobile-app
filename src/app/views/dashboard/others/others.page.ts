/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OthersService } from './others.services';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Renderer2 } from '@angular/core';
import { states } from './../../../../JSON/state';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
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

  // unsubscribe object
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private othersService: OthersService,
     private renderer: Renderer2,
     private toastService: ToastService

     ) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.employeeInput.nativeElement) {
          // console.log('Combine');
          this.allEmployees = of([]);
          this.employeeUL = false; // to hide the UL
        }
        if (e.target !== this.supervisorInput.nativeElement) {
          // console.log('Kart');
          this.allSupervisors = of([]);
          this.supervisorUL = false; // to hide the UL
        }
      });
      }

  ngOnInit() {
    this.otherForm = this.formBuilder.group({
      employeeId: [''],
      supervisor_id: [''],
      state:[''],
      apprTaskId: ['', Validators.required],
      notesOther: ['', Validators.required],
    });

     // pasing states
     this.states = states;

    // subscription
    this.employeeSearchSubscription();
    this.supervisorSearchSubscription();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  navigateTo() {
    console.log(this.otherForm.value);
    // this.router.navigateByUrl('/tabs/home');
    this.othersService.getOthers(this.otherForm.value,'others')
    .subscribe(
      (res: any) => {
          console.log('Response Change Field:',res);
          if(res.status === 200){
            this.toastService.presentToast('form has beed submitted','success');
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
        console.log('---',value)
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
    this.employee_name =
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
        this.allSupervisors = this.othersService.getEmployees(
          this.supervisorSearchValue,
          'supervisor'
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
     this.allSupervisors = this.othersService.getEmployees(
      this.supervisorSearchValue,
      'supervisor'
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
this.supervisor_name = supervisor.supervisor;

    // to enable submit button
    this.isSupervisorSelected = false;

    // assigning values in form
    this.otherForm.patchValue({
      supervisor_id: supervisor.employee_id,
    });

    // clearing array
    this.allSupervisors = of([]);
  }
  //#endregion

}
