import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { FarmingService } from './../farming.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-close-out-order',
  templateUrl: './close-out-order.page.html',
  styleUrls: ['./close-out-order.page.scss'],
})
export class CloseOutOrderPage implements OnInit {

  closeOutWorkOrder: FormGroup;
  workOrderId: string;
  machineryID: string;
  data: Observable<any>;
  dataLoaded = false;
  workOrderCount = 0;
  public loadingSpinner = new BehaviorSubject(false);

  constructor(private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService, private renderer: Renderer2) {

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

    this.data = this.farmingService.getAllWorkOrders('', 'close_out_work_order', localStorage.getItem('employeeId'));

    this.data.subscribe((workOrders) => {
      console.log(workOrders);
      this.workOrderCount = workOrders.count;
      if (workOrders.count > 0) {
        this.workOrderId = workOrders.workOrders[0].id;
        this.machineryID = workOrders.workOrders[0].machinery_id;
      }
      this.dataLoaded = true;
      console.log(this.workOrderCount);

    })

    this.closeOutWorkOrder = this.formBuilder.group({
      workOrderId: [this.workOrderId],
      acresByService: ['', [Validators.required]],
      acresCompleted: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      gpsAcresByService: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    });
  }

  navigateTo() {
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

