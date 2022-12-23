import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { FarmingService } from './../farming.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-close-out-order',
  templateUrl: './close-out-order.page.html',
  styleUrls: ['./close-out-order.page.scss'],
})
export class CloseOutOrderPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;

  isCustomerSelected: any = true;
  customer_search$ = new Subject();
  customer_name: any = '';
  customerSearchValue: any;
  allCustomers: Observable<any>;
  customerUL: any = false;
  customerId: any;

  isDisabled: any = true;

  closeOutWorkOrder: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.customerInput.nativeElement) {
        this.allCustomers = of([]); // to clear array
        this.customerUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    this.customerSearchSubscription();

    this.closeOutWorkOrder = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      acresByService: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      gpsAcresByService: ['', [Validators.required]]
    });
  }

  navigateTo() {
    console.log(this.closeOutWorkOrder.value);
    this.farmingService.updateWorkOrder(this.closeOutWorkOrder.value, 'tractor-driver');

    this.router.navigateByUrl('/tabs/home/farming');
  }

  //  #region Customer
  customerSearchSubscription() {
    // clearing array to show only spiner
    this.allCustomers = of([]);

    this.customer_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isCustomerSelected = true; }


        this.allCustomers = this.farmingService.getAllWorkOrders(value, 'close_out_work_order');
        // showing UL
        this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers) => {
          console.log(customers);

          if (customers.count === 0) {
            this.isDisabled = true;

            // hiding UL
            this.customerUL = false;
          } else {
            this.isDisabled = false;
          }
        });
      });
  }

  inputClickedCustomer() {
    // getting the serch value to check if there's a value in input
    this.customer_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.customerSearchValue = v;
      });

    const value =
      this.customerSearchValue === undefined
        ? this.customer_name
        : this.customerSearchValue;

    // calling API
    this.allCustomers = this.farmingService.getAllWorkOrders(value, 'close_out_work_order');

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((customers) => {
      console.log(customers);

      // this.isDisabled = customers.count === 0 ? true : false;
      if (customers.count === 0) {
        this.isDisabled = true;

        // hiding UL
        this.customerUL = false;
      } else {
        this.isDisabled = false;
        // showing UL
        this.customerUL = true;
      }
    });
  }

  listClickedCustomer(customer) {
    // clearing array
    this.allCustomers = of([]);

    // hiding UL
    this.customerUL = false;

    // assigning values in form
    this.closeOutWorkOrder.setValue({
      customerId: customer.customer_id,
      acresByService: this.closeOutWorkOrder.get('acresByService').value,
      endingEngineHours: this.closeOutWorkOrder.get('endingEngineHours').value,
      gpsAcresByService: this.closeOutWorkOrder.get('gpsAcresByService').value,

    });
    // passing name in select's input
    this.customer_name = customer.customer_first_name;

    // to enable submit button
    this.isCustomerSelected = false;

    // passing the customer id to  select farm & crop id
    this.customerId = customer.customer_id;
  }
  //#endregion

  disableFields() {
    this.isDisabled = true;
  }
}

