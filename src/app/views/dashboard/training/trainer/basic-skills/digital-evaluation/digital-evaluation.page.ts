import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-digital-evaluation',
  templateUrl: './digital-evaluation.page.html',
  styleUrls: ['./digital-evaluation.page.scss'],
})
export class DigitalEvaluationPage implements OnInit {
  basicSkillForm: FormGroup;
  value;
  buffer = 1;
  progress = 0;
  selectAray: any[] = [
    'straight-line',
    'alley-docking',
    'offset',
    'parking-blind',
    'parking-sight',
    'coup-uncoup'
  ];
  // indexArray: any[] = [0.1666666666666667, 0.3333333333333334, 0.5000000000000001, 0.6666666666666668, 0.8333333333333335,1];
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  text=0;

  increment = 0;
  increment1 = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.basicSkillForm = this.formBuilder.group({
      pullUps: ['',[Validators.required]],
      encroach: ['',[Validators.required]],
      goal: ['',[Validators.required]],
      finalPosition: ['',[Validators.required]],
      straightLineBaking: ['',[Validators.required]],
      straightLineBakingInput: ['',[Validators.required]],
      alleyDocking: ['',[Validators.required]],
      alleyDockingInput: ['',[Validators.required]],
      offSetBacking: ['',[Validators.required]],
      offSetBackingInput: ['',[Validators.required]],
      parallelParkingBlind: ['',[Validators.required]],
      parallelParkingBlindInput: ['',[Validators.required]],
      coupUncoup: ['',[Validators.required]],
      coupUncoupInput: ['',[Validators.required]],
    });
  }
  navigate() {
    // console.log(this.basicSkillForm.value);
    this.increment1 = this.increment1 +1;
    // console.log(this.increment1)
    this.value = this.selectAray[this.increment1];
    // console.log(this.value);

    // passing index to get progress
    this.progress = this.indexArray[this.increment];

    this.increment = this.increment +1;
    // console.log(this.increment);
    this.text = this.increment;
  }
  submit(){
    console.log(this.basicSkillForm.value);
  }
}
