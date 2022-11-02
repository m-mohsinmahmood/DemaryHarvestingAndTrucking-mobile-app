import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-start-combining',
  templateUrl: './start-combining.page.html',
  styleUrls: ['./start-combining.page.scss'],
})
export class StartCombiningPage implements OnInit {
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
