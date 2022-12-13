import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-close-out-order',
  templateUrl: './close-out-order.page.html',
  styleUrls: ['./close-out-order.page.scss'],
})
export class CloseOutOrderPage implements OnInit {

  closeOutWorkOrder: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.closeOutWorkOrder = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      acresByService: ['', [Validators.required]],
      endingEngineHours: ['', [Validators.required]],
      gpsAcresByService: ['', [Validators.required]]
    });
  }

  navigateTo() {
    console.log(this.closeOutWorkOrder.value);
    this.router.navigateByUrl('/tabs/home/farming');
  }

}
