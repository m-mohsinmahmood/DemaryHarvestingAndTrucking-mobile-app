import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-external',
  templateUrl: './vehicle-external.page.html',
  styleUrls: ['./vehicle-external.page.scss'],
})
export class VehicleExternalPage implements OnInit {
  buffer = 1;
  progress = 0.6;
  vehicleCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.vehicleCheckForm = this.formBuilder.group({
      lightsReflectors: ['true', [Validators.required]],
      lightsReflectorsNotes: [''],
      feulTank: ['true', [Validators.required]],
      feulTankNotes: [''],
      frameAssembly: ['true', [Validators.required]],
      frameAssemblyNotes: [''],
      driveLine: ['true', [Validators.required]],
      driveLineNotes: [''],
      lugNuts: ['true', [Validators.required]],
      lugNutsNotes: [''],
      wheelsRims: ['true', [Validators.required]],
      wheelsRimsNotes: [''],
      tiresChains: ['true', [Validators.required]],
      tiresChainsNotes: [''],
      exhaust: ['true', [Validators.required]],
      exhaustNotes: [''],
      batteryBox: ['true', [Validators.required]],
      batteryBoxNotes: [''],
      mirrors: ['true', [Validators.required]],
      mirrorsNotes: [''],
    });
  }

  submitForm() {
    console.log(this.vehicleCheckForm.value);
    this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/coupling');
  }

}
