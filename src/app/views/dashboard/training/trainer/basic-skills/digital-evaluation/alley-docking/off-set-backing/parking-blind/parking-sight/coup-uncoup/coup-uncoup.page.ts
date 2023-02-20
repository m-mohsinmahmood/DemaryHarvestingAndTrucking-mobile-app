/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-coup-uncoup',
  templateUrl: './coup-uncoup.page.html',
  styleUrls: ['./coup-uncoup.page.scss'],
})
export class CoupUncoupPage implements OnInit {

  buffer = 1;
  progress = 0.8333333333333335;
  feedbackValue: any;
  basicSkillForm: FormGroup;


  totalSatisfactory = 0;
  totalUnSatisfactory = 0;
  // trainer id
  trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';
  math = Math;
  training_record_id: any;
  training_record: any;
  checkValue: any;


  public loadingSpinner = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

    ) { }

    ngOnInit() {
      this.initForm()

      //query params
      this.route.queryParams.subscribe((params)=>{
        this.training_record_id = params.training_record_id;
      });

    // getting training record by id
    this.getRecord();
    }
    initForm(){
      this.basicSkillForm = this.formBuilder.group({
        pullUps_cou: [null,[Validators.required,Validators.pattern(('^([0-5])$'))]],
        encroach_cou: [null,[Validators.required,Validators.pattern(('^([0-5])$'))]],
        goal_cou: ['',[Validators.required]],
        finalPosition_cou: ['',[Validators.required]],
        straightLineBacking_cou: [''],
        straightLineBackingInput_cou: [''],
        alleyDocking_cou: [''],
        alleyDockingInput_cou: [''],
        offSetBacking_cou: [''],
        offSetBackingInput_cou: [''],
        parallelParkingBlind_cou: [''],
        parallelParkingBlindInput_cou: [''],
        parallelParkingSight_cou: [''],
        parallelParkingSightInput_cou: [''],
        coupUncoup_cou: [''],
        coupUncoupInput_cou: [''],
        comments_cou:[''],
        category:['coup-uncoup'],
        satisfactoryCoupUncoup:[],
        unSatisfactoryCoupUncoup:[],
        trainer_id: [this.trainer_id]

      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        // for input fields
        sum = +value.pullUps_cou +value.encroach_cou + +sum;
        this.totalSatisfactory = sum;

        // for checkboxes
        if(value.goal_cou === 'true'){
          this.checkValue = (value.goal_cou === 'true' && value.finalPosition_cou === 'true' && (+value.pullUps_cou +value.encroach_cou  <= 1) === true? 'true': 'false')
        }else{
          this.checkValue = 'false'
        }
        if(value.finalPosition_cou === 'true'){
          this.checkValue = (value.goal_cou === 'true' && value.finalPosition_cou === 'true' && (+value.pullUps_cou +value.encroach_cou  <= 1) === true? 'true': 'false')
        }else{
          this.checkValue = 'false'
        }
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
      this.loadingSpinner.next(true);

      // patching sat & un-sat results
  this.basicSkillForm.patchValue({
    satisfactoryCoupUncoup:this.totalSatisfactory,
    unSatisfactoryCoupUncoup:this.totalUnSatisfactory
  });

      console.log(this.basicSkillForm.value);
      this.trainingService.saveFroms(this.basicSkillForm.value, 'basic-skills').subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            // creating DWR
           this.createDWR();

            this.toastService.presentToast(
              'Digital Evaluation completed',
              'success'
            );

            // navigating
            this.router.navigate(['/tabs/home/training/trainer'],{
              queryParams:{
                training_record_id: this.training_record_id
              }
            });

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
    getRecord() {
      this.trainingService
        .getRecordById(this.training_record_id)
        .subscribe((record) => {
          this.training_record = record[0];
          console.log('Record::', this.training_record);
          // patching
          this.basicSkillForm.patchValue({
            straightLineBacking_cou: (+this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb >= 2) && (this.training_record.goal_slb === 'false') && (this.training_record.finalPosition_slb === 'false') === false? 'false': 'true',
            straightLineBackingInput_cou: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
            alleyDocking_cou: (+this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad >= 2) && (this.training_record.goal_ad === 'false') && (this.training_record.finalPosition_ad === 'false') === false? 'false': 'true',
            alleyDockingInput_cou: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
            offSetBacking_cou: (+this.training_record.encroach_osb + +this.training_record.encroach_osb >= 2) && (this.training_record.goal_osb === 'false') && (this.training_record.finalPosition_osb === 'false') === false? 'false': 'true',
            offSetBackingInput_cou: +this.training_record.pullUps_osb + +this.training_record.encroach_osb,
            parallelParkingBlind_cou: (+this.training_record.pullUps_pb + +this.training_record.encroach_pb >= 2) && (this.training_record.goal_pb === 'false') && (this.training_record.finalPosition_pb === 'false') === false? 'false': 'true',
            parallelParkingBlindInput_cou: +this.training_record.pullUps_pb + +this.training_record.encroach_pb,
            parallelParkingSight_cou: (+this.training_record.pullUps_ps + +this.training_record.encroach_ps >= 2) && (this.training_record.goal_ps === 'false') && (this.training_record.finalPosition_ps === 'false') === false? 'false': 'true',
            parallelParkingSightInput_cou: +this.training_record.pullUps_ps + +this.training_record.encroach_ps,

          })
        });
    }
    createDWR(){
      this.trainingService
       .createDWR(localStorage.getItem('employeeId'), this.training_record_id,'basic-skills','digital-form','4543344b-0b74-49a2-b3c7-d388851f0013')
       .subscribe(
         (res) => {
           console.log('RES:', res);
           if (res.status === 200) {
             this.router.navigateByUrl('/tabs/home/training/trainer');
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
