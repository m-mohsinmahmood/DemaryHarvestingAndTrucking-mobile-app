import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cabCheckForm = this.formBuilder.group({
      safetyEquip: ['true', [Validators.required]],
      safetyEquipNotes: [''],
      safetyEquipSelect: ['minor'],
      starter: ['true', [Validators.required]],
      starterNotes: [''],
      starterSelect: ['minor'],
      gauges: ['true', [Validators.required]],
      gaugesNotes: [''],
      gaugesSelect: ['minor'],
      oilPressure: ['true', [Validators.required]],
      oilPressureNotes: [''],
      oilPressureSelect: ['minor'],
      wipers: ['true', [Validators.required]],
      wipersNotes: [''],
      wipersSelect: ['minor'],
      heater: ['true', [Validators.required]],
      heaterNotes: [''],
      heaterSelect: ['minor'],
      windows: ['true', [Validators.required]],
      windowsNotes: [''],
      windowsSelect: ['minor'],
      horns: ['true', [Validators.required]],
      hornsNotes: [''],
      hornsSelect: ['minor'],
      pBrakes: ['true', [Validators.required]],
      pBrakesNotes: [''],
      pBrakesSelect: ['minor'],
      sBrakes: ['true', [Validators.required]],
      sBrakesNotes: [''],
      sBrakesSelect: ['minor'],
      leakTest: ['true', [Validators.required]],
      leakTestNotes: [''],
      leakTestSelect: ['minor'],
      lights: ['true', [Validators.required]],
      lightsNotes: [''],
      lightsSelect: ['minor'],
    });

    // // getting progress no.
    // this.progress = this.router.getCurrentNavigation().extras.state.progressNo;
  }

  submitForm() {
    console.log(this.cabCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/vehicle-external');
    this.router.navigateByUrl('/tabs/home/harvesting/complete-pre-check-form/pre-trip-form/engine-check/in-cab/vehicle-external');

  }

}
