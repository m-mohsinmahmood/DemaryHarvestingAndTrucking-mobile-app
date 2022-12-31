import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-pre-trip-form',
  templateUrl: './pre-trip-form.page.html',
  styleUrls: ['./pre-trip-form.page.scss'],
})
export class PreTripFormPage implements OnInit {

  buffer = 1;
  progress = 0;
  items = [];
  selectAray: any[] = [
    'Engine/Compartment',
    'In Cab',
    'Vehicle/External',
    'Brakes, Coupling',
    'Trailer',
  ];

  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  preCheckForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.items = [
      { content: 'Engine/Compartment', name: 'Bethnay Blake', date: '15/02/2022', status: 'complete', active: true },
      { content: 'In Cab', name: 'Martha Grander', date: '15/02/2022', status: 'complete', active: false },
      { content: 'Vehicle/External', name: 'Bethnay Blake', date: '15/02/2022', status: 'active', active: false },
      { content: 'Brakes, Coupling & Suspension', name: 'Katherine synder', date: '15/02/2022', status: 'in-complete', active: false },
      { content: 'Trailer', name: 'Katherine synder', date: '15/02/2022', status: 'in-complete', active: false },
    ];

    this.preCheckForm = this.formBuilder.group({
      truckID: ['', Validators.required],
      trailerID: ['', Validators.required]
    });
  }

  navigateTo(navTo: string) {
    switch (navTo) {
      case 'Engine/Compartment':
        // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/engine-check');
        this.router.navigateByUrl('/tabs/home/harvesting/complete-pre-check-form/pre-trip-form/engine-check');
        break;
      case 'In Cab':
        this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/in-cab');
        break;
      case 'Vehicle/External':
        this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/vehicle-external');
        break;
      case 'Brakes, Coupling & Suspension':
        this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/coupling');
        break;
      case 'Trailer':
        this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/trailer');
        break;
    }
  }

}
