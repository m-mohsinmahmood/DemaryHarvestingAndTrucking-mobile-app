import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.page.html',
  styleUrls: ['./view-records.page.scss'],
})
export class ViewRecordsPage implements OnInit {
  evaluationtype: any;
  preCheckForm: FormGroup;
  roadskillsForm: FormGroup;

  constructor(
    private router: Router,
    private fromBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    console.log(this.router.getCurrentNavigation().extras.state.evaluationType);
    this.evaluationtype = this.router.getCurrentNavigation().extras.state.evaluationType;

   this.preCheckForm = this.fromBuilder.group({
    oilLevel: [false,[Validators.required]],
    coolantLevel: [false,[Validators.required]],
    steelingLevel: [false,[Validators.required]],
    h20: [false,[Validators.required]],
    alternatorBelt: [false,[Validators.required]],
    airCompresseorEngine: [false,[Validators.required]],
    leaksHoses: [false,[Validators.required]],
    fanShroud: [false,[Validators.required]],
    radiator: [false,[Validators.required]],
    wiring: [false,[Validators.required]],
    steeringBox: [false,[Validators.required]],
    steeringLinkage: [false,[Validators.required]],
    hosesSteering: [false,[Validators.required]],
    turbo: [false,[Validators.required]],
    windowFluid: [false,[Validators.required]],
    mirror: [false,[Validators.required]],
    clutchCondition: [false,[Validators.required]],
    comments: ['',[Validators.required]]
   });

   this.roadskillsForm = this.fromBuilder.group({
    trainerName: ['',[Validators.required]],
    totalTime: ['',[Validators.required]],
   });
  }
  exit(){
   console.log(this.preCheckForm.value);
   console.log(this.roadskillsForm.value);
  }

}
