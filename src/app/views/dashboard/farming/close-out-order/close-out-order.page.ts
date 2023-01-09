import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
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

  data: Observable<any>;
  dataLoaded = false;
  workOrderCount =0;

  constructor(private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService, private renderer: Renderer2) {

  }

  ngOnInit() {

    this.data = this.farmingService.getAllWorkOrders('', 'close_out_work_order', localStorage.getItem('employeeId'));

    this.data.subscribe((workOrders) => {
      console.log(workOrders);
      this.workOrderCount = workOrders.count;
      if (workOrders.count > 0) {
        this.workOrderId = workOrders.workOrders[0].id;
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
      gpsAcres: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    });
  }

  navigateTo() {
    this.closeOutWorkOrder.patchValue({
      workOrderId: this.workOrderId
    })

    console.log(this.closeOutWorkOrder.value);
    this.farmingService.updateWorkOrder(this.closeOutWorkOrder.value, 'tractor-driver', 'closeOutWorkOrder')
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast("Work Order has been closed successfully!", 'success');
            this.router.navigateByUrl('/tabs/home/farming');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

}

