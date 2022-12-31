/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.couplingCheckForm = this.formBuilder.group({
      airLine: ['true', [Validators.required]],
      airLineNotes: [''],
      airLineSelect:['minor'],
      brakeAccessories: ['true', [Validators.required]],
      brakeAccessoriesNotes: [''],
      brakeAccessoriesSelect:['minor'],
      couplingDevices: ['true', [Validators.required]],
      couplingDevicesNotes: [''],
      couplingDevicesSelect:['minor'],
      fifthWheel: ['true', [Validators.required]],
      fifthWheelNotes: [''],
      fifthWheelSelect:['minor'],
      rearEnd: ['true', [Validators.required]],
      rearEndNotes: [''],
      rearEndSelect:['minor'],
      muffler: ['true', [Validators.required]],
      mufflerNotes: [''],
      mufflerSelect:['minor'],
      frontAxle: ['true', [Validators.required]],
      frontAxleNotes: [''],
      frontAxleSelect:['minor'],
      suspensionSystem: ['true', [Validators.required]],
      suspensionSystemNotes: [''],
      suspensionSystemSelect:['minor'],
      transmission: ['true', [Validators.required]],
      transmissionNotes: [''],
      transmissionSelect:['minor'],
    });
  }

  submitForm() {
    console.log(this.couplingCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/trailer');
    this.router.navigateByUrl('/tabs/home/harvesting/complete-pre-check-form/pre-trip-form/engine-check/in-cab/vehicle-external/coupling/trailer');

  }

}
