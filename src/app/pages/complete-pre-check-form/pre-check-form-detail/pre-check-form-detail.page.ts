/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-check-form-detail',
  templateUrl: './pre-check-form-detail.page.html',
  styleUrls: ['./pre-check-form-detail.page.scss'],
})
export class PreCheckFormDetailPage implements OnInit {

  items=[
    {value: 'Light and Reflectors',status: 'Satisfactory',description:''},
    {value: 'Air Compressor Engine',status: 'Satisfactory',description:''},
    {value: 'Belts & Hoses',status: 'Unsatisfactory',description:''},
    {value: 'Radiators',status: 'Satisfactory',description:''},
    {value: 'Steering',status: 'Satisfactory',description:''},
    {value: 'Oil Level',status: 'Unsatisfactory',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor risus in laoreet rutrum. Ut ac urna euismod, fringilla ex non, lacinia libero. Sed arcu tortor, consectetur ac felis nec, ornare malesuada sem. Sed consectetur elit in nibh porta interdum. Sed varius elit eu orci aliquet.'},
    {value: 'Fluid Levels',status: 'Unsatisfactory',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor risus in laoreet rutrum. Ut ac urna euismod, fringilla ex non, lacinia libero. Sed arcu tortor, consectetur ac felis nec, ornare malesuada sem. Sed consectetur elit in nibh porta interdum. Sed varius elit eu orci aliquet.'},
    {value: 'Safety Equipment',status: 'Satisfactory',description:''},
    {value: 'Starter',status: 'Satisfactory',description:''},
    {value: 'Gauges (Dashboard)',status: 'Satisfactory',description:''},
    {value: 'Oil Pressure',status: 'Satisfactory',description:''},
    {value: 'Wipers/Wash',status: 'Satisfactory',description:''},
    {value: 'Defroster/Heater',status: 'Satisfactory',description:''},
    {value: 'Windows',status: 'Satisfactory',description:''},
    {value: 'Horns',status: 'Satisfactory',description:''},
    {value: 'Parking Brakes',status: 'Unsatisfactory',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor risus in laoreet rutrum. Ut ac urna euismod, fringilla ex non, lacinia libero. Sed arcu tortor, consectetur ac felis nec, ornare malesuada sem. Sed consectetur elit in nibh porta interdum. Sed varius elit eu orci aliquet.'},
    {value: 'Service Brakes',status: 'Unsatisfactory',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor risus in laoreet rutrum. Ut ac urna euismod, fringilla ex non, lacinia libero. Sed arcu tortor, consectetur ac felis nec, ornare malesuada sem. Sed consectetur elit in nibh porta interdum. Sed varius elit eu orci aliquet.'},
    {value: 'Leak Test',status: 'Satisfactory',description:''},
    {value: 'Light',status: 'Satisfactory',description:''},
    {value: 'Lights and Reflectors',status: 'Satisfactory',description:''},
    {value: 'Fuel Tank',status: 'Satisfactory',description:''},
    {value: 'Frame and Assembly',status: 'Satisfactory',description:''},
    {value: 'Drive Line',status: 'Satisfactory',description:''},
    {value: 'Lug Nuts (3)',status: 'Satisfactory',description:''},
    {value: 'Wheels/Rims (5)',status: 'Satisfactory',description:''},
    {value: 'Tires/Chains (5)',status: 'Satisfactory',description:''},
    {value: 'Exhaust',status: 'Satisfactory',description:''},
    {value: 'Battery Box',status: 'Satisfactory',description:''},
    {value: 'Mirros',status: 'Satisfactory',description:''},
    {value: 'Air Line',status: 'Satisfactory',description:''},
    {value: 'Brake Accessories',status: 'Satisfactory',description:''},
    {value: 'Coupling Devices',status: 'Satisfactory',description:''},
    {value: 'Fifth Wheel',status: 'Satisfactory',description:''},
    {value: 'Rear-End',status: 'Satisfactory',description:''},
    {value: 'Muffler',status: 'Satisfactory',description:''},
    {value: 'Front Axle',status: 'Satisfactory',description:''},
    {value: 'Suspension System',status: 'Satisfactory',description:''},
    {value: 'Transmission',status: 'Satisfactory',description:''},
    {value: 'Brake Connections',status: 'Satisfactory',description:''},
    {value: 'Brakes',status: 'Satisfactory',description:''},
    {value: 'Coupling (King) Pin',status: 'Satisfactory',description:''},
    {value: 'Doors',status: 'Satisfactory',description:''},
    {value: 'Hitch',status: 'Satisfactory',description:''},
    {value: 'Landing Gear',status: 'Satisfactory',description:''},
    {value: 'Lights All',status: 'Satisfactory',description:''},
    {value: 'Reflectors/Reflect. Tape',status: 'Satisfactory',description:''},
    {value: 'Roof',status: 'Satisfactory',description:''},
    {value: 'Tarpaulin',status: 'Satisfactory',description:''},
    {value: 'Tires',status: 'Satisfactory',description:''},



  ];
  constructor() { }

  ngOnInit() {
  }

}
