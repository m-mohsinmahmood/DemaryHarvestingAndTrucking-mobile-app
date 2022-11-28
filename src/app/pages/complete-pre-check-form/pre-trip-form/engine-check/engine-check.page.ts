import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-engine-check',
  templateUrl: './engine-check.page.html',
  styleUrls: ['./engine-check.page.scss'],
})
export class EngineCheckPage implements OnInit {

  buffer = 1;
  progress = 0.6;

  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  engineCheckForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.engineCheckForm = this.formBuilder.group({
      airCompressorEngine: ['true', [Validators.required]],
      airCompressorEngineNotes: [''],
      beltsHoses: ['true', [Validators.required]],
      beltsHosesNotes: [''],
      radiator: ['true', [Validators.required]],
      radiatorNotes: [''],
      steering: ['true', [Validators.required]],
      steeringNotes: [''],
      oilLvl: ['true', [Validators.required]],
      oilLvlNotes: [''],
      fluidLvl: ['true', [Validators.required]],
      fluidLvlNotes: [''],
      clutchCondition: ['true', [Validators.required]],
      clutchConditionNotes: ['']
    });
  }

  submitForm() {
    console.log(this.engineCheckForm.value);
    this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/in-cab');
  }

}
