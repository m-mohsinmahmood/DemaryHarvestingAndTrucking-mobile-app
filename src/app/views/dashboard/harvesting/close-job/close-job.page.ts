/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-close-job',
  templateUrl: './close-job.page.html',
  styleUrls: ['./close-job.page.scss'],
})
export class CloseJobPage implements OnInit {
  role: any;
  closeJobFormCrew: FormGroup;
  closeJobFormCombine: FormGroup;
  closeJobFormKart: FormGroup;
  closeJobFormTruck: FormGroup;

  customerData: any;
  isLoadingCustomer$: Observable<any>;
  dataDWR: any;
  job;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // getting role
    this.role = localStorage.getItem('role');
    console.log('role', this.role);
    this.initForms();
    this.initApis();
    this.initObservables();
  }

  initApis() {
    if (this.role === 'crew-chief') {
      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting'
      );
    }
    if (this.role === 'combine-operator') {
      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting'
      );
    }

    if (this.role === 'truck-driver') {
      this.activeRoute.params.subscribe((param) => {
        this.closeJobFormTruck.patchValue({
          workOrderId: param.id,
          employeeId: localStorage.getItem('employeeId'),
        });
        console.log(param);
      });
    }

    if (this.role === 'kart-operator') {
      this.harvestingService.getBeginningOfDay(
        localStorage.getItem('employeeId'),
        'beginningOfDayHarvesting',
        'harvesting'
      );
    }
  }

  initObservables() {
    this.harvestingService.customer$.subscribe((res) => {
      console.log('res', res);
      this.customerData = res;
      if (this.customerData?.workOrders) {
        // this.customerData = res;

        if (this.role === 'kart-operator') {
          this.closeJobFormKart.patchValue({
            // passing to pre-filled
            workOrderId: this.customerData?.workOrders[0]?.id,
          });

          console.log(this.closeJobFormKart.value);

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
      employeeId: ['8920a566-003c-47f0-82dc-21e74196bb98'],
    });
    this.closeJobFormCombine = this.formBuilder.group({
      ending_separator_hours: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      employeeId: ['3ac2db42-d0c1-4493-a0cf-b19deb834f46'],
    });

    this.closeJobFormKart = this.formBuilder.group({
      endingEngineHours: ['', [Validators.required]],
      employeeId: ['f4cfa75b-7c14-4b68-a192-00d56c9f2022'],
      workOrderId: [''],
    });
    this.closeJobFormTruck = this.formBuilder.group({
      ending_odometer_miles: ['', [Validators.required]],
      employeeId: [''],
      workOrderId: [''],
    });
  }

  submit() {
    // console.log(this.closeJobFormCrew.value);
    // console.log(this.closeJobFormKart.value);
    // console.log(this.closeJobFormTruck.value);
    // console.log(this.closeJobFormCombine.value);

    if (localStorage.getItem('role') === 'crew-chief') {
      const dayClosed = {
        workOrderId: this.customerData.workOrders[0].id,
        endingEngineHours: this.closeJobFormCrew.get('endingEngineHours').value,
        ending_separator_hours: this.closeJobFormCrew.get(
          'ending_separator_hours'
        ).value,
      };

      this.harvestingService.closeBeginningDay(dayClosed).subscribe(
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
    }
    if (localStorage.getItem('role') === 'combine-operator') {
      console.log(this.closeJobFormCombine.value);
      const dayClosed = {
        workOrderId: this.customerData.workOrders[0].id,
        endingEngineHours:
          this.closeJobFormCombine.get('endingEngineHours').value,
        ending_separator_hours: this.closeJobFormCombine.get(
          'ending_separator_hours'
        ).value,
      };
      this.harvestingService.closeBeginningDay(dayClosed).subscribe(
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
          this.toastService.presentToast(err.message, 'danger');
        }
      );
    }
    if (localStorage.getItem('role') === 'kart-operator') {
      console.log('customerData', this.customerData);
      console.log('this.closeJobFormKart', this.closeJobFormKart.value);
      this.harvestingService
        .closeBeginningDay(this.closeJobFormKart.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.status === 200) {
              this.toastService.presentToast(
                'Day has been closed successfully!',
                'success'
              );

              this.goBack();
              // this.router.navigateByUrl('/tabs/home/farming');
            }
          },
          (err) => {
            this.toastService.presentToast(err, 'danger');
          }
        );
    }
    if (localStorage.getItem('role') === 'truck-driver') {
      console.log(this.closeJobFormTruck.value);

      this.harvestingService
        .closeBeginningDay(this.closeJobFormTruck.value)
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
    }
  }
}
