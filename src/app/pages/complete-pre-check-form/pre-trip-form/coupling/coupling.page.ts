/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripCheckService } from './../../trip-check-form.service';
import { ToastService } from './../../../../services/toast/toast.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupling',
  templateUrl: './coupling.page.html',
  styleUrls: ['./coupling.page.scss'],
})
export class CouplingPage implements OnInit {

  buffer = 1;
  progress = 0.6;
  couplingCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  data: Observable<any>;
  id;
  deliveryTicketId;

  constructor(private activeRoute: ActivatedRoute, private tripCheck: TripCheckService, private toast: ToastService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initDataFetch();
  }

  async ionViewDidEnter() {
    this.initDataFetch();
  }

  initDataFetch() {
    this.data = this.tripCheck.getActivePreCheckTicket('getActiveTicket');

    this.data.subscribe((workOrders) => {
      this.id = workOrders.ticket[0].id;
    });

    this.activeRoute.params.subscribe(params => {
      this.deliveryTicketId = params.deliveryTicketId;
      console.log("Params:", params);

    })

    this.couplingCheckForm = this.formBuilder.group({
      airLine: ['true', [Validators.required]],
      airLineNotes: [''],
      airLineSeverity: ['minor'],
      brakeAccessories: ['true', [Validators.required]],
      brakeAccessoriesNotes: [''],
      brakeAccessoriesSeverity: ['minor'],
      couplingDevices: ['true', [Validators.required]],
      couplingDevicesNotes: [''],
      couplingDevicesSeverity: ['minor'],
      fifthWheel: ['true', [Validators.required]],
      fifthWheelNotes: [''],
      fifthWheelSeverity: ['minor'],
      rearEnd: ['true', [Validators.required]],
      rearEndNotes: [''],
      rearEndSeverity: ['minor'],
      muffler: ['true', [Validators.required]],
      mufflerNotes: [''],
      mufflerSeverity: ['minor'],
      frontAxle: ['true', [Validators.required]],
      frontAxleNotes: [''],
      frontAxleSeverity: ['minor'],
      suspensionSystem: ['true', [Validators.required]],
      suspensionSystemNotes: [''],
      suspensionSystemSeverity: ['minor'],
      transmission: ['true', [Validators.required]],
      transmissionNotes: [''],
      transmissionSeverity: ['minor'],
    });
  }

  submitForm() {
    console.log(this.couplingCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/trailer');

    this.tripCheck.updatePreTripCheckForm(this.couplingCheckForm.value, 4, this.id)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            // this.toast.presentToast("Pre Trip Check Form has updated successfully!", 'success');
            this.router.navigate(['trailer', { deliveryTicketId: this.deliveryTicketId }], { relativeTo: this.activeRoute });
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

}
