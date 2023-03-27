/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    // getting role
    this.role = localStorage.getItem('role');
    console.log('role', this.role);
    this.initForms();
    this.initApis();
    this.initObservables();
  }

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnDestroy(): void {
    this.DataDestroy();
  }

  async ionViewDidLeave() {
    this.DataDestroy();
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
        console.log("Kart Operator Data: ", param);
        this.truckId = param.machinery_id;
      });

      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting'
      );
    }
    else if (this.role.includes('Combine Operator')) {
      this.activeRoute.params.subscribe((param) => {
        console.log("Kart Operator Data: ", param);
        this.truckId = param.machinery_id;
      });

      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting'
      );
    }

    else if (this.role.includes('Truck Driver')) {
      this.activeRoute.params.subscribe((param) => {
        this.closeJobFormTruck.patchValue({
          workOrderId: param.id,
          employeeId: localStorage.getItem('employeeId'),
        });
        console.log(param);
        this.truckId = param.truck_id;
      });
    }

    else if (this.role.includes('Kart Operator')) {
      this.activeRoute.params.subscribe((param) => {
        console.log("Kart Operator Data: ", param);
        this.truckId = param.machinery_id;
      });

      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting'
      );
    }
  }

  initObservables() {
    this.sub = this.harvestingService.customer$.subscribe((res) => {
      console.log('res', res);
      this.customerData = res;
      if (this.customerData?.workOrders) {
        // this.customerData = res;

        if (this.role.includes('Kart Operator')) {
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
      employeeId: localStorage.getItem('employeeId')
    });
    this.closeJobFormCombine = this.formBuilder.group({
      ending_separator_hours: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      employeeId: localStorage.getItem('employeeId')
    });

    this.closeJobFormKart = this.formBuilder.group({
      endingEngineHours: ['', [Validators.required]],
      employeeId: localStorage.getItem('employeeId'),
      jobId: [''],
    });
    this.closeJobFormTruck = this.formBuilder.group({
      ending_odometer_miles: ['', [Validators.required]],
      employeeId: localStorage.getItem('employeeId'),
      workOrderId: [''],
    });
  }

  submit() {
    // console.log(this.closeJobFormCrew.value);
    // console.log(this.closeJobFormKart.value);
    // console.log(this.closeJobFormTruck.value);
    // console.log(this.closeJobFormCombine.value);

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
          endingEngineHours: this.closeJobFormCombine.get('endingEngineHours').value
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
        ending_separator_hours: this.closeJobFormCombine.get(
          'ending_separator_hours'
        ).value,
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

    if (localStorage.getItem('role').includes('Kart Operator')) {
      console.log('customerData', this.customerData);
      console.log('this.closeJobFormKart', this.closeJobFormKart.value);
      this.loadingSpinner.next(true);

      this.harvestingService
        .updateEndingOfDayJobSetup({
          operation: 'endingOfDay',
          jobId: this.truckId,
          role: 'Kart Operator',
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
        .updateCustomerJob(this.closeJobFormTruck.get('workOrderId').value)
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
          endingEngineHours: this.closeJobFormTruck.get('ending_odometer_miles').value
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

      console.log("Id: ", this.closeJobFormTruck.get('workOrderId'));


    }
  }
}
