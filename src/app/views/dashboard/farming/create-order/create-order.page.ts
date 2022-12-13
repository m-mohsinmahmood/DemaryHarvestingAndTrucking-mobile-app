import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FarmingService } from './../farming.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {

  role = '';
  createOrderDispatcher: FormGroup;
  createOrderTDriver: FormGroup;

  //For Invalid
  isDispatcherSelected: any = true;

  // subjects
  dispatcher_search$ = new Subject();

  // input values
  dispatcher_name: any = '';

  // input's search values
  dispatcherSearchValue: any;

  // observables
  allDispatchers: Observable<any>;

  // filters form
  dispatcherFiltersForm: FormGroup;

  isDisabled: any = true;

  // to show UL's
  dispatcherUL: any = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService) { }

  ngOnInit() {
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
      workOrderId: ['', [Validators.required]],
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

  inputClickedDispatcher() {
    // getting the serch value to check if there's a value in input
    this.dispatcher_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.dispatcherSearchValue = v;
      });

    const value =
      this.dispatcherSearchValue === undefined
        ? this.dispatcher_name
        : this.dispatcherSearchValue;

    // calling API
    this.allDispatchers = this.farmingService.getEmployees(
      value
    );

    // subscribing to disable & enable farm, crop inputs
    this.allDispatchers.subscribe((dispatcher) => {
      console.log('d',dispatcher);
      // this.isDisabled = customers.count === 0 ? true : false;
      if (dispatcher.count === 0) {
        this.isDisabled = true;

        // clearing the input values in farm, crop after getting disabled
        // this.farm_name = '';
        // this.crop_name = '';

        // hiding UL
        this.dispatcherUL = false;
      } else {
        this.isDisabled = false;
        // showing UL
        this.dispatcherUL = true;
      }
    });
  }

}
