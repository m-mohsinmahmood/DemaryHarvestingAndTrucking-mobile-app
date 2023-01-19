import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from '../../../../training.service';

@Component({
  selector: 'app-view-records',
  templateUrl: './view-records.page.html',
  styleUrls: ['./view-records.page.scss'],
})
export class ViewRecordsPage implements OnInit {
  formType: any;
  preCheckForm: FormGroup;
  roadskillsForm: FormGroup;
  recordId: any;
  constructor(
    private router: Router,
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private trainingService: TrainingService,

  ) { }

  ngOnInit() {
    // console.log(this.router.getCurrentNavigation().extras.state.formType);
    // this.formType = this.router.getCurrentNavigation().extras.state.formType;
   this.route.queryParams.subscribe((params)=>{
    console.log('PARAMS:',params);
    this.formType = params.formType;
    this.recordId = params.recordId;
   });

   this.initForms();

   // getting record by id
   this.trainingService.getRecordById(this.recordId)
   .subscribe((record)=>{
    console.log('Record:',record);
   });

  }
  exit(){
   console.log(this.preCheckForm.value);
   console.log(this.roadskillsForm.value);
  }
  initForms(){
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

}
