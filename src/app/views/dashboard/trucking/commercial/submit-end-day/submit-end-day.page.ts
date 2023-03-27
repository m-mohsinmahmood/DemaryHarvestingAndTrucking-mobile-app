import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TruckingService } from '../../trucking.service';

@Component({
  selector: 'app-submit-end-day',
  templateUrl: './submit-end-day.page.html',
  styleUrls: ['./submit-end-day.page.scss'],
})
export class SubmitEndDayPage implements OnInit {

  submitEndDayWorkOrder: FormGroup;
  workOrderCount: any;
  workOrder: any;
  role;
  data;

  constructor(private activeRoute: ActivatedRoute, private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private truckingService: TruckingService, private renderer: Renderer2) {
    this.activeRoute.params.subscribe(params => {
      this.data = params;
    })
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.submitEndDayWorkOrder = this.formBuilder.group({
      deliveryTicketId: [this.data.id as "workOrderId"],
      truckId: [this.data.truck_id],
      ending_odometer_miles: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]]
    });
  }

  navigateTo(nav: string) {
    console.log(this.submitEndDayWorkOrder.value);

    this.truckingService.updateDeliveryTicket({
      ticketNo: this.submitEndDayWorkOrder.get("deliveryTicketId").value,
      isTicketActive: false,
      hoursWorked:this.submitEndDayWorkOrder.get("hoursWorked").value
    }, 'pending')
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );

    let endOfDay = {
      hoursWorked: this.submitEndDayWorkOrder.get("hoursWorked").value,
      ending_odometer_miles: this.submitEndDayWorkOrder.get("ending_odometer_miles").value,
      deliveryTicketId: this.submitEndDayWorkOrder.get("deliveryTicketId").value
    }
    this.truckingService.updateDWR(endOfDay, 'trucking')
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast("DWR has been created successfully!", 'success');
            this.router.navigateByUrl(nav);
            // this.router.navigate(['in-house'], { relativeTo: this.activeRoute })
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }
}
