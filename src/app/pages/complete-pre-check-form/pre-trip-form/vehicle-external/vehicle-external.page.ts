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
  progress = 0.4;
  vehicleCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.vehicleCheckForm = this.formBuilder.group({
      lightsReflectors: ['true', [Validators.required]],
      lightsReflectorsNotes: [''],
      lightsReflectorsSelect: ['minor'],
      fuelTank: ['true', [Validators.required]],
      fuelTankNotes: [''],
      fuelTankSelect: ['minor'],
      frameAssembly: ['true', [Validators.required]],
      frameAssemblyNotes: [''],
      frameAssemblySelect:['minor'],
      driveLine: ['true', [Validators.required]],
      driveLineNotes: [''],
      driveLineSelect: ['minor'],
      lugNuts: ['true', [Validators.required]],
      lugNutsNotes: [''],
      lugNutsSelect: ['minor'],
      wheelsRims: ['true', [Validators.required]],
      wheelsRimsNotes: [''],
      wheelsRimsSelect: ['minor'],
      tiresChains: ['true', [Validators.required]],
      tiresChainsNotes: [''],
      tiresChainsSelect: ['minor'],
      exhaust: ['true', [Validators.required]],
      exhaustNotes: [''],
      exhaustSelect: ['minor'],
      batteryBox: ['true', [Validators.required]],
      batteryBoxNotes: [''],
      batteryBoxSelect: ['minor'],
      mirrors: ['true', [Validators.required]],
      mirrorsNotes: [''],
      mirrorsSelect: ['minor'],
    });

    // // getting progress no.
    // this.progress = this.router.getCurrentNavigation().extras.state.progressNo;
  }

  submitForm() {
    console.log(this.vehicleCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/coupling');
    this.router.navigateByUrl('/tabs/home/harvesting/complete-pre-check-form/pre-trip-form/engine-check/in-cab/vehicle-external/coupling');

  }

}
