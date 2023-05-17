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

  private initDataRetrievalExecuted = false;
  private ionViewRetrievalExecuted = true;

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
  employeeSearchValue: any = '';
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
  ticketsPerDwr = 0;

  public activeCheckInSpinner = new BehaviorSubject(false);
  public loadingSpinner = new BehaviorSubject(false);
  public loading = new BehaviorSubject(true);

  active_check_in_id: any;
  state;

  // unsubscribe object
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
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
    if (!this.initDataRetrievalExecuted) {
      this.initDataRetrieval();
      this.initDataRetrievalExecuted = true;
    }
  }

  async ionViewDidEnter() {
    if (!this.ionViewRetrievalExecuted) {
      this.initDataRetrieval();
      this.ionViewRetrievalExecuted = true;
    }
  }

  async ionViewDidLeave(){
    this.ionViewRetrievalExecuted = false;
  }

  initDataRetrieval() {
    this.employee_name = '';
    this.supervisor_name = '';
    this.employeeSearchValue = '';
    this.supervisorSearchValue = '';
    this.employeeUL = false;
    this.supervisorUL = false;
    this.isEmployeeSelected = true;
    this.isSupervisorSelected = true;
    this.states = [];
    this.activeDwr = null;
    this.data = null;
    this.isModalOpen = false;
    this.active_check_in_id = null;
    this.ticketsPerDwr = 0;

    // this.getEmployeeDetailsByFirbaseId();

    // subscription
    this.supervisorSearchSubscription();

    // check-in/check-out
    this.checkInOut();

    // this.state = localStorage.getItem('state');
    this.initForm();

    this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res) => {
      this.loading.next(true);

      // setting in local storage
      localStorage.setItem('state', res.state);
      this.loading.next(false);

      if (!this.loading.getValue()) {
        this.state = localStorage.getItem('state');
        this.otherForm.patchValue({
          state: this.state
        })

        // pasing states
        this.states = states;
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  initForm() {
    this.otherForm = this.formBuilder.group({
      state: [this.state !== 'null' ? this.state : '', Validators.required],
      module: ['', Validators.required],
      supervisor_id: [''],
      notes_other: ['', Validators.required],
      employee_id: [localStorage.getItem('employeeId')],
      active_check_in_id: ['']
    });
  }

  checkInOut() {
    // Check-in/Check-out

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeDwr = workOrder.dwr;
      this.data = this.activeDwr[0];

      if (workOrder.dwr.length > 0) {
        this.isModalOpen = false;
        this.dwrServices.getTicketsPerDwr('getTicketsPerDwr', this.data.id).subscribe(dwr => {
          this.ticketsPerDwr = dwr.dwr_count[0].count;
        });
      }
      else {
        this.isModalOpen = true;
      }


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
        this.allEmployees = this.othersService.getEmployees(
          this.employeeSearchValue,
          'employee'
        );

        // subscribing to show/hide field UL
        this.allEmployees.subscribe((employees) => {

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

          if (supervisors.count === 0) {

            this.supervisorUL = false; // hiding UL
            this.isSupervisorSelected = true;  // for asterik to look required
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

  submit() {
    // to start the loader
    this.loadingSpinner.next(true);

    // getting check-in id
    this.getCheckInID();
  }

  getCheckInID() {
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

  submitData() {

    this.othersService.save(this.otherForm.value, 'other')
      .subscribe((res) => {
        this.record_id = res.id.record_id;
        if (res.status === 200) {
          // creating DWR
          this.createDWR();

        } else {
          this.loadingSpinner.next(false);
          this.toastService.presentToast(res.mssage, 'danger');
        }
      }, (err) => {
        this.loadingSpinner.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      });
  }

  createDWR() {
    this.othersService
      .createDWR(localStorage.getItem('employeeId'), this.record_id, this.otherForm.get('supervisor_id').value, this.active_check_in_id, '')
      .subscribe(
        (res) => {
          if (res.status === 200) {

            // to stop loader
            this.loadingSpinner.next(false);

            // form resetting
            this.otherForm.reset();
            this.supervisorInput.nativeElement.value = '';

            this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((response) => {

              this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
                this.data = workOrder.dwr[0];

                this.dwrServices.getTicketsPerDwr('getTicketsPerDwr', this.data.id).subscribe(dwr => {
                  this.ticketsPerDwr = dwr.dwr_count[0].count;

                  // setting in local storage
                  localStorage.setItem('state', response.state);
                  this.state = localStorage.getItem('state');
                  this.initForm();

                  // tooltip
                  this.toastService.presentToast(
                    'Details have been submitted',
                    'success'
                  );
                })
              });
            });

          } else {
            this.loadingSpinner.next(false);
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          this.loadingSpinner.next(false);
          this.toastService.presentToast(err.mssage, 'danger');
        }
      );
  }

  getEmployeeDetailsByFirbaseId() {
    this.harvestingService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res) => {
      // setting in local storage
      localStorage.setItem('state', res.state);
    });
  }
}
