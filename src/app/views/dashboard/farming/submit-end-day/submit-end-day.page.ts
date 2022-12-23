import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmingService } from './../farming.service';

@Component({
  selector: 'app-submit-end-day',
  templateUrl: './submit-end-day.page.html',
  styleUrls: ['./submit-end-day.page.scss'],
})
export class SubmitEndDayPage implements OnInit {

  submitEndDayWorkOrder: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private farmingService: FarmingService) {
  }

  ngOnInit() {
    this.submitEndDayWorkOrder = this.formBuilder.group({
      employeeId: ['1a4d594b-726c-46e4-b677-5e4a78adbc1e'],
      acresCompleted: ['', [Validators.required]],
      gpsAcres: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      hoursWorked: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    });
  }

  navigateTo() {
    console.log(this.submitEndDayWorkOrder.value);
    this.farmingService.closeBeginningDay(this.submitEndDayWorkOrder.value);
    this.router.navigateByUrl('/tabs/home/farming');
  }

}
