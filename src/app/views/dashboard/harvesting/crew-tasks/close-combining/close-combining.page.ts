import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-close-combining',
  templateUrl: './close-combining.page.html',
  styleUrls: ['./close-combining.page.scss'],
})
export class CloseCombiningPage implements OnInit {

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
