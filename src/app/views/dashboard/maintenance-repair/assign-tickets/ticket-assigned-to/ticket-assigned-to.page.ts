/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceRepairService } from '../../maintenance-repair.services';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-ticket-assigned-to',
  templateUrl: './ticket-assigned-to.page.html',
  styleUrls: ['./ticket-assigned-to.page.scss'],
})
export class TicketAssignedToPage implements OnInit {
  @ViewChild('employeeInput') employeeInput: ElementRef;
  @ViewChild('employeeInput2') employeeInput2: ElementRef;
  assignTicket: FormGroup;

  // behaviour subject's for loader
  public loading = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);
  public loadingSpinnerContinue = new BehaviorSubject(false);
  public loadingSpinnerComplete = new BehaviorSubject(false);

  ticketData: any;
  ticketRecordId: any;
  value: any;
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

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private maintenanceRepairService: MaintenanceRepairService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private toastService: ToastService
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
    });
  }

  ngOnInit() {
    this.initForm();

    this.route.queryParams.subscribe((res) => {
      console.log('query Params', res);
      this.ticketRecordId = res.ticketRecordId;
       this.value = res.entity;
    });

    // getting ticket record
    if (this.value === 'assign') {
      this.getUnAssignedTicketRecord();
    } else {
      this.getAssignedTicketRecord();
    }

    //subscription
    this.employeeSearchSubscription();
    this.employeeSearchSubscription_2();
  }
  initForm() {
    this.assignTicket = this.formBuilder.group({
      repairTicketId: [''],
      empModule: [''],
      assignedById: [''],
      assignedToId: [''],
      equipID: [''],
      city: [''],
      state: [''],
      issueCategory: [''],
      severityType: [''],
      status: [''],
      summary: [''],
      description: [''],
    });
  }
  getAssignedTicketRecord() {
    // getting ticket record
    this.maintenanceRepairService
      .getTicketRecordById(this.ticketRecordId, 'assignedTicketRecord')
      .subscribe((res) => {
        console.log('res', res);
        this.loading.next(true);
        this.ticketData = res[0];
        this.loading.next(false);

        //patching value's conditionally
        // if(this.value === 'assign'){
        //   this.assignTicket.patchValue({
        //     repairTicketId: this.ticketData.repairTicketId,
        //     equipID: this.ticketData.equipmentId,
        //     city: this.ticketData.city,
        //     state: this.ticketData.state,
        //     issueCategory: this.ticketData.issueCategory,
        //     severityType: this.ticketData.severityType,
        //     status: this.ticketData.status,
        //     description: this.ticketData.description,
        //   });
        // }else{
          this.assignTicket.patchValue({
            repairTicketId: this.ticketData.repairTicketId,
            assignedById: this.ticketData.assignedById,
            assignedToId: this.ticketData.assignedToId,
            empModule: this.ticketData.empModule,
            equipID: this.ticketData.equipmentId,
            city: this.ticketData.city,
            state: this.ticketData.state,
            issueCategory: this.ticketData.issueCategory,
            severityType: this.ticketData.severityType,
            status: this.ticketData.status,
            description: this.ticketData.description,
          });
          this.employee_name = this.ticketData.assignedBy;
          this.employee_name_2 = this.ticketData.assignedTo;
        // }
      });
  }
  getUnAssignedTicketRecord() {
    // getting ticket record
    this.maintenanceRepairService
      .getTicketRecordById(this.ticketRecordId, 'unassignedTicketRecord')
      .subscribe((res) => {
        console.log('res', res);
        this.loading.next(true);
        this.ticketData = res[0];
        this.loading.next(false);

        //patching value's conditionally
        // if(this.value === 'assign'){
          this.assignTicket.patchValue({
            repairTicketId: this.ticketData.repairTicketId,
            equipID: this.ticketData.equipmentId,
            city: this.ticketData.city,
            state: this.ticketData.state,
            issueCategory: this.ticketData.issueCategory,
            severityType: this.ticketData.severityType,
            status: this.ticketData.status,
            description: this.ticketData.description,
          });
        // }else{
        //   this.assignTicket.patchValue({
        //     repairTicketId: this.ticketData.repairTicketId,
        //     assignedById: this.ticketData.assignedById,
        //     assignedToId: this.ticketData.assignedToId,
        //     empModule: this.ticketData.empModule,
        //     equipID: this.ticketData.equipmentId,
        //     city: this.ticketData.city,
        //     state: this.ticketData.state,
        //     issueCategory: this.ticketData.issueCategory,
        //     severityType: this.ticketData.severityType,
        //     status: this.ticketData.status,
        //     description: this.ticketData.description,
        //   });
        //   this.employee_name = this.ticketData.assignedBy;
        //   this.employee_name_2 = this.ticketData.assignedTo;
        // }
      });
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
    // to disable this function when value is 'repair' & 'maintenance'
    if(this.value === 'assign'){
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
    this.assignTicket.patchValue({
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
        // to disable this function when value is 'repair' & 'maintenance'
    if(this.value === 'assign'){
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
    this.assignTicket.patchValue({
      assignedToId: employee.id,
    });

    // clearing array
    this.allEmployees_2 = of([]);
  }
  // #endregion

  submit() {
    this.loadingSpinner.next(true);

    console.log(this.assignTicket.value);
    this.maintenanceRepairService
      .ticket(this.assignTicket.value, this.ticketRecordId,'unassign')
      .subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            this.router.navigateByUrl('/tabs/home/maintenance-repair/assign-tickets');
            this.toastService.presentToast(
              'Ticket has been assigned',
              'success'
            );
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          console.log('ERROR::', err);
          this.toastService.presentToast(err.mssage, 'danger');
        }
      );
  }
  completTicket(){
    console.log(this.assignTicket.value);
    this.loadingSpinnerComplete.next(true);

    this.maintenanceRepairService
      .ticket(this.assignTicket.value, this.ticketRecordId,'complete')
      .subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.loadingSpinnerComplete.next(false);

            // this.router.navigateByUrl('/tabs/home/maintenance-repair/assign-tickets');
            this.toastService.presentToast(
              'Ticket has been completed',
              'success'
            );
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          console.log('ERROR::', err);
          this.toastService.presentToast(err.mssage, 'danger');
        }
      );
      // creating DWR
      this.createDWR();

  }
  continue(){
    console.log(this.assignTicket.value);
    this.loadingSpinnerContinue.next(true);

    this.maintenanceRepairService
      .ticket(this.assignTicket.value, this.ticketRecordId,'continue')
      .subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.loadingSpinnerContinue.next(false);

            this.router.navigateByUrl('/tabs/home/maintenance-repair/assign-tickets');
            this.toastService.presentToast(
              'Ticket has been paused',
              'success'
            );
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          console.log('ERROR::', err);
          this.toastService.presentToast(err.mssage, 'danger');
        }
      );
  }
  createDWR(){
    this.maintenanceRepairService
     .createDWR(localStorage.getItem('employeeId'), this.ticketRecordId,this.assignTicket.get('assignedById').value)
     .subscribe(
       (res) => {
         console.log('RES:', res);
         if (res.status === 200) {
          this.router.navigateByUrl('/tabs/home/maintenance-repair');
           // this.toastService.presentToast(
           //   'Ticket has been completed',
           //   'success'
           // );
         } else {
           console.log('Something happened :)');
           this.toastService.presentToast(res.mssage, 'danger');
         }
       },
       (err) => {
         console.log('ERROR::', err);
         this.toastService.presentToast(err.mssage, 'danger');
       }
     );
 }
}
