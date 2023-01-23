/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from '../../../../training.service';
import { BehaviorSubject } from 'rxjs';

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
  trainerName: any;
  records: any;
  trainee_id: any;

  // behaviour subject
  public loading = new BehaviorSubject(true);

   // trainer id
 trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';
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
    this.trainerName = params.trainerName;
    this.trainee_id = params.trainee_id;

   });

   this.initForms();




   if(this.formType === 'summary'){
// getting record by id for summary
this.trainingService.getSummary(this.trainee_id, this.trainer_id,'summary')
.subscribe((record)=>{
 this.loading.next(true);
 this.records = record[0];
 this.loading.next(false);
 console.log('Record:',record);
});

   }else{

// getting record by id for pre-trip, basic-skills,road-skills
this.trainingService.getRecordById(this.recordId)
.subscribe((record)=>{
 this.loading.next(true);
 this.records = record[0];
 this.loading.next(false);
 console.log('Record:',record);
});
   }


  }
  exit(){
   console.log(this.preCheckForm.value);
   console.log(this.roadskillsForm.value);
  }
  initForms(){
    this.preCheckForm = this.fromBuilder.group({
      oilLevel: ['',[Validators.required]],
      coolantLevel: ['',[Validators.required]],
      steelingLevel: ['',[Validators.required]],
      h20: ['',[Validators.required]],
      alternatorBelt: ['',[Validators.required]],
      airCompresseorEngine: ['',[Validators.required]],
      leaksHoses: ['',[Validators.required]],
      fanShroud: ['',[Validators.required]],
      radiator: ['',[Validators.required]],
      wiring: ['',[Validators.required]],
      steeringBox: ['',[Validators.required]],
      steeringLinkage: ['',[Validators.required]],
      hosesSteering: ['',[Validators.required]],
      turbo: ['',[Validators.required]],
      windowFluid: ['',[Validators.required]],
      mirror: ['',[Validators.required]],
      clutchCondition: ['',[Validators.required]],
      commentsEngine: ['',[Validators.required]]
     });

     this.roadskillsForm = this.fromBuilder.group({
      trainerName: ['',[Validators.required]],
      totalTime: ['',[Validators.required]],
     });
  }

}
