import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-farm-crop',
  templateUrl: './change-farm-crop.page.html',
  styleUrls: ['./change-farm-crop.page.scss'],
})
export class ChangeFarmCropPage implements OnInit {
  customerSetupForm: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.customerSetupForm = this.formBuilder.group({
      state: [null, [Validators.required]],
      customer_name: [null, [Validators.required]],
      farm: [null, [Validators.required]],
      crop: [[]],
      initial_field: [null, [Validators.required]],
    });
  }
  goBack(){
    this.location.back();
  }
}
