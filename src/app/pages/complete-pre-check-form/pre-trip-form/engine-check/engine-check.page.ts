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
  progress = 0;

  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  engineCheckForm: FormGroup;
  role = '';


  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.engineCheckForm = this.formBuilder.group({
      airCompressorEngine: ['true', [Validators.required]],
      airCompressorEngineSelect: ['minor'],
      airCompressorEngineNotes: [''],
      beltsHoses: ['true', [Validators.required]],
      beltsHosesNotes: [''],
      beltsHosesSelect: ['minor'],
      radiator: ['true', [Validators.required]],
      radiatorNotes: [''],
      radiatorSelect: ['minor'],
      steering: ['true', [Validators.required]],
      steeringNotes: [''],
      steeringSelect: ['minor'],
      oilLvl: ['true', [Validators.required]],
      oilLvlNotes: [''],
      oilLvlSelect: ['minor'],
      fluidLvl: ['true', [Validators.required]],
      fluidLvlNotes: [''],
      fluidLvlSelect: ['minor'],
      clutchCondition: ['true', [Validators.required]],
      clutchConditionNotes: [''],
      clutchConditionSelect: ['minor'],
    });
  }
  submitForm() {
    console.log(this.engineCheckForm.value);
    // this.router.navigateByUrl('/complete-pre-check-form/pre-trip-form/in-cab');
    this.router.navigateByUrl('/tabs/home/harvesting/complete-pre-check-form/pre-trip-form/engine-check/in-cab');
  }

}
