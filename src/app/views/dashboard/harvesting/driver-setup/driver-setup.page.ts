/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-driver-setup',
  templateUrl: './driver-setup.page.html',
  styleUrls: ['./driver-setup.page.scss'],
})
export class DriverSetupPage implements OnInit {

  driverSetupForm: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.driverSetupForm = this.formBuilder.group({
      truck_driver: ['',[Validators.required]],
    });

  }
  goBack(){
    this.location.back();
  }
  add(){
    console.log(this.driverSetupForm.value);
  }

}
