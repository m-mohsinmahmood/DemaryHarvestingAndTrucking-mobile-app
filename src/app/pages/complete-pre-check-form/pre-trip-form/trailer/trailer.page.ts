import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TripCheckService } from '../../trip-check-form.service';
import { ToastService } from './../../../../services/toast/toast.service';
import { TruckingService } from './../../../../views/dashboard/trucking/trucking.service';
import { HarvestingService } from './../../../../views/dashboard/harvesting/harvesting.service';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.page.html',
  styleUrls: ['./trailer.page.scss'],
})
export class TrailerPage implements OnInit {
  buffer = 1;
  progress = 0.8;
  trailerCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  data: Observable<any>;
  id;
  deliveryTicketId;
  routeBack;
  module;
  harvestingTicket;

  constructor(private harvestingService: HarvestingService, private truckingService: TruckingService, private activeRoute: ActivatedRoute, private tripCheck: TripCheckService, private toast: ToastService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initDataFetch();
  }

  async ionViewDidEnter() {
    this.initDataFetch();
  }

  initDataFetch() {
    this.activeRoute.params.subscribe(params => {
      this.deliveryTicketId = params.deliveryTicketId;
      this.routeBack = params.preRoute;
      this.module = params.module;
      this.harvestingTicket = params.id;
      console.log("Params:", params);

    })

    this.data = this.tripCheck.getActivePreCheckTicket('getActiveTicket');

    this.data.subscribe((workOrders) => {
      this.id = workOrders.ticket[0].id;
      console.log(workOrders);
    });

    this.trailerCheckForm = this.formBuilder.group({
      brakeConnections: ['true', [Validators.required]],
      brakeConnectionsNotes: [''],
      brakeConnectionsSeverity: ['minor'],
      brakes: ['true', [Validators.required]],
      brakesNotes: [''],
      brakesSeverity: ['minor'],
      couplingDevicesTrailer: ['true', [Validators.required]],
      couplingDevicesNotesTrailer: [''],
      couplingDevicesSeverityTrailer: ['minor'],
      coupling: ['true', [Validators.required]],
      couplingNotes: [''],
      couplingSeverity: ['minor'],
      doors: ['true', [Validators.required]],
      doorsNotes: [''],
      doorSeverity: ['minor'],
      hitch: ['true', [Validators.required]],
      hitchNotes: [''],
      hitchSeverity: ['minor'],
      landingGear: ['true', [Validators.required]],
      landingGearNotes: [''],
      landingGearSeverity: ['minor'],
      lights: ['true', [Validators.required]],
      lightsNotes: [''],
      lightsSeverity: ['minor'],
      reflectors: ['true', [Validators.required]],
      reflectorsNotes: [''],
      reflectorsSeverity: ['minor'],
      roof: ['true', [Validators.required]],
      roofNotes: [''],
      roofSeverity: ['minor'],
      suspension: ['true', [Validators.required]],
      suspensionNotes: [''],
      suspensionSeverity: ['minor'],
      tarpaulin: ['true', [Validators.required]],
      tarpaulinNotes: [''],
      tarpaulinSeverity: ['minor'],
      tires: ['true', [Validators.required]],
      tiresNotes: [''],
      tiresSeverity: ['minor'],
    });
  }

  submitForm() {
    console.log(this.trailerCheckForm.value);
    console.log(this.routeBack);

    this.trailerCheckForm.value.deliveryTicketId = this.deliveryTicketId;
    this.tripCheck.updatePreTripCheckForm(this.trailerCheckForm.value, 5, this.id)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            // this.toast.presentToast("Pre Trip Check Form has updated successfully!", 'success');
            this.router.navigateByUrl(this.routeBack);
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );

    console.log(this.deliveryTicketId);

    if (this.module === 'trucking') {
      this.truckingService.updateDeliveryTicket({
        ticketNo: this.deliveryTicketId,
        isTicketActive: true,
        isTripCheckFilled: true
      }, 'sent')
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          (err) => {
            this.toast.presentToast(err, 'danger');
          },
        );
    }

    else if (this.module === 'harvesting') {
      this.harvestingService.updatePreTripCheckJob(this.harvestingTicket)
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          (err) => {
            this.toast.presentToast(err, 'danger');
          },
        );
    }
  }
}
