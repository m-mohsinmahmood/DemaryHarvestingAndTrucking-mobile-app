import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.page.html',
  styleUrls: ['./job-setup.page.scss'],
})
export class JobSetupPage implements OnInit {
  customerSetupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,

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
