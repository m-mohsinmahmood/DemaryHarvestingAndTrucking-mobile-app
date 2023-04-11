import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { FarmingService } from './../farming.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-close-out-order',
  templateUrl: './close-out-order.page.html',
  styleUrls: ['./close-out-order.page.scss'],
})
export class CloseOutOrderPage implements OnInit {
  workOrder: any;
  closeOutWorkOrder: FormGroup;
  workOrderId: string;
  machineryID: string;
  data: Observable<any>;
  dataLoaded = false;
  workOrderCount = 0;
  remainingAcres: any;
  checkInData;
  activeDwr: Observable<any>;

  public loadingSpinner = new BehaviorSubject(false);

  constructor(private dwrServices: CheckInOutService, private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.initDataRetrieval();
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
  }

  initDataRetrieval() {
    this.dataLoaded = false;
    this.workOrderCount = 0;

    this.closeOutWorkOrder = this.formBuilder.group({
      workOrderId: [this.workOrderId],
      acresByService: ['', [Validators.required]],
      acresCompleted: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      gpsAcresByService: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      module: [''],
      dwrId: ['']
    });

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log('Active Check In ', workOrder.dwr);
      this.activeDwr = workOrder.dwr;
      this.checkInData = this.activeDwr[0];

      console.log("Check 1: ", workOrder.dwr[0].module);
      console.log("Check 2: ", workOrder.dwr[0].id);

      this.closeOutWorkOrder.patchValue({
        module: workOrder.dwr[0].module,
        dwrId: workOrder.dwr[0].id
      })
    });

    this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay', 'farming').subscribe(workOrder => {
      this.workOrderCount = workOrder.count;
      this.workOrder = workOrder.workOrders;

      this.farmingService.getWorkOrderById(workOrder.workOrders[0].work_order_id).subscribe(workOrderByID => {
        console.log("WorkOrder By Id: ", workOrderByID);

        this.data = this.farmingService.getAllWorkOrders('', 'getRemainingAcresofField', localStorage.getItem('employeeId'), workOrderByID.field_id);
        this.data.subscribe((workOrders) => {
          console.log("Data :", workOrders);

          console.log("Field Acres: ", workOrders.workOrders[0].total_acres);
          console.log(workOrderByID.total_acres);

          this.remainingAcres = workOrderByID.total_acres - workOrders.workOrders[0].total_acres
          console.log(this.remainingAcres);

          this.workOrderId = workOrderByID.id;
          this.machineryID = workOrderByID.machinery_id;
          this.dataLoaded = true;

        });
      });
    });
  }

  navigateTo() {
    if (this.closeOutWorkOrder.get('acresCompleted').value > +this.remainingAcres) {
      this.toast.presentToast("Completed Acres should not be exceeding " + this.remainingAcres, 'danger');
    }
    else {
      this.loadingSpinner.next(true)

      this.closeOutWorkOrder.patchValue({
        workOrderId: this.workOrderId
      })

      this.closeOutWorkOrder.value.machineryID = this.machineryID;

      console.log(this.closeOutWorkOrder.value);

      this.farmingService.updateEndingEngineHours(
        {
          id: this.machineryID,
          endingEngineHours: this.closeOutWorkOrder.get("endingEngineHours").value
        }
      );

      // this.farmingService.closeBeginningDay(this.closeOutWorkOrder.value, this.workOrder[0])
      //   .subscribe(
      //     (res: any) => {
      //       console.log(res);

      //       if (res.status === 200) {
      //         this.toast.presentToast("Day has been closed successfully!", 'success');
      //         this.router.navigateByUrl('/tabs/home/farming');
      //         this.loadingSpinner.next(false)

      //       }
      //     },
      //     (err) => {
      //       this.toast.presentToast(err, 'danger');
      //       this.loadingSpinner.next(false)
      //     },
      //   );

      this.farmingService.updateWorkOrder(this.closeOutWorkOrder.value, 'Tractor Driver', 'closeOutWorkOrder')
        .subscribe(
          (res: any) => {
            console.log(res);

            if (res.status === 200) {
              this.toast.presentToast("Work Order has been closed successfully!", 'success');
              this.router.navigateByUrl('/tabs/home/farming');
              this.loadingSpinner.next(false)
            }
          },
          (err) => {
            this.toast.presentToast(err, 'danger');
            this.loadingSpinner.next(false)
          },
        );
    }
  }
}

