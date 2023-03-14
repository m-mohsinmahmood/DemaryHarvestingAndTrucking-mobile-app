import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripCheckService } from '../../trip-check-form.service';
import { ToastService } from './../../../../services/toast/toast.service';

@Component({
  selector: 'app-engine-check',
  templateUrl: './engine-check.page.html',
  styleUrls: ['./engine-check.page.scss'],
})
export class EngineCheckPage implements OnInit {

  buffer = 1;
  progress = 0;

  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  engineCheckForm: FormGroup;
  role = '';

  data;
  deliveryTicketId;

  constructor(private toast: ToastService, private formBuilder: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private preTripForm: TripCheckService) { }

  ngOnInit() {
    this.initDataFetch();
  }

  async ionViewDidEnter() {
    this.initDataFetch();
  }

  initDataFetch() {
    this.activeRoute.params.subscribe(param => {
      this.data = param;
      console.log(param);

    })

    this.activeRoute.params.subscribe(params => {
      this.deliveryTicketId = params.deliveryTicketId;
      console.log("Params:", params);

    })

    this.engineCheckForm = this.formBuilder.group({
      airCompressorEngine: ['true', [Validators.required]],
      airCompressorEngineSeverity: ['minor'],
      airCompressorEngineNotes: [''],
      beltsHoses: ['true', [Validators.required]],
      beltsHosesNotes: [''],
      beltsHosesSeverity: ['minor'],
      radiator: ['true', [Validators.required]],
      radiatorNotes: [''],
      radiatorSeverity: ['minor'],
      steering: ['true', [Validators.required]],
      steeringNotes: [''],
      steeringSeverity: ['minor'],
      oilLvl: ['true', [Validators.required]],
      oilLvlNotes: [''],
      oilLvlSeverity: ['minor'],
      fluidLvl: ['true', [Validators.required]],
      fluidLvlNotes: [''],
      fluidLvlSeverity: ['minor'],
      clutchCondition: ['true', [Validators.required]],
      clutchConditionNotes: [''],
      clutchConditionSeverity: ['minor'],
    });
  }

  submitForm() {
    console.log(this.engineCheckForm.value);
    console.log(this.deliveryTicketId);

    this.preTripForm.createNewPreTripCheckForm(this.engineCheckForm.value, 1, this.data.truckNo, this.data.trailerNo, localStorage.getItem('employeeId'))
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            // this.toast.presentToast("Pre Trip Check Form has created successfully!", 'success');
            this.router.navigate(['in-cab', { deliveryTicketId: this.deliveryTicketId }], { relativeTo: this.activeRoute });
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

}
