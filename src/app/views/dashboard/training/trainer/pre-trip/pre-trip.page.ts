import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-trip',
  templateUrl: './pre-trip.page.html',
  styleUrls: ['./pre-trip.page.scss'],
})
export class PreTripPage implements OnInit {
  value: any;
  buffer = 1;
  progress = 0;
  selectAray: any[] = [
    'engine/compartment',
    'incab',
    'vehicle/external',
    'coupling',
    'suspension/brakes',
  ];
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  constructor() {}

  ngOnInit() {
    // passing the select value for Engine/Compartment to render when page loads
    this.value = 'engine/compartment';
  }
  onSelect(e) {
    this.value = e.target.value;
    // getting the index
    const index = this.selectAray.indexOf(e.target.value);

    // passing index to get progress
    this.progress = this.indexArray[index];
  }
}
