import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FarmingService } from '../../../farming/farming.service';
import { TruckingService } from './../../trucking.service';

@Component({
  selector: 'app-submit-beginning-day',
  templateUrl: './submit-beginning-day.page.html',
  styleUrls: ['./submit-beginning-day.page.scss'],
})
export class SubmitBeginningDayPage implements OnInit {

  submitBeginningDay: FormGroup;
  @ViewChild('machineryInput') machineryInput: ElementRef;
  isMachinerySelected: any = true;
  machinery_search$ = new Subject();
  machinery_name: any = '';
  machinerySearchValue: any;
  allMachinery: Observable<any>;
  machineryUL: any = false;

  @ViewChild('workOrderInput') workOrderInput: ElementRef;
  isWorkOrderSelected: any = true;
  workOrder_search$ = new Subject();
  workOrder_name: any = '';
  workOrderSearchValue: any;
  allWorkOrder: Observable<any>;
  allMotorizedVehicle: Observable<any>;
  workOrderUL: any = false;

  isDisabled: any = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  data: Observable<any>;
  workOrderCount = -1;
  dataLoaded = false;
  role;

  constructor(private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private truckingService: TruckingService, private renderer: Renderer2) {
    // if (localStorage.getItem('role') === 'tractor-driver') {
    this.renderer.listen('window', 'click', (e) => {
      // if (e.target !== this.machineryInput.nativeElement) {
      //   this.allMachinery = of([]); // to clear array
      //   this.machineryUL = false; // to hide the UL
      // }

      if (this.workOrderCount >= 0) {
        if (e.target !== this.workOrderInput.nativeElement) {
          this.allWorkOrder = of([]); // to clear array
          this.workOrderUL = false; // to hide the UL
        }
      }
    });
    // }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // this.machinerySearchSubscription();
    this.workOrderSearchSubscription();

    // this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay').subscribe(workOrder => {
    //   this.workOrderCount = workOrder.count;
    //   this.dataLoaded = true;
    //   if (this.workOrderCount > 0)
    //     this.workOrder_name = workOrder.workOrders[0].work_order_id;
    //   console.log(workOrder);

    // })

    this.submitBeginningDay = this.formBuilder.group({
      employeeId: [localStorage.getItem('employeeId')],
      machineryId: ['', [Validators.required]],
      begining_odometer_miles: ['', [Validators.required]],
      deliveryTicketId: ['', [Validators.required]]
    });
  }

  navigateTo(nav: string) {
    console.log(this.submitBeginningDay.value);

    this.truckingService.updateDeliveryTicket({
      ticketNo: this.submitBeginningDay.get('deliveryTicketId').value,
      isTicketActive: true
    }, 'sent')
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );

    this.truckingService.createDWR(this.submitBeginningDay.value, 'trucking')
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast('DWR has been created successfully!', 'success');
            this.router.navigateByUrl(nav);
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

  //#region Machinery
  machinerySearchSubscription() {
    this.machinery_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isMachinerySelected = true; }
        this.allMachinery = this.truckingService.getTruck(
          value,
          'allMotorizedVehicles'
        );

        // subscribing to show/hide Field UL
        this.allMachinery.subscribe((machinery) => {
          if (machinery.count === 0) {
            // hiding UL
            this.machineryUL = false;
          } else {
            // showing UL
            this.machineryUL = true;
          }
        });
      });
  }

  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machinery_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machinerySearchValue = v;
      });

    const value =
      this.machinerySearchValue === undefined
        ? this.machinery_name
        : this.machinerySearchValue;

    // calling API
    this.allMachinery = this.truckingService.getTruck(
      value,
      'allMotorizedVehicles'
    );

    // subscribing to show/hide farm UL
    this.allMachinery.subscribe((machinery) => {

      if (machinery.count === 0) {
        // hiding UL
        this.machineryUL = false;
      } else {
        // showing UL
        this.machineryUL = true;
      }
    });
  }
  listClickedMachinery(machinery) {

    // hiding UL
    this.machineryUL = false;
    console.log(machinery);

    // assigning values in form
    this.submitBeginningDay.patchValue({
      machineryId: machinery.id,
      begining_odometer_miles: machinery.odometer_reading_end
    });

    // clearing array
    this.allMachinery = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.machineryInput.nativeElement.value = machinery.type;
    console.log(this.machinery_name);

    // to enable submit button
    this.isMachinerySelected = false;
  }
  //#endregion

  //#region Work Order
  workOrderSearchSubscription() {
    this.workOrder_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isWorkOrderSelected = true; }
        this.allWorkOrder = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home', true, false, false);

        // subscribing to show/hide Field UL
        this.allWorkOrder.subscribe((workOrder) => {
          if (workOrder.count === 0) {
            // hiding UL
            this.workOrderUL = false;
          } else {
            // showing UL
            this.workOrderUL = true;
          }
        });
      });
  }

  inputClickedWorkOrder() {
    // getting the serch value to check if there's a value in input
    this.workOrder_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.workOrderSearchValue = v;
      });

    const value =
      this.workOrderSearchValue === undefined
        ? this.workOrder_name
        : this.workOrderSearchValue;

    // calling API
    this.allWorkOrder = this.truckingService.getDeliveryTickets(this.role, 'sent', localStorage.getItem('employeeId'), 'home', true, false, false);

    // subscribing to show/hide farm UL
    this.allWorkOrder.subscribe((workOrder) => {
      if (workOrder.count === 0) {
        // hiding UL
        this.workOrderUL = false;
      } else {
        // showing UL
        this.workOrderUL = true;
      }
    });
  }
  listClickedWorkOrder(workOrder) {

    // hiding UL
    this.workOrderUL = false;
    console.log(workOrder);

    // assigning values in form
    this.submitBeginningDay.patchValue({
      deliveryTicketId: workOrder.id,
      machineryId: workOrder.truck_id
    });

    this.allMotorizedVehicle = this.truckingService.getMotorizedVehicles(this.submitBeginningDay.get('machineryId').value);
    this.allMotorizedVehicle.subscribe(param => {
      console.log(param);
      this.submitBeginningDay.patchValue({
        begining_odometer_miles: param.odometer_reading_end
      });
    })

    // clearing array
    this.allWorkOrder = of([]);

    // For Specific Fields
    // this.fieldId = field.id;

    // passing name in select's input
    this.workOrderInput.nativeElement.value = workOrder.id;

    // to enable submit button
    this.isWorkOrderSelected = false;
  }
  //#endregion
}
