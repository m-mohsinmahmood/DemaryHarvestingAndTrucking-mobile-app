/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TrainingService } from '../../../training.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-digital-form',
  templateUrl: './digital-form.page.html',
  styleUrls: ['./digital-form.page.scss'],
})
export class DigitalFormPage implements OnInit {
  preTripForm: FormGroup;
  value: any;
  buffer = 1;
  progress = 0;
  result: any = 0;
  training_record_id: any;
  supervisor_id: any;
  isModalOpen = false;
   // trainer id
 trainer_id;
 public loadingSpinner = new BehaviorSubject(false);

  constructor(private formBuilder: FormBuilder,
    private router:  Router,
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private toastService: ToastService) { }

  ngOnInit() {
     // passing the select value for Engine/Compartment to render when page loads
    this.value = 'engine/compartment';

     // getting id & role
   this.getRoleAndID();

    this.initForm();

    this.route.queryParams.subscribe((params)=>{
      this.training_record_id = params.training_record_id;
      this.supervisor_id = params.supervisor_id;
    });
  }
  initForm(){
    this.preTripForm = this.formBuilder.group({
      //Engine/Compartment
      oilLevel: [false,[Validators.required]],
      coolantLevelEngine: [false,[Validators.required]],
      powerSteelingLevel: [false,[Validators.required]],
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
      commentsEngine: ['',[Validators.required]],
      category:['engine-compartment'],
      percentageEngineCompartment:[],
      trainer_id:[this.trainer_id]
    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.oilLevel){
        sum = 1 + sum;
      }
       if (value.coolantLevelEngine){
        sum = 1 + sum;
      }
      if (value.powerSteelingLevel){
        sum = 1 + sum;
      }
      if (value.h20){
        sum = 1 + sum;
      }
      if (value.alternatorBelt){
        sum = 1 + sum;
      }
      if (value.airCompresseorEngine){
        sum = 1 + sum;
      }
      if (value.leaksHoses){
        sum = 1 + sum;
      }
      if (value.fanShroud){
        sum = 1 + sum;
      }
      if (value.radiator){
        sum = 1 + sum;
      }
      if (value.wiring){
        sum = 1 + sum;
      }
      if (value.steeringBox){
        sum = 1 + sum;
      }
      if (value.steeringLinkage){
        sum = 1 + sum;
      }
      if (value.hosesSteering){
        sum = 1 + sum;
      }
      if (value.turbo){
        sum = 1 + sum;
      }
      if (value.windowFluid){
        sum = 1 + sum;
      }
      if (value.mirror){
        sum = 1 + sum;
      }
      if (value.clutchCondition){
        sum = 1 + sum;
      }

      console.log('total:',sum);
       this.result = Math.round((sum / 17) * 100);
      console.log('Percentage:',this.result);
    });
  }
  async ionViewDidEnter() {
    this.getRoleAndID();
  }
  getRoleAndID(){
    this.trainer_id = localStorage.getItem('employeeId');

  }
  next(){
    this.isModalOpen = true;
  }
  edit(){
    this.isModalOpen = false;
  }
  submit(){
    this.loadingSpinner.next(true);

    //patching value
    this.preTripForm.patchValue({
      percentageEngineCompartment: this.result
    });

    console.log(this.preTripForm.value);
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          // closing modal
          this.isModalOpen = false;

          // spinner
          this.loadingSpinner.next(false);

          // tooltip
          this.toastService.presentToast(
            'Engine/Compartment details have been submitted',
            'success'
          );

          // navigating
          if (this.isModalOpen === false) {
            setTimeout(()=>{
              this.router.navigate([ '/tabs/home/training/trainer/pre-trip/digital-form/in-cab'],{
                queryParams:{
                  training_record_id: this.training_record_id,
                  supervisor_id: this.supervisor_id
                }
              });
            },500);
          }
        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
        }
      },
      (err) => {
        console.log('ERROR::', err);
        this.toastService.presentToast(err.mssage, 'danger');
      }
    );

  }
}
