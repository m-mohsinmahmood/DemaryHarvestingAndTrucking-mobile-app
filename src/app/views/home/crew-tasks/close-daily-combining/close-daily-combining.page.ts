import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-close-daily-combining',
  templateUrl: './close-daily-combining.page.html',
  styleUrls: ['./close-daily-combining.page.scss'],
})
export class CloseDailyCombiningPage implements OnInit {
  customerSetupForm: FormGroup;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.customerSetupForm = this.formBuilder.group({
      separator_hours: [null, [Validators.required]],
      engine_hours: [null, [Validators.required]],
      acres_completed: [null, [Validators.required]],
    });
  }
  goBack(){
    this.location.back();
  }
}
