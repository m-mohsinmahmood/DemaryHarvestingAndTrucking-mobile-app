import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmingService } from './../farming.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {

  role = '';
  createOrderDispatcher: FormGroup;
  createOrderTDriver: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private farmingService: FarmingService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.createOrderDispatcher = this.formBuilder.group({
      dispatcherId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      farmId: ['', [Validators.required]],
      fieldId: ['', [Validators.required]],
      service: ['', [Validators.required]],
      tractorDriver: ['', [Validators.required]],
      fieldAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

    this.createOrderTDriver = this.formBuilder.group({
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
    if (this.role === 'dispatcher') {
      console.log(this.createOrderDispatcher.value);
      this.createWorkOrder(this.createOrderDispatcher.value);
    }
    else {
      console.log(this.createOrderTDriver.value);
      this.createWorkOrder(this.createOrderTDriver.value);
    }

    this.router.navigateByUrl(nav);
  }

  createWorkOrder(workOrder: any): void {
    this.farmingService.createNewWorkOrder(workOrder);
  }

}
