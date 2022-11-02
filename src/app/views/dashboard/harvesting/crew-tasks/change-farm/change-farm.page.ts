import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-farm',
  templateUrl: './change-farm.page.html',
  styleUrls: ['./change-farm.page.scss'],
})
export class ChangeFarmPage implements OnInit {
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
