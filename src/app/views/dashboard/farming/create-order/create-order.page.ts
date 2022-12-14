import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FarmingService } from './../farming.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;

  role = '';
  createOrderDispatcher: FormGroup;
  createOrderTDriver: FormGroup;

  //For Invalid
  isTDriverSelected: any = true;

  // subjects
  tDriver_search$ = new Subject();

  // input values
  tDriver_name: any = '';

  // input's search values
  tDriverSearchValue: any;

  // observables
  alltDrivers: Observable<any>;

  // filters form
  tDriverFiltersForm: FormGroup;

  isDisabled: any = true;

  // to show UL's
  tDriverUL: any = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.customerInput.nativeElement) {
        // this.isDisabled =
        // this.tDriverFiltersForm.controls['customer_id'].value === '' ? true : false;
        this.alltDrivers = of([]); // to clear array
        this.tDriverUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    this.customerSearchSubscription();

    this.role = localStorage.getItem('role');
    this.createOrderDispatcher = this.formBuilder.group({
      dispatcherId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      farmId: ['', [Validators.required]],
      fieldId: ['', [Validators.required]],
      service: ['', [Validators.required]],
      tractorDriver: ['', [Validators.required]],
      fieldAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    this.createOrderTDriver = this.formBuilder.group({
      machineryID: ['', [Validators.required]],
      cBeginningEngineHours: ['', [Validators.required]],
      dispatcherId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      farmId: ['', [Validators.required]],
      fieldId: ['', [Validators.required]],
      service: ['', [Validators.required]],
      tractorDriverId: ['', [Validators.required]],
      fieldAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  navigateTo(nav: string) {
    if (this.role === 'dispatcher') {
      console.log(this.createOrderDispatcher.value);
      this.createWorkOrder(this.createOrderDispatcher.value);
    }
    else {
      console.log(this.createOrderTDriver.value);
      this.createWorkOrder(this.createOrderTDriver.value);
    }

    this.router.navigateByUrl(nav);
  }

  createWorkOrder(workOrder: any): void {
    this.farmingService.createNewWorkOrder(workOrder);
  }

  ///////////// Lists Methods //////////////////////

  //Dispatcher
  customerSearchSubscription() {
    // clearing array to show only spiner
    this.alltDrivers = of([]);

    this.tDriver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {

        this.alltDrivers = this.farmingService.getEmployees(
          value,
          'allEmployees',
          'Dispatcher'
        );
        // showing UL
        this.tDriverUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.alltDrivers.subscribe((customers) => {
          // this.isDisabled = customers.count === 0 ? true : false;
          if (customers.count === 0) {
            this.isDisabled = true;

            // hiding UL
            this.tDriverUL = false;
          } else {
            this.isDisabled = false;
          }
        });
      });
  }

  inputClickedDispatcher() {
    // getting the serch value to check if there's a value in input
    this.tDriver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.tDriverSearchValue = v;
      });

    const value =
      this.tDriverSearchValue === undefined
        ? this.tDriver_name
        : this.tDriverSearchValue;

    // calling API
    this.alltDrivers = this.farmingService.getEmployees(
      value,
      'allEmployees',
      'Dispatcher'
    );

    // subscribing to disable & enable farm, crop inputs
    this.alltDrivers.subscribe((dispatcher) => {
      console.log('d', dispatcher);
      // this.isDisabled = customers.count === 0 ? true : false;

      this.isDisabled = false;
      // showing UL
      this.tDriverUL = true;
    });
  }

  listClickedCustomer(tDriver) {
    // clearing array
    this.alltDrivers = of([]);

    // hiding UL
    this.tDriverUL = false;

    // removing farm & crop name from select
    this.createOrderTDriver.setValue({
      machineryID: this.createOrderTDriver.get('machineryID').value,
      cBeginningEngineHours: this.createOrderTDriver.get('cBeginningEngineHours').value,
      dispatcherId: '',
      customerId: '',
      farmId: '',
      fieldId: '',
      service: '',
      tractorDriverId: '',
      fieldAddress: '',
      phone: '',
    });

    // assigning values in form
    this.createOrderTDriver.setValue({
      machineryID: this.createOrderTDriver.get('machineryID').value,
      cBeginningEngineHours: this.createOrderTDriver.get('cBeginningEngineHours').value,
      dispatcherId: tDriver.id,
      customerId: '',
      farmId: '',
      fieldId: '',
      service: '',
      tractorDriverId: '',
      fieldAddress: '',
      phone: '',
    });

    // passing name in select's input
    this.tDriver_name = tDriver.first_name;

    // to enable submit button
    this.isTDriverSelected = false;
  }

  disableFields() {
    this.isDisabled = true;
  }
}
