import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-trip',
  templateUrl: './pre-trip.page.html',
  styleUrls: ['./pre-trip.page.scss'],
})
export class PreTripPage implements OnInit {
value: any;
  constructor() { }

  ngOnInit() {
    // passing the select value for Engine/Compartment to render when page loads
    this.value = '1';
  }
  onSelect(e){
    this.value = e.target.value;
  }
}
