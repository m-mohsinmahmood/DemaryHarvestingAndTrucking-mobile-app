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
  progress = 0.6;
  cabCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cabCheckForm = this.formBuilder.group({
      safetyEquip: ['true', [Validators.required]],
      safetyEquipNotes: [''],
      starter: ['true', [Validators.required]],
      starterNotes: [''],
      gauges: ['true', [Validators.required]],
      gaugesNotes: [''],
      oilPressure: ['true', [Validators.required]],
      oilPressureNotes: [''],
      wipers: ['true', [Validators.required]],
      wipersNotes: [''],
      heater: ['true', [Validators.required]],
      heaterNotes: [''],
      windows: ['true', [Validators.required]],
      windowsNotes: [''],
      horns: ['true', [Validators.required]],
      hornsNotes: [''],
      pBrakes: ['true', [Validators.required]],
      pBrakesNotes: [''],
      sBrakes: ['true', [Validators.required]],
      sBrakesNotes: [''],
      leakTest: ['true', [Validators.required]],
      leakTestNotes: [''],
      lights: ['true', [Validators.required]],
      lightsNotes: ['']
    });
  }

  submitForm() {
    console.log(this.cabCheckForm.value);
    this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/vehicle-external');
  }

}
