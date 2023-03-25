import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmingService } from './../farming.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-submit-end-day',
  templateUrl: './submit-end-day.page.html',
  styleUrls: ['./submit-end-day.page.scss'],
})
export class SubmitEndDayPage implements OnInit {

  submitEndDayWorkOrder: FormGroup;
  workOrderCount: any;
  workOrder: any;
  checkInData;
  remainingAcres: any;

  public loadingSpinner = new BehaviorSubject(false);

  constructor(private activeRoute: ActivatedRoute, private toast: ToastService, private router: Router, private formBuilder: FormBuilder, private farmingService: FarmingService) {
  }

  ngOnInit() {
    this.initDataRetrieval();
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
  }

  initDataRetrieval() {
    this.activeRoute.params.subscribe(param => {
      console.log("Check In: ", param);

      this.checkInData = param;
    })

    this.farmingService.getBeginningOfDay(localStorage.getItem('employeeId'), 'beginningOfDay', 'farming').subscribe(workOrder => {
      this.workOrderCount = workOrder.count;
      this.workOrder = workOrder.workOrders;

      this.farmingService.getWorkOrderById(workOrder.workOrders[0].work_order_id).subscribe(workOrderByID => {
        console.log("WorkOrder By Id: ", workOrderByID);
        console.log("Field Acres :", workOrderByID.total_acres);

        this.farmingService.getAllWorkOrders('', 'getRemainingAcresofField', localStorage.getItem('employeeId'), workOrderByID.field_id).subscribe((acres) => {
          console.log("Remaining Acres: ", acres.workOrders[0].total_acres);
          this.remainingAcres = workOrderByID.total_acres - acres.workOrders[0].total_acres
          console.log(this.remainingAcres);

        })
      });
    });

    this.submitEndDayWorkOrder = this.formBuilder.group({
      employeeId: [localStorage.getItem('employeeId')],
      acresCompleted: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      module: [this.checkInData.module],
      dwrId: [this.checkInData.id]
    });
  }

  navigateTo() {
    console.log(this.submitEndDayWorkOrder.value);

    if (this.submitEndDayWorkOrder.get('acresCompleted').value > +this.remainingAcres) {
      this.toast.presentToast("Completed Acres should not be exceeding " + this.remainingAcres, 'danger');
    }
    else {
      this.loadingSpinner.next(true)

      this.submitEndDayWorkOrder.value.machineryID = this.workOrder[0].machinery_id;

      console.log(this.submitEndDayWorkOrder.value);

      this.farmingService.updateEndingEngineHours(
        {
          id: this.workOrder.machinery_id,
          endingEngineHours: this.submitEndDayWorkOrder.get("endingEngineHours").value
        }
      );

      this.farmingService.closeBeginningDay(this.submitEndDayWorkOrder.value, this.workOrder[0])
        .subscribe(
          (res: any) => {
            console.log(res);

            if (res.status === 200) {
              this.toast.presentToast("Day has been closed successfully!", 'success');
              this.router.navigateByUrl('/tabs/home/farming');
              this.loadingSpinner.next(false)

            }
          },
          (err) => {
            this.toast.presentToast(err, 'danger');
            this.loadingSpinner.next(false)
          },
        );

      let updateWorkOrder = {
        workOrderId: this.workOrder[0].work_order_id,
        machineryID: this.workOrder[0].machinery_id,
        endingEngineHours: this.submitEndDayWorkOrder.get("endingEngineHours").value
      }

      this.farmingService.updateWorkOrder(updateWorkOrder, 'Tractor Driver', 'submitEndingDay')
        .subscribe(
          (res: any) => {
          },
          (err) => {
            this.toast.presentToast(err, 'danger');
          },
        );
    }
  }
}
