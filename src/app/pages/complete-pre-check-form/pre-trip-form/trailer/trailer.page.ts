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
  progress = 0.6;
  trailerCheckForm: FormGroup;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.trailerCheckForm = this.formBuilder.group({
      brakeConnections: ['true', [Validators.required]],
      brakeConnectionsNotes: [''],
      brakes: ['true', [Validators.required]],
      brakesNotes: [''],
      couplingDevices: ['true', [Validators.required]],
      couplingDevicesNotes: [''],
      coupling: ['true', [Validators.required]],
      couplingNotes: [''],
      doors: ['true', [Validators.required]],
      doorsNotes: [''],
      hitch: ['true', [Validators.required]],
      hitchNotes: [''],
      landingGear: ['true', [Validators.required]],
      landingGearNotes: [''],
      lights: ['true', [Validators.required]],
      lightsNotes: [''],
      reflectors: ['true', [Validators.required]],
      reflectorsNotes: [''],
      roof: ['true', [Validators.required]],
      roofNotes: [''],
      suspension: ['true', [Validators.required]],
      suspensionNotes: [''],
      tarpaulin: ['true', [Validators.required]],
      tarpaulinNotes: [''],
      tires: ['true', [Validators.required]],
      tiresNotes: [''],
    });
  }

  submitForm() {
    console.log(this.trailerCheckForm.value);
    this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form');
  }
}
