/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute

    ) { }

    ngOnInit() {
      this.basicSkillForm = this.formBuilder.group({
        pullUps_cou: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        encroach_cou: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        goal_cou: ['',[Validators.required]],
        finalPosition_cou: ['',[Validators.required]],
        straightLineBacking_cou: ['',[Validators.required]],
        straightLineBackingInput_cou: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        alleyDocking_cou: ['',[Validators.required]],
        alleyDockingInput_cou: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        offSetBacking_cou: ['',[Validators.required]],
        offSetBackingInput_cou: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        parallelParkingBlind_cou: ['',[Validators.required]],
        parallelParkingBlindInput_cou: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        coupUncoup_cou: ['',[Validators.required]],
        coupUncoupInput_cou: ['',[Validators.required,Validators.pattern(('^([1-5])$'))]],
        comments_cou:[''],
        category:['coup-uncoup'],
        satisfactoryCoupUncoup:[],
        unSatisfactoryCoupUncoup:[],
        trainer_id: [this.trainer_id]

      });
      this.basicSkillForm.valueChanges.subscribe((value)=>{
        let sum = 0;
        let unSatSum = 0;
        if(value.straightLineBacking_cou === 'true'){
          sum = +value.straightLineBackingInput_cou + sum;
        }else{
          unSatSum = +value.straightLineBackingInput_cou + unSatSum;
        }
        if(value.alleyDocking_cou === 'true'){
          sum = +value.alleyDockingInput_cou + sum;
        }else{
          unSatSum = +value.alleyDockingInput_cou + unSatSum;
        }
        if(value.offSetBacking_cou === 'true'){
          sum = +value.offSetBackingInput_cou + sum;
        }else{
          unSatSum = +value.offSetBackingInput_cou + unSatSum;
        }
        if(value.parallelParkingBlind_cou === 'true'){
          sum = +value.parallelParkingBlindInput_cou + sum;
        }else{
          unSatSum = +value.parallelParkingBlindInput_cou + unSatSum;
        }
        if(value.coupUncoup_cou === 'true'){
          sum = +value.coupUncoupInput_cou + sum;
        }else{
          unSatSum = +value.coupUncoupInput_cou + unSatSum;
        }
        this.totalSatisfactory = sum;
        console.log('--',unSatSum);
          this.totalUnSatisfactory = unSatSum;
      });
      this.route.queryParams.subscribe((params)=>{
        this.training_record_id = params.training_record_id;
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    navigate() {
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

            // creating DWR
           this.createDWR();

            this.toastService.presentToast(
              'Digital Evaluation completed',
              'success'
            );

            // navigating
            // this.router.navigateByUrl('/tabs/home/training/trainer');
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
    createDWR(){
      this.trainingService
       .createDWR(localStorage.getItem('employeeId'), this.training_record_id,'basic-skills','digital-form')
       .subscribe(
         (res) => {
           console.log('RES:', res);
           if (res.status === 200) {
             this.router.navigateByUrl('/tabs/home/training/trainer');
             // this.toastService.presentToast(
             //   'Ticket has been completed',
             //   'success'
             // );
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
