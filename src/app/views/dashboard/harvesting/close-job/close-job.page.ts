/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-close-job',
  templateUrl: './close-job.page.html',
  styleUrls: ['./close-job.page.scss'],
})
export class CloseJobPage implements OnInit {
  role = '';
  closeJobFormCrew: FormGroup;
  closeJobFormCombine: FormGroup;
  closeJobFormKart: FormGroup;
  closeJobFormTruck: FormGroup;

  customerData: any;
  isLoadingCustomer$;
  dataDWR: any;
  job;
  sub;
  truckId;
  private initDataRetrievalExecuted = false;
  private ionViewRetrievalExecuted = true;
  customerName;
  state;
  farm;
  crop;
  crewChiefName;
  date;

  showValidationMessage_1;
  showValidationMessage_2;


  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dwrServices: CheckInOutService

  ) {

  }

  ngOnInit() {
    if (!this.initDataRetrievalExecuted) {
      this.role = localStorage.getItem('role');
      this.initForms();
      this.initApis();
      this.initObservables();
      this.initDataRetrievalExecuted = true;
      console.log("On Init");
    }
  }

  async ionViewDidEnter() {
    if (!this.ionViewRetrievalExecuted) {
      this.role = localStorage.getItem('role');
      this.initForms();
      this.initApis();
      this.initObservables();
      this.ionViewRetrievalExecuted = true;
      console.log("Ion view did enter");
    }
  }

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnDestroy(): void {
    this.DataDestroy();
  }

  async ionViewDidLeave() {
    this.DataDestroy();
    this.ionViewRetrievalExecuted = false;
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.sub.unsubscribe();
    // this.isLoadingCustomer$.unsubscribe();
  }

  initApis() {
    if (this.role.includes('Crew Chief')) {
      this.activeRoute.params.subscribe((param) => {
        this.truckId = param.machinery_id;
      });

      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting',
        this.role
      );
    }

    else if (this.role.includes('Combine Operator')) {
      this.activeRoute.params.subscribe((param) => {
        this.truckId = param.machinery_id;
      });

      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting',
        this.role
      );

      this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
        console.log('Active Check In ', workOrder.dwr);

        this.closeJobFormCombine.patchValue({
          module: workOrder.dwr[0].module,
          dwrId: workOrder.dwr[0].id
        });
      });
    }

    else if (this.role.includes('Truck Driver')) {
      this.activeRoute.params.subscribe((param) => {
        this.closeJobFormTruck.patchValue({
          jobId: param.id,
          employeeId: localStorage.getItem('employeeId'),
          module: 'harvesting'
        });
        console.log(param);
        this.truckId = param.truck_id;
      });

      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting',
        this.role
      );

      this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
        console.log('Active Check In ', workOrder.dwr);

        this.closeJobFormTruck.patchValue({
          module: workOrder.dwr[0].module,
          dwrId: workOrder.dwr[0].id
        });
      });
    }

    else if (this.role.includes('Cart Operator')) {
      this.activeRoute.params.subscribe((param) => {
        this.truckId = param.machinery_id;
      });

      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting',
        this.role
      );

      this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {

        this.closeJobFormKart.patchValue({
          module: workOrder.dwr[0].module,
          dwrId: workOrder.dwr[0].id
        })
      });
    }
  }

  initObservables() {
    this.sub = this.harvestingService.customer$.subscribe((res) => {
      console.log('res', res);
      this.customerData = res;
      if (this.customerData?.workOrders) {

        if (this.role.includes('Combine Operator') || this.role.includes('Cart Operator') || this.role.includes('Truck Driver')) {

          this.date = this.customerData.workOrders[0].created_at;
          this.customerName = this.customerData.workOrders[0].customer_name;
          this.state = this.customerData.workOrders[0].state;
          this.farm = this.customerData.workOrders[0].farm_name;
          this.crop = this.customerData.workOrders[0].crop_name;
          this.crewChiefName = this.customerData.workOrders[0].crew_chief_name;
        }

        if (this.role.includes('Cart Operator')) {
          this.closeJobFormKart.patchValue({
            // passing to pre-filled
            jobId: this.customerData?.workOrders[0]?.id,
          });

        }
      }
    });

    //Loader
    this.isLoadingCustomer$ = this.harvestingService.customerLoading$;
  }

  goBack() {
    this.location.back();
  }

  initForms() {
    this.closeJobFormCrew = this.formBuilder.group({
      ending_separator_hours: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      employeeId: localStorage.getItem('employeeId'),
      module: ['']
    });

    this.closeJobFormCombine = this.formBuilder.group({
      ending_separator_hours: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      employeeId: [localStorage.getItem('employeeId')],
      customer_id: [''],
      state: [''],
      farm_id: [''],
      crop_id: [''],
      crew_chief_id: [''],
      jobId: [''],
      module: [''],
      dwrId: ['']
    });

    // end of day validation for hours (combine)
    this.closeJobFormCombine.valueChanges.subscribe((val) => {
      if (parseInt(val.ending_separator_hours) <= parseInt(this.customerData?.workOrders[0]?.separator_hours)) { this.showValidationMessage_1 = true; }
      else { this.showValidationMessage_1 = false; }
      if (parseInt(val.endingEngineHours) <= parseInt(this.customerData?.workOrders[0]?.engine_hours)) { this.showValidationMessage_2 = true; }
      else { this.showValidationMessage_2 = false; }
    });

    this.closeJobFormKart = this.formBuilder.group({
      endingEngineHours: ['', [Validators.required]],
      employeeId: localStorage.getItem('employeeId'),
      jobId: [''],
      module: [''],
      dwrId: ['']
    });

    // end of day validation for hours (Cart)
    this.closeJobFormKart.valueChanges.subscribe((val) => {
      if (parseInt(val.endingEngineHours) <= parseInt(this.customerData?.workOrders[0]?.engine_hours)) { this.showValidationMessage_1 = true; }
      else { this.showValidationMessage_1 = false; }
    });

    this.closeJobFormTruck = this.formBuilder.group({
      ending_odometer_miles: ['', [Validators.required]],
      employeeId: localStorage.getItem('employeeId'),
      jobId: [''],
      module: [''],
      dwrId: ['']
    });

    // end of day validation for hours (truck driver)
    this.closeJobFormTruck.valueChanges.subscribe((val) => {
      console.log(parseInt(val.ending_odometer_miles) <= parseInt(this.customerData?.workOrders[0]?.odometer_reading_end));
      if (val.ending_odometer_miles <= this.customerData?.workOrders[0]?.odometer_reading_end) { this.showValidationMessage_1 = true; }
      else { this.showValidationMessage_1 = false; }
    });
  }

  submit() {
    if (localStorage.getItem('role').includes('Crew Chief')) {
      this.harvestingService
        .updateEndingOfDayJobSetup({
          operation: 'endingOfDay',
          jobId: this.truckId,
          role: 'Crew Chief',
          endingEngineHours: this.closeJobFormCrew.get('endingEngineHours').value
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );

      const dayClosed = {
        jobId: this.customerData.workOrders[0].id,
        endingEngineHours: this.closeJobFormCrew.get('endingEngineHours').value,
        ending_separator_hours: this.closeJobFormCrew.get(
          'ending_separator_hours'
        ).value,
      };

      this.loadingSpinner.next(true);
      this.harvestingService.closeBeginningDay(dayClosed).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            //tooltip
            this.toastService.presentToast(
              'Day has been closed successfully!',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');

          }
        },
        (err) => {
          this.toastService.presentToast(err, 'danger');
        }
      );
    }

    if (localStorage.getItem('role').includes('Combine Operator')) {
      this.harvestingService
        .updateEndingOfDayJobSetup({
          operation: 'endingOfDay',
          jobId: this.truckId,
          role: 'Combine Operator',
          endingEngineHours: this.closeJobFormCombine.get('endingEngineHours').value,
          separatorsHours: this.closeJobFormCombine.get('ending_separator_hours').value

        })
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );

      console.log(this.closeJobFormCombine.value);
      const dayClosed = {
        jobId: this.customerData.workOrders[0].id,
        endingEngineHours: this.closeJobFormCombine.get('endingEngineHours').value,
        ending_separator_hours: this.closeJobFormCombine.get('ending_separator_hours').value,
        module: this.closeJobFormCombine.get('module').value,
        dwrId: this.closeJobFormCombine.get('dwrId').value,
      };
      this.loadingSpinner.next(true);
      this.harvestingService.closeBeginningDay(dayClosed).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            this.toastService.presentToast(
              'Day has been closed successfully!',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting');
          }
        },
        (err) => {
          this.toastService.presentToast(err.message, 'danger');
        }
      );
    }

    if (localStorage.getItem('role').includes('Cart Operator')) {
      console.log('customerData', this.customerData);
      console.log('this.closeJobFormKart', this.closeJobFormKart.value);
      this.loadingSpinner.next(true);

      this.harvestingService
        .updateEndingOfDayJobSetup({
          operation: 'endingOfDay',
          jobId: this.truckId,
          role: 'Cart Operator',
          endingEngineHours: this.closeJobFormKart.get('endingEngineHours').value
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );

      this.harvestingService
        .closeBeginningDay(this.closeJobFormKart.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
              this.loadingSpinner.next(false);

              this.toastService.presentToast(
                'Day has been closed successfully!',
                'success'
              );

              // navigating
              this.router.navigateByUrl('/tabs/home/harvesting');

              this.goBack();
              // this.router.navigateByUrl('/tabs/home/farming');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    if (localStorage.getItem('role').includes('Truck Driver')) {
      console.log(this.closeJobFormTruck.value);

      this.loadingSpinner.next(true);

      this.harvestingService
        .updateCustomerJob(this.closeJobFormTruck.get('jobId').value)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
              this.toastService.presentToast(
                'Day has been closed successfully!',
                'success'
              );
              // this.router.navigateByUrl('/tabs/home/farming');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );

      this.harvestingService
        .updateEndingOfDayJobSetup({
          operation: 'endingOfDay',
          jobId: this.truckId,
          role: 'Truck Driver',
          endingEngineHours: this.closeJobFormTruck.get('ending_odometer_miles').value,
          module: 'harvesting'
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );

      this.harvestingService
        .closeBeginningDay(this.closeJobFormTruck.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
              this.loadingSpinner.next(false);
              this.toastService.presentToast(
                'Day has been closed successfully!',
                'success'
              );

              // navigating
              this.router.navigateByUrl('/tabs/home/harvesting');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );

      console.log("Id: ", this.closeJobFormTruck.get('jobId'));


    }
  }
}


