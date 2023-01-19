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
  records: any;
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
    this.records = record[0];
   });

  //  this.preCheckForm.patchValue({
  //   oilLevel: this.records?.oilLevel === true? true : false,
  //   steelingLevel: this.records?.powerSteelingLevel === 'true'? true: false,
  //   coolantLevel: this.records?.coolantLevelEngine === 'true'? true : false,
  //  });

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
      comments: ['',[Validators.required]]
     });

     this.roadskillsForm = this.fromBuilder.group({
      trainerName: ['',[Validators.required]],
      totalTime: ['',[Validators.required]],
     });
  }

}
