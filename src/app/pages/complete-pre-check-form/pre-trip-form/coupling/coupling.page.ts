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
      brakeAccessories: ['true', [Validators.required]],
      brakeAccessoriesNotes: [''],
      couplingDevices: ['true', [Validators.required]],
      couplingDevicesNotes: [''],
      fifthWheel: ['true', [Validators.required]],
      fifthWheelNotes: [''],
      rearEnd: ['true', [Validators.required]],
      rearEndNotes: [''],
      muffler: ['true', [Validators.required]],
      mufflerNotes: [''],
      frontAxle: ['true', [Validators.required]],
      frontAxleNotes: [''],
      suspensionSystem: ['true', [Validators.required]],
      suspensionSystemNotes: [''],
      transmission: ['true', [Validators.required]],
      transmissionNotes: [''],
    });
  }

  submitForm() {
    console.log(this.couplingCheckForm.value);
    this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/trailer');
  }

}
