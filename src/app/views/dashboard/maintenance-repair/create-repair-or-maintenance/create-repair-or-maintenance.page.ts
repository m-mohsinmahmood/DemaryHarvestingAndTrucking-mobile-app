/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MaintenanceRepairService } from '../maintenance-repair.services';
import { states } from 'src/JSON/state';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-create-repair-or-maintenance',
  templateUrl: './create-repair-or-maintenance.page.html',
  styleUrls: ['./create-repair-or-maintenance.page.scss'],
})
export class CreateRepairORMaintenancePage implements OnInit {
  @ViewChild('employeeInput') employeeInput: ElementRef;
  @ViewChild('employeeInput2') employeeInput2: ElementRef;
  @ViewChild('machineryInput') machineryInput: ElementRef;

  category = '';
  createTicket: FormGroup;

  //#region  employee variables
  allEmployees: Observable<any>;
  employeesearch$ = new Subject();
  employee_name: any = '';
  employeeSearchValue: any = '';
  employeeUL: any = false;
  isEmployeeSelected: any = true;
  //#endregion

  //#region  employee-2 variables
  allEmployees_2: Observable<any>;
  employeesearch_2$ = new Subject();
  employee_name_2: any = '';
  employeeSearchValue_2: any = '';
  employeeUL_2: any = false;
  isEmployeeSelected_2: any = true;
  //#endregion

  //#region  machinery
  allMachinery: Observable<any>;
  machine_search$ = new Subject();
  machine_name: any = '';
  machineSearchValue: any = '';
  machineUL: any = false;
  isMachineSelected: any = true;
  //#endregion
  states: string[];

  active_check_in_id: any;
  ticketRecordId: any;
  taskType: any;

  public loadingSpinner = new BehaviorSubject(false);
  public activeCheckInSpinner = new BehaviorSubject(false);


  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private maintenanceRepairService: MaintenanceRepairService,
    private toastService: ToastService,
    private dwrServices: CheckInOutService
  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.employeeInput.nativeElement) {
        this.allEmployees = of([]);
        this.employeeUL = false; // to hide the UL
      }
      if (e.target !== this.employeeInput2.nativeElement) {
        this.allEmployees_2 = of([]);
        this.employeeUL_2 = false; // to hide the UL
      }
      if (e.target !== this.machineryInput.nativeElement) {
        this.allMachinery = of([]);
        this.machineUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this.category = param.category;
    });

    this.createTicket = this.formBuilder.group({
      repairTicketId: [Math.random().toString(16).slice(9)],
      assignedById: [''],
      assignedToId: [''],
      equipmentId: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      issueCategory: ['', Validators.required],
      severityType: ['', Validators.required],
      status: ['', Validators.required],
      // summary: ['', Validators.required],
      description: ['', Validators.required],
      ticketType: [this.category],
      empId:[localStorage.getItem('employeeId')]
    });

    this.states = states;

    // subscription
    this.employeeSearchSubscription();
    this.employeeSearchSubscription_2();
    this.machineSearchSubscription();
  }
  // #region Employee
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
        this.allEmployees = this.maintenanceRepairService.getEmployees(
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
    this.allEmployees = this.maintenanceRepairService.getEmployees(
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
    this.employeeInput.nativeElement.value = employee.first_name + ' ' + employee.last_name;

    // to enable submit button
    this.isEmployeeSelected = false;

    // assigning values in form
    this.createTicket.patchValue({
      assignedById: employee.id,
    });

    // clearing array
    this.allEmployees = of([]);
  }
  // #endregion
  // #region Employee_2
  employeeSearchSubscription_2() {
    this.employeesearch_2$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.employeeSearchValue_2 = value;

        // for asterik to look required
        if (value === '') {
          this.isEmployeeSelected_2 = true;
        }

        // calling API
        this.allEmployees_2 = this.maintenanceRepairService.getEmployees(
          this.employeeSearchValue_2,
          'employee'
        );

        // subscribing to show/hide field UL
        this.allEmployees_2.subscribe((employees) => {
          console.log('Employees:', employees);

          if (employees.count === 0) {
            // hiding UL
            this.employeeUL_2 = false;
          } else {
            this.employeeUL_2 = true;
          }
        });
      });
  }
  inputClickedEmployee_2() {
    // getting the serch value to check if there's a value in input
    this.employeesearch_2$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.employeeSearchValue_2 = v;
      });

    const value =
      this.employeeSearchValue_2 === undefined
        ? this.employee_name_2
        : this.employeeSearchValue_2;

    // calling API
    this.allEmployees_2 = this.maintenanceRepairService.getEmployees(
      this.employeeSearchValue_2,
      'employee'
    );

    // subscribing to show/hide field UL
    this.allEmployees_2.subscribe((employees) => {
      console.log('Employees:', employees);
      if (employees.count === 0) {
        // hiding UL
        this.employeeUL_2 = false;
      } else {
        // showing UL
        this.employeeUL_2 = true;
      }
    });
  }
  listClickedEmployee_2(employee) {
    console.log('Employee Object:', employee);
    // hiding UL
    this.employeeUL_2 = false;

    // passing name in select's input
    this.employeeInput2.nativeElement.value = employee.first_name + ' ' + employee.last_name;

    // to enable submit button
    this.isEmployeeSelected_2 = false;

    // assigning values in form
    this.createTicket.patchValue({
      assignedToId: employee.id,
    });

    // clearing array
    this.allEmployees_2 = of([]);
  }
  // #endregion
  //#region Machinery
  machineSearchSubscription() {
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.machineSearchValue = value;
        // for asterik to look required
        if (value === '') {
          this.isMachineSelected = true;
        }

        // calling API
        this.allMachinery = this.maintenanceRepairService.getMachinery(
          value,
          'allMachinery'
        );

        // subscribing to show/hide machine UL
        this.allMachinery.subscribe((machine) => {
          if (machine.count === 0) {
            // hiding UL
            this.machineUL = false;
            this.isMachineSelected = true;
          } else {
            this.machineUL = true;
          }
        });
      });
  }
  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machineSearchValue = v;
      });

    const value =
      this.machineSearchValue === undefined
        ? this.machine_name
        : this.machineSearchValue;

    // calling API
    this.allMachinery = this.maintenanceRepairService.getMachinery(
      value,
      'allMachinery'
    );

    // subscribing to show/hide field UL
    this.allMachinery.subscribe((machinery) => {
      console.log('--', machinery);
      if (machinery.count === 0) {
        // hiding UL
        this.machineUL = false;
      } else {
        // showing UL
        this.machineUL = true;
      }
    });
  }
  listClickedMachiney(machinery) {
    console.log('Machinery Object:', machinery);
    // hiding UL
    this.machineUL = false;

    // passing name in select's input
    this.machineryInput.nativeElement.value = machinery.name;

    // to enable submit button
    this.isMachineSelected = false;

    // assigning values in form
    this.createTicket.patchValue({
      equipmentId: machinery.id,
    });

    // clearing array
    this.allMachinery = of([]);
  }
  //#endregion

  submit() {
    console.log(this.createTicket.value);
    this.loadingSpinner.next(true);

    this.getCheckInID();

  }
  getCheckInID(){
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeCheckInSpinner.next(true);
      this.active_check_in_id = workOrder.dwr[0].id;
      this.activeCheckInSpinner.next(false);

       // submitting
      this.submitData();
    });

  }
  submitData(){
    this.maintenanceRepairService
    .save(this.createTicket.value, this.category,this.active_check_in_id)
    .subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.ticketRecordId  = res.id.record_id;

          // ticket nature
          this.taskType = 'ticket created';


             // create DWR
             this.createDWR();

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

  createDWR(){
   this.maintenanceRepairService
    .createDWR(localStorage.getItem('employeeId'),this.ticketRecordId, this.createTicket.get('assignedById').value,this.active_check_in_id,this.taskType)
    .subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {

          // form resetting
          this.createTicket.reset();
          this.employeeInput.nativeElement.value = '';
          this.employeeInput2.nativeElement.value ='';
          this.machineryInput.nativeElement.value = '';

         // to stop loader
         this.loadingSpinner.next(false);


          // tooltip
          this.toastService.presentToast(
           'Details have been submitted',
           'success'
         );


       // navigating
          this.router.navigateByUrl('/tabs/home/maintenance-repair');
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
