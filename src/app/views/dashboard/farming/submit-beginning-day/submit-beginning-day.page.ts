import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FarmingService } from '../farming.service';
import { ToastService } from 'src/app/services/toast/toast.service';

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
  workOrderUL: any = false;

  isDisabled: any = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  data: Observable<any>;
  workOrderCount = -1;
  dataLoaded = false;
  public loadingSpinner = new BehaviorSubject(false);

  constructor(private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService, private renderer: Renderer2) {
    if (localStorage.getItem('role').includes( 'Tractor Driver')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]); // to clear array
          this.machineryUL = false; // to hide the UL
        }
        console.log(this.workOrderCount);

        if (this.workOrderCount >= 0) {
          if (e.target !== this.workOrderInput.nativeElement) {
            this.allWorkOrder = of([]); // to clear array
            this.workOrderUL = false; // to hide the UL
          }
        }
      });
    }
  }

  ngOnInit() {
    this.initDataRetrieval();
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
  }

  initDataRetrieval() {
    this.machinerySearchSubscription();
    this.workOrderSearchSubscription();

    this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay', 'farming').subscribe(workOrder => {
      this.workOrderCount = workOrder.count;
      this.dataLoaded = true;
      if (this.workOrderCount > 0)
        this.workOrder_name = workOrder.workOrders[0].work_order_id;
      console.log(workOrder);

    })

    this.submitBeginningDay = this.formBuilder.group({
      employeeId: [localStorage.getItem('employeeId')],
      machineryId: ['', [Validators.required]],
      beginningEngineHours: ['', [Validators.required]],
      workOrderId: ['', [Validators.required]]
    });
  }

  navigateTo(nav: string) {
    this.loadingSpinner.next(true)
    console.log(this.submitBeginningDay.value);

    this.farmingService.updateWorkOrder(this.submitBeginningDay.value, 'Tractor Driver', 'submitBeginningDay')
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );

    this.farmingService.createBeginningDay(this.submitBeginningDay.value, 'farming')
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast("DWR has been created successfully!", 'success');
            this.router.navigateByUrl(nav);
            this.loadingSpinner.next(false)
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
          this.loadingSpinner.next(false)
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
        this.allMachinery = this.farmingService.getMachinery(
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
    this.allMachinery = this.farmingService.getMachinery(
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
      beginningEngineHours: machinery.odometer_reading_end
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
        this.allWorkOrder = this.farmingService.getAllWorkOrders(
          value,
          'beginningOfDay',
          localStorage.getItem('employeeId')
        );

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
    this.allWorkOrder = this.farmingService.getAllWorkOrders(
      value,
      'beginningOfDay',
      localStorage.getItem('employeeId')
    );

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
      workOrderId: workOrder.id
    });

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
