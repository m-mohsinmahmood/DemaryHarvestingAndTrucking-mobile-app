import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delivery-ticket',
  templateUrl: './delivery-ticket.page.html',
  styleUrls: ['./delivery-ticket.page.scss'],
})
export class DeliveryTicketPage implements OnInit {
  segment = 'sent'; // For Segment
  customerSetupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location

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
