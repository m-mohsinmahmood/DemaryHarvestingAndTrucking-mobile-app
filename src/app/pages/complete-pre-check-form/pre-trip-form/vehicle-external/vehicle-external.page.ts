import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TripCheckService } from '../../trip-check-form.service';
import { ToastService } from './../../../../services/toast/toast.service';

@Component({
  selector: 'app-vehicle-external',
  templateUrl: './vehicle-external.page.html',
  styleUrls: ['./vehicle-external.page.scss'],
})
export class VehicleExternalPage implements OnInit {
  buffer = 1;
  progress = 0.4;
  vehicleCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  data: Observable<any>;
  id;
  deliveryTicketId;
  constructor(private activeRoute: ActivatedRoute, private toast: ToastService, private tripCheck: TripCheckService, private router: Router, private formBuilder: FormBuilder) { }

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

    this.vehicleCheckForm = this.formBuilder.group({
      lightsReflectors: ['true', [Validators.required]],
      lightsReflectorsNotes: [''],
      lightsReflectorsSeverity: ['minor'],
      fuelTank: ['true', [Validators.required]],
      fuelTankNotes: [''],
      fuelTankSeverity: ['minor'],
      frameAssembly: ['true', [Validators.required]],
      frameAssemblyNotes: [''],
      frameAssemblySeverity: ['minor'],
      driveLine: ['true', [Validators.required]],
      driveLineNotes: [''],
      driveLineSeverity: ['minor'],
      lugNuts: ['true', [Validators.required]],
      lugNutsNotes: [''],
      lugNutsSeverity: ['minor'],
      wheelsRims: ['true', [Validators.required]],
      wheelsRimsNotes: [''],
      wheelsRimsSeverity: ['minor'],
      tiresChains: ['true', [Validators.required]],
      tiresChainsNotes: [''],
      tiresChainsSeverity: ['minor'],
      exhaust: ['true', [Validators.required]],
      exhaustNotes: [''],
      exhaustSeverity: ['minor'],
      batteryBox: ['true', [Validators.required]],
      batteryBoxNotes: [''],
      batteryBoxSeverity: ['minor'],
      mirrors: ['true', [Validators.required]],
      mirrorsNotes: [''],
      mirrorsSeverity: ['minor'],
    });
  }

  submitForm() {
    console.log(this.vehicleCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/coupling');

    this.tripCheck.updatePreTripCheckForm(this.vehicleCheckForm.value, 3, this.id)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            // this.toast.presentToast("Pre Trip Check Form has updated successfully!", 'success');
            this.router.navigate(['coupling', { deliveryTicketId: this.deliveryTicketId }], { relativeTo: this.activeRoute });
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

}
