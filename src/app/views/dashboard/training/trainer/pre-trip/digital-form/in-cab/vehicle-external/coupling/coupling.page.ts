/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-coupling',
  templateUrl: './coupling.page.html',
  styleUrls: ['./coupling.page.scss'],
})
export class CouplingPage implements OnInit {
  preTripForm: FormGroup;
  buffer = 1;
  progress = 0.75;
  result: any = 0;
  training_record_id: any;
  isModalOpen = false;
    trainer_id;
    supervisor_id;
  active_check_in_id: any;

    public loadingSpinner = new BehaviorSubject(false);
  public activeCheckInSpinner = new BehaviorSubject(false);


  constructor(private formBuilder: FormBuilder,
    private router:  Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private dwrServices: CheckInOutService
    ) { }

  ngOnInit() {
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
      //Coupling

  air_electrical_lines: [false,[Validators.required]],
  glad_hands: [false,[Validators.required]],
  clearence_lights: [false,[Validators.required]],
  reflector_tape: [false,[Validators.required]],
  chain_strap_attachment_bar: [false,[Validators.required]],
  landing_gear: [false,[Validators.required]],
  cargo_box: [false,[Validators.required]],
  abs_lights: [false,[Validators.required]],
  mud_flaps: [false,[Validators.required]],
  // lights: [false,[Validators.required]],
  docking_impact_frame: [false,[Validators.required]],
  license_plate: [false,[Validators.required]],
  commentsCoupling: ['',[Validators.required]],
  category:['coupling'],
  percentageCoupling:[],
trainer_id:[this.trainer_id]

 });
 this.preTripForm.valueChanges.subscribe((value)=>{
   let sum = 0;
   if(value.air_electrical_lines){
     sum = 1 + sum;
   }
   if(value.glad_hands){
     sum = 1 + sum;
   }
   if(value.clearence_lights){
     sum = 1 + sum;
   }
   if(value.reflector_tape){
    sum = 1 + sum;
  }
  if(value.chain_strap_attachment_bar){
    sum = 1 + sum;
  }
  if(value.landing_gear){
    sum = 1 + sum;
  }
  if(value.cargo_box){
    sum = 1 + sum;
  }
  if(value.abs_lights){
    sum = 1 + sum;
  }
  if(value.mud_flaps){
    sum = 1 + sum;
  }
  if(value.lights){
    sum = 1 + sum;
  }
  if(value.docking_impact_frame){
    sum = 1 + sum;
  }
  if(value.license_plate){
    sum = 1 + sum;
  }

   console.log('Sum:',sum);
   this.result = Math.round((sum / 11) * 100);
 });
  }
  async ionViewDidEnter() {
    this.getRoleAndID();
    // this.getRecordById();
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
  exit(){
    this.loadingSpinner.next(true);

    // get check-in ID
    this.getCheckInID();
  }
  submitData(){
    //patching value
    this.preTripForm.patchValue({
      percentageCoupling: this.result
    });
    console.log(this.preTripForm.value);
   ;
    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {

          // create DWR
          this.createDWR();

        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
          this.loadingSpinner.next(false);

        }
      },
      (err) => {
        console.log('ERROR::', err);
        this.toastService.presentToast(err.mssage, 'danger');
        this.loadingSpinner.next(false);

      }
    );
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
    console.log('check-in id:', this.active_check_in_id);
    this.trainingService
     .createDWR(this.trainer_id, this.training_record_id,'','','pre-trip','digital-form',this.supervisor_id,this.active_check_in_id)
     .subscribe(
       (res) => {
         console.log('RES:', res);
         if (res.status === 200) {

           // to stop loader
           this.loadingSpinner.next(false);

            // closing modal
          this.isModalOpen = false;

           // tooltip
           this.toastService.presentToast(
            'Digital evaluation completed',
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
           this.loadingSpinner.next(false);

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
