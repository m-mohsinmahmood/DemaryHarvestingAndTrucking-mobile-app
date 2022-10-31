import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  customerSetupForm: FormGroup;
  segment = 'sent'; // For Segment

  constructor(
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

}
