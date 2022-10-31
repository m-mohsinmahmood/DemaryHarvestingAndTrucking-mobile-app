import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-daily-combining',
  templateUrl: './start-daily-combining.page.html',
  styleUrls: ['./start-daily-combining.page.scss'],
})
export class StartDailyCombiningPage implements OnInit {
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
