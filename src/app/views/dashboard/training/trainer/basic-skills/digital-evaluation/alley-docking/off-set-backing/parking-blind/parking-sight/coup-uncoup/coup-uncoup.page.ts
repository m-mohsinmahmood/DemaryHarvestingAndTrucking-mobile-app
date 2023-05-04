/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';
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
  trainer_id;
  supervisor_id;
  math = Math;
  training_record_id: any;
  training_record: any;
  checkValue: any;
  isModalOpen = false;
  active_check_in_id: any;

  public loadingSpinner = new BehaviorSubject(false);
  public activeCheckInSpinner = new BehaviorSubject(false);
  // public loading = new BehaviorSubject(true);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private dwrServices: CheckInOutService


    ) { }

    ngOnInit() {
      // getting id & role
      this.getRoleAndID();

      this.initForm();

      //query params
      this.route.queryParams.subscribe((params)=>{
        console.log('params',params);
        this.training_record_id = params.training_record_id;
        this.supervisor_id = params.supervisor_id;

      });

    // getting training record by id
    this.getRecord();
    }
    async ionViewDidEnter() {
      this.getRoleAndID();
    }
    getRoleAndID(){
      this.trainer_id = localStorage.getItem('employeeId');
    }
    initForm(){
      this.basicSkillForm = this.formBuilder.group({
        pullUps_cou: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
        encroach_cou: [null,[Validators.required,Validators.pattern(('^([0-9])$'))]],
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
        coupUncoup_cou: [],
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
        if(value.goal_cou === 'true' && value.finalPosition_cou === 'true'){
          this.checkValue = 'true';
        }else{
            this.checkValue = 'false';
          }
      });
    }
    addFeedback(){
      this.feedbackValue = true;
    }
    next(){
      this.isModalOpen = true;
    }
    edit(){
      this.isModalOpen = false;
    }
    navigate(){
      this.loadingSpinner.next(true);

         // get check-in ID
         this.getCheckInID();
    }
    submitData() {

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
          this.training_record = record.summary[0];

            // patching
            this.basicSkillForm.patchValue({
              straightLineBacking_cou: (this.training_record.goal_slb === 'true') && (this.training_record.finalPosition_slb === 'true') === true? 'true': 'false',
              straightLineBackingInput_cou: +this.training_record.pullUpsInput_slb + +this.training_record.encroachInput_slb,
              alleyDocking_cou: (this.training_record.goal_ad === 'true') && (this.training_record.finalPosition_ad === 'true') === true? 'true': 'false',
              alleyDockingInput_cou: +this.training_record.pullUpsInput_ad + +this.training_record.encroachInput_ad,
              offSetBacking_cou: (this.training_record.goal_osb === 'true') && (this.training_record.finalPosition_osb === 'true') === true? 'true': 'false',
              offSetBackingInput_cou: +this.training_record.pullUps_osb + +this.training_record.encroach_osb,
              parallelParkingBlind_cou:  (this.training_record.goal_pb === 'true') && (this.training_record.finalPosition_pb === 'true') === true? 'true': 'false',
              parallelParkingBlindInput_cou: +this.training_record.pullUps_pb + +this.training_record.encroach_pb,
              parallelParkingSight_cou: (this.training_record.goal_ps === 'true') && (this.training_record.finalPosition_ps === 'true') === true? 'true': 'false',
              parallelParkingSightInput_cou: +this.training_record.pullUps_ps + +this.training_record.encroach_ps,
            });


        });
    }
    getCheckInID(){

      this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
        this.activeCheckInSpinner.next(true);
        console.log('Active Check ID: ', workOrder.dwr[0].id);
        this.active_check_in_id = workOrder.dwr[0].id;
        this.activeCheckInSpinner.next(false);

       // submit data
       this.submitData();
      });

    }
    createDWR(){
      console.log('Active check:',this.active_check_in_id);
      this.trainingService
       .createDWR(this.trainer_id, this.training_record_id,'','','basic-skills','digital-form',this.supervisor_id,this.active_check_in_id)
       .subscribe(
         (res) => {
           if (res.status === 200) {

             // spinner
             this.loadingSpinner.next(false);

            //  closing modal
          this.isModalOpen = false;

            // tooltip
            this.toastService.presentToast(
              'Digital Evaluation completed',
              'success'
            );


            // navigating
          if (this.isModalOpen === false) {
            setTimeout(()=>{
              this.router.navigate(['/tabs/home/training/trainer']);
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
           this.loadingSpinner.next(false);

         }
       );
   }

}
