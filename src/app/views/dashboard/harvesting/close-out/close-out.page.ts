/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
// import * as moment from 'moment';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-close-out',
  templateUrl: './close-out.page.html',
  styleUrls: ['./close-out.page.scss'],
})
export class CloseOutPage implements OnInit {
  @ViewChild('customerInput') customerInput: ElementRef;
  isCustomerSelected: any = true;
  customer_search$ = new Subject();
  customer_name: any = '';
  customerSearchValue: any;
  allCustomers: Observable<any>;
  customerUL: any = false;
  customerId: any;

  closeJobFormCrew: FormGroup;
  closeJobFormCombine: FormGroup;
  closeJobFormKart: FormGroup;
  date;
  customerData: any;
  isLoading: any;
  role: any;
  sub;
  loadingSub;
  public loadingSpinner = new BehaviorSubject(false);
  isDisabled: boolean;
  farm_name: string;
  isFarmSelected: boolean;
  isFieldDisabled: boolean;
  customerName;
  state;
  farm;
  crop;
  crewChiefName;

  constructor(
    private formBuilder: FormBuilder,
    private harvestingservice: HarvestingService,
    private toastService: ToastService,
    private router: Router,
    private renderer: Renderer2
  ) {
    if (localStorage.getItem('role').includes('Crew Chief')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.customerInput.nativeElement) {
          if (this.customerSearchValue === '' || this.customerSearchValue === undefined) {
            this.isDisabled = true;
            this.farm_name = '';
            this.customerUL = false; // to hide the UL
            this.isCustomerSelected = true;
            this.isFarmSelected = true;
            this.isFieldDisabled = true;
          }
          else {
            this.isDisabled = false;
            this.allCustomers = of([]); // to clear array
            this.customerUL = false; // to hide the UL
          }
        }
      });
    }
  }

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit() {
    // getting role
    this.customerSearchSubscription();

    this.role = localStorage.getItem('role');

    this.initForms();
    this.initApis();
    this.initObservables();
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // this.sub.unsubscribe();
    // this.loadingSub.unsubscribe();
  }

  initForms() {
    this.closeJobFormCrew = this.formBuilder.group({
      job_id: [''],
      customer_id: [''],
      crew_chief_id: localStorage.getItem('employeeId'),
      is_close_crew: [true],
      total_acres: [''],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      field_id: ['']
    });
    this.closeJobFormCombine = this.formBuilder.group({
      customer_id: [],
      employee_id: localStorage.getItem('employeeId'),
      is_close_combine: [true],
      total_acres: ['', [Validators.required]],
      total_gps_acres: ['', [Validators.required]],
    });
    this.closeJobFormKart = this.formBuilder.group({
      customer_id: [],
      employee_id: localStorage.getItem('employeeId'),
      is_close_kart: [true],
      total_acres: ['', [Validators.required]],
      total_gps_acres: ['', [Validators.required]],
    });
  }

  initApis() {

    // if (this.role.includes('Crew Chief')) {
    //   console.log(localStorage.getItem('employeeId'));

    //   // this.harvestingservice.getJobSetup('Crew Chief', localStorage.getItem('employeeId'));
    // }
  }

  initObservables() {
    // this.sub = this.harvestingservice.customerJobSetup$.subscribe((res) => {
    //   console.log(res);
    //   this.customerData = res;
    //   // For Crew Chief
    //   if (this.role.includes('Crew Chief')) {
    //     this.closeJobFormCrew.patchValue({
    //       customer_id: this.customerData?.customer_job[0]?.customer_id,
    //       state: this.customerData?.customer_job[0]?.state,
    //       farm_id: this.customerData?.customer_job[0]?.farm_id,
    //       crop_id: this.customerData?.customer_job[0]?.crop_id,
    //       field_id: this.customerData?.customer_job[0]?.field_id
    //     });
    //   }
    //   // For combine operator
    //   else if (this.role.includes('Combine Operator')) {
    //     this.closeJobFormCombine.patchValue({
    //       customer_id: this.customerData?.customer_job[0]?.customer_id
    //     });
    //   }
    //   // For Cart Operator
    //   else if (this.role.includes('Cart Operator')) {
    //     this.closeJobFormKart.patchValue({
    //       customer_id: this.customerData?.customer_job[0]?.customer_id
    //     });
    //   }

    // });
    // this.loadingSub = this.harvestingservice.customerLoading$.subscribe((val) => {
    //   console.log('value', val);
    //   this.isLoading = val;
    // });
  }
  submit() {
    // console.log(this.closeJobFormCombine.value);
    // console.log(this.closeJobFormKart.value);

    // this.closeJobFormCrew.value.changeFarmFieldCrop = true;
    this.closeJobFormCrew.value.closeJob = true;

    console.log(this.closeJobFormCrew.value);

    if (this.role.includes('Crew Chief')) {
      this.loadingSpinner.next(true);
      this.harvestingservice.createJob(this.closeJobFormCrew.value).subscribe(
        (res: any) => {
          console.log('Response of Close-Out Job:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            this.closeJobFormCrew.reset();
            this.customerName = '';
            this.state = '';
            this.farm = '';
            this.crop = '';
            this.crewChiefName = '';
            this.date = '';
            this.customerInput.nativeElement.value = '';
            this.toastService.presentToast(res.message, 'success');

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error in Close-Out Job:', err);
        },
      );
    } else if (this.role.includes('Combine Operator')) {
      this.loadingSpinner.next(true);
      this.harvestingservice.closeOutJob(this.closeJobFormCombine.value).subscribe(
        (res: any) => {
          console.log('Response of Close-Out Job:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);
            this.closeJobFormCrew.reset();
            this.toastService.presentToast(res.message, 'success');

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error in Close-Out Job:', err.message);
        },
      );
    } else if (this.role.includes('Cart Operator')) {
      this.loadingSpinner.next(true);
      this.harvestingservice.closeOutJob(this.closeJobFormKart.value).subscribe(
        (res: any) => {
          console.log('Response of Close-Out Job:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');

            this.closeJobFormCrew.reset();
            this.toastService.presentToast(res.message, 'success');
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error in Close-Out Job:', err.message);
        },
      );
    }
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
        // passing for renderer2
        this.customerSearchValue = value;

        // for asterik to look required
        if (value === '') { this.isCustomerSelected = true; }

        this.allCustomers = this.harvestingservice.getInvoicedJobs(
          'getInvoicedJobs',
          this.role,
          localStorage.getItem('employeeId')
        );
        // showing UL
        this.customerUL = true;

        // subscribing to disable & enable farm, crop inputs
        this.allCustomers.subscribe((customers) => {
          if (customers.count === 0) {
            console.log('customers:', customers.count);
            this.isDisabled = true;
            this.isFieldDisabled = true

            // clearing the input values in farm, crop after getting disabled

            // this.crop_name = '';

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
    this.allCustomers = this.harvestingservice.getInvoicedJobs(
      'getInvoicedJobs',
      this.role,
      localStorage.getItem('employeeId')
    );

    // subscribing to disable & enable farm, crop inputs
    this.allCustomers.subscribe((customers) => {
      console.log(customers);

      // this.isDisabled = customers.count === 0 ? true : false;
      if (customers.count === 0) {
        this.isDisabled = true;

        // clearing the input values in farm, crop after getting disabled
        // this.farm_name = '';
        // this.crop_name = '';

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
    console.log(customer);
    // clearing array
    this.allCustomers = of([]);
    // this.allFarms = of([]);
    // this.allFarmsClicked = of([]);
    // this.allCrops = of([]);
    // this.allCropsClicked = of([]);

    // clearing value from farm & crop input
    // this.farm_name = '';
    // this.crop_name = '';

    // hiding UL
    this.customerUL = false;

    // assigning values in form
    if (localStorage.getItem('role').includes('Crew Chief')) {
      this.closeJobFormCrew.patchValue({
        job_id: customer.job_id,
        crop_id: customer.crop_id,
        customer_id: customer.customer_id,
        farm_id: customer.farm_id,
        state: customer.state,
      });

      this.customerName = customer.customer_name;
      this.state = customer.state;
      this.farm = customer.farm_name;
      this.crop = customer.crop_name;
      this.date = customer.created_at;
      this.crewChiefName = customer.crew_chief_name
    }

    // passing name in select's input
    this.customerInput.nativeElement.value = customer.job_id;

    // passing name in customer-search-value in Rendered2 for checks
    this.customerSearchValue = customer.customer_name;
    // to enable submit button
    this.isCustomerSelected = false;

    // passing the customer id to  select farm & crop id
    this.customerId = customer.id;

  }
  //#endregion

  disableFields() {
    this.isDisabled = true;
  }
}
