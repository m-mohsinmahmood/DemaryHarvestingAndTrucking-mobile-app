import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmingService } from './../farming.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-submit-end-day',
  templateUrl: './submit-end-day.page.html',
  styleUrls: ['./submit-end-day.page.scss'],
})
export class SubmitEndDayPage implements OnInit {

  submitEndDayWorkOrder: FormGroup;
  workOrderCount: any;
  workOrder: any;

  constructor(private toast: ToastService, private router: Router, private formBuilder: FormBuilder, private farmingService: FarmingService) {
  }

  ngOnInit() {

    this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay', 'farming').subscribe(workOrder => {
      this.workOrderCount = workOrder.count;
      this.workOrder = workOrder.workOrders;
      console.log(this.workOrder);

    })

    this.submitEndDayWorkOrder = this.formBuilder.group({
      employeeId: [localStorage.getItem('employeeId')],
      acresCompleted: ['', [Validators.required]],
      // gpsAcres: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    });
  }

  navigateTo() {
    this.submitEndDayWorkOrder.value.machineryID = this.workOrder[0].machinery_id;

    console.log(this.submitEndDayWorkOrder.value);
    this.farmingService.closeBeginningDay(this.submitEndDayWorkOrder.value, this.workOrder[0])
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast("Day has been closed successfully!", 'success');
            this.router.navigateByUrl('/tabs/home/farming');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );

    let updateWorkOrder = {
      workOrderId: this.workOrder[0].work_order_id,
      machineryID: this.workOrder[0].machinery_id,
      endingEngineHours: this.submitEndDayWorkOrder.get("endingEngineHours").value
    }

    this.farmingService.updateWorkOrder(updateWorkOrder, 'tractor-driver', 'submitEndingDay')
      .subscribe(
        (res: any) => {
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

}
