import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.page.html',
  styleUrls: ['./trailer.page.scss'],
})
export class TrailerPage implements OnInit {
  buffer = 1;
  progress = 0.8;
  trailerCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.trailerCheckForm = this.formBuilder.group({
      brakeConnections: ['true', [Validators.required]],
      brakeConnectionsNotes: [''],
      brakeConnectionsSelect:['minor'],
      brakes: ['true', [Validators.required]],
      brakesNotes: [''],
      brakesSelect:['minor'],
      couplingDevices: ['true', [Validators.required]],
      couplingDevicesNotes: [''],
      couplingDevicesSelect:['minor'],
      coupling: ['true', [Validators.required]],
      couplingNotes: [''],
      couplingSelect:['minor'],
      doors: ['true', [Validators.required]],
      doorsNotes: [''],
      doorSelect:['minor'],
      hitch: ['true', [Validators.required]],
      hitchNotes: [''],
      hitchSelect:['minor'],
      landingGear: ['true', [Validators.required]],
      landingGearNotes: [''],
      landingGearSelect:['minor'],
      lights: ['true', [Validators.required]],
      lightsNotes: [''],
      lightsSelect:['minor'],
      reflectors: ['true', [Validators.required]],
      reflectorsNotes: [''],
      reflectorsSelect:['minor'],
      roof: ['true', [Validators.required]],
      roofNotes: [''],
      roofSelect:['minor'],
      suspension: ['true', [Validators.required]],
      suspensionNotes: [''],
      suspensionSelect:['minor'],
      tarpaulin: ['true', [Validators.required]],
      tarpaulinNotes: [''],
      tarpaulinSelect:['minor'],
      tires: ['true', [Validators.required]],
      tiresNotes: [''],
      tiresSelect:['minor'],
    });
  }

  submitForm() {
    console.log(this.trailerCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form');
    this.router.navigateByUrl('/tabs/home/harvesting/complete-pre-check-form/pre-trip-form');

  }
}
