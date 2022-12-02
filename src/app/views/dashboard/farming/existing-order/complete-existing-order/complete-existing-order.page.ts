import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-existing-order',
  templateUrl: './complete-existing-order.page.html',
  styleUrls: ['./complete-existing-order.page.scss'],
})
export class CompleteExistingOrderPage implements OnInit {

  completeExistingWorkOrder: FormGroup;

  constructor(private activeRoute: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.completeExistingWorkOrder = this.formBuilder.group({
      machineryID: ['', [Validators.required]],
      cBeginningEngineHours: ['', [Validators.required]],
      workOrderId: ['', [Validators.required]],
      dispatcherId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      farmId: ['', [Validators.required]],
      fieldId: ['', [Validators.required]],
      service: ['', [Validators.required]],
      tractorDriverId: ['', [Validators.required]],
      fieldAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  navigateTo(nav: string) {
    console.log(this.completeExistingWorkOrder.value);
    this.activeRoute.navigateByUrl(nav);
  }

}
