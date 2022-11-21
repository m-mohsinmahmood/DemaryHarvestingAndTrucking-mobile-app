import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-trip-form',
  templateUrl: './pre-trip-form.page.html',
  styleUrls: ['./pre-trip-form.page.scss'],
})
export class PreTripFormPage implements OnInit {
  buffer = 1;
  progress = 0.4;
 items=[];
  selectAray: any[] = [
    'Engine/Compartment',
    'In Cab',
    'Vehicle/External',
    'Brakes, Coupling',
    'Trailer',
  ];
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {content:'Engine/Compartment',name:'Bethnay Blake', date:'15/02/2022', status:'complete',active:true},
      {content:'In Cab',name:'Martha Grander', date:'15/02/2022',status:'complete',active:true},
      {content:'Vehicle/External',name:'Bethnay Blake', date:'15/02/2022',status:'active',active:true},
      {content:'Brakes, Coupling & Suspension', name:'Katherine synder', date:'15/02/2022',status:'in-complete',active:true},
      {content:'Trailer', name:'Katherine synder', date:'15/02/2022',status:'in-complete',active:true},
  ];

  }

  navigateTo(navTo: string) {
    this.router.navigateByUrl(navTo);
  }
}
