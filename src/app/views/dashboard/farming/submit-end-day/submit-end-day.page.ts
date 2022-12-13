import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-end-day',
  templateUrl: './submit-end-day.page.html',
  styleUrls: ['./submit-end-day.page.scss'],
})
export class SubmitEndDayPage implements OnInit {

  submitEndDayWorkOrder: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.submitEndDayWorkOrder = this.formBuilder.group({
      acresCompleted: ['', [Validators.required]],
      gpsAcres: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    });
  }

  navigateTo() {
    console.log(this.submitEndDayWorkOrder.value);
    this.router.navigateByUrl('/tabs/home/farming');
  }

}
