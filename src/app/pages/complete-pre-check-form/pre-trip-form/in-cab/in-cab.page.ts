import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TripCheckService } from './../../trip-check-form.service';
import { ToastService } from './../../../../services/toast/toast.service';

@Component({
  selector: 'app-in-cab',
  templateUrl: './in-cab.page.html',
  styleUrls: ['./in-cab.page.scss'],
})
export class InCabPage implements OnInit {
  buffer = 1;
  progress = 0.2;
  cabCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  deliveryTicketId;
  data: Observable<any>;
  id;

  constructor(private activeRoute: ActivatedRoute, private toast: ToastService, private preTripForm: TripCheckService, private tripCheck: TripCheckService, private router: Router, private formBuilder: FormBuilder) { }

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

    this.cabCheckForm = this.formBuilder.group({
      safetyEquip: ['true', [Validators.required]],
      safetyEquipNotes: [''],
      safetyEquipSeverity: ['minor'],
      starter: ['true', [Validators.required]],
      starterNotes: [''],
      starterSeverity: ['minor'],
      gauges: ['true', [Validators.required]],
      gaugesNotes: [''],
      gaugesSeverity: ['minor'],
      oilPressure: ['true', [Validators.required]],
      oilPressureNotes: [''],
      oilPressureSeverity: ['minor'],
      wipers: ['true', [Validators.required]],
      wipersNotes: [''],
      wipersSeverity: ['minor'],
      heater: ['true', [Validators.required]],
      heaterNotes: [''],
      heaterSeverity: ['minor'],
      windows: ['true', [Validators.required]],
      windowsNotes: [''],
      windowsSeverity: ['minor'],
      horns: ['true', [Validators.required]],
      hornsNotes: [''],
      hornsSeverity: ['minor'],
      pBrakes: ['true', [Validators.required]],
      pBrakesNotes: [''],
      pBrakesSeverity: ['minor'],
      sBrakes: ['true', [Validators.required]],
      sBrakesNotes: [''],
      sBrakesSeverity: ['minor'],
      leakTest: ['true', [Validators.required]],
      leakTestNotes: [''],
      leakTestSeverity: ['minor'],
      lightsCab: ['true', [Validators.required]],
      lightsNotesCab: [''],
      lightsSeverityCab: ['minor'],
    });
  }

  submitForm() {
    console.log(this.cabCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/vehicle-external');
    this.preTripForm.updatePreTripCheckForm(this.cabCheckForm.value, 2, this.id)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            // this.toast.presentToast("Pre Trip Check Form has updated successfully!", 'success');
            this.router.navigate(['vehicle-external', { deliveryTicketId: this.deliveryTicketId }], { relativeTo: this.activeRoute });
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

}
