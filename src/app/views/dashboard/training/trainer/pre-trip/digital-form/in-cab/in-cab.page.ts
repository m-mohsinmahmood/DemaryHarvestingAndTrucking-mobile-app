/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../../training.service';

@Component({
  selector: 'app-in-cab',
  templateUrl: './in-cab.page.html',
  styleUrls: ['./in-cab.page.scss'],
})
export class InCabPage implements OnInit {
  preTripForm: FormGroup;
  buffer = 1;
  progress = 0.25;
  result: any = 0;
  training_record_id: any;
  isModalOpen = false;

  trainer_id;
  supervisor_id;
  preTripFormData;
 public loadingSpinner = new BehaviorSubject(false);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService,
    private route: ActivatedRoute,

    ) {}

  ngOnInit() {
   // getting id & role
   this.getRoleAndID();

   this.initForm();

    this.route.queryParams.subscribe((params)=>{
      this.training_record_id = params.training_record_id;
      this.supervisor_id = params.supervisor_id;
    });

    this.getRecordById();

  }
  initForm(){
    this.preTripForm = this.formBuilder.group({
      // In Cab

      seat_belt: [false, [Validators.required]],
      loose_floor: [false, [Validators.required]],
      mirror_positioning: [false, [Validators.required]],
      gear_stick_condition: [false, [Validators.required]],
      emergency_items: [false, [Validators.required]],
      safe_start: [false, [Validators.required]],
      dash_lights: [false, [Validators.required]],
      warning_lights: [false, [Validators.required]],
      turn_signals: [false, [Validators.required]],
      way_4_flashers: [false, [Validators.required]],
      high_beam: [false, [Validators.required]],
      abs_lights: [false, [Validators.required]],
      volt_meter: [false, [Validators.required]],
      fuel_level: [false, [Validators.required]],
      oil_pressure: [false, [Validators.required]],
      air_pressure: [false, [Validators.required]],
      coolant_temperature: [false, [Validators.required]],
      diff_lock_engages: [false, [Validators.required]],
      heater_demister: [false, [Validators.required]],
      horn: [false, [Validators.required]],
      wiper_washer_working: [false, [Validators.required]],
      test_service_brake: [false, [Validators.required]],
      test_trailer_park_brake: [false, [Validators.required]],
      test_truck_park_brake: [false, [Validators.required]],
      leak_stage_1: [false, [Validators.required]],
      leak_stage_2: [false, [Validators.required]],
      leak_stage_3: [false, [Validators.required]],
      front_external_lights: [false, [Validators.required]],
      trailer_lights: [false, [Validators.required]],
      rear_external_lights: [false, [Validators.required]],
      commentsCab: ['', [Validators.required]],
      category:['in-cab'],
      percentageInCab:[],
      trainer_id:[this.trainer_id]

    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.seat_belt){
        sum = 1 + sum;
      }
       if (value.loose_floor){
        sum = 1 + sum;
      }
      if (value.mirror_positioning){
        sum = 1 + sum;
      }
      if (value.gear_stick_condition){
        sum = 1 + sum;
      }
      if (value.emergency_items){
        sum = 1 + sum;
      }
      if (value.safe_start){
        sum = 1 + sum;
      }
      if (value.dash_lights){
        sum = 1 + sum;
      }
      if (value.warning_lights){
        sum = 1 + sum;
      }
      if (value.turn_signals){
        sum = 1 + sum;
      }
      if (value.way_4_flashers){
        sum = 1 + sum;
      }
      if (value.high_beam){
        sum = 1 + sum;
      }
      if (value.abs_lights){
        sum = 1 + sum;
      }
      if (value.volt_meter){
        sum = 1 + sum;
      }
      if (value.fuel_level){
        sum = 1 + sum;
      }
      if (value.oil_pressure){
        sum = 1 + sum;
      }
      if (value.air_pressure){
        sum = 1 + sum;
      }
      if (value.coolant_temperature){
        sum = 1 + sum;
      }
      if (value.diff_lock_engages){
        sum = 1 + sum;
      }
      if (value.heater_demister){
        sum = 1 + sum;
      }
      if (value.horn){
        sum = 1 + sum;
      }
      if (value.wiper_washer_working){
        sum = 1 + sum;
      }
      if (value.test_service_brake){
        sum = 1 + sum;
      }
      if (value.test_trailer_park_brake){
        sum = 1 + sum;
      }
      if (value.test_truck_park_brake){
        sum = 1 + sum;
      }
      if (value.leak_stage_1){
        sum = 1 + sum;
      }
      if (value.leak_stage_2){
        sum = 1 + sum;
      }
      if (value.leak_stage_3){
        sum = 1 + sum;
      }
      if (value.front_external_lights){
        sum = 1 + sum;
      }
      if (value.trailer_lights){
        sum = 1 + sum;
      }
      if (value.rear_external_lights){
        sum = 1 + sum;
      }


      this.result = Math.round((sum / 30) * 100);
    });
  }
  async ionViewDidEnter() {
    this.getRoleAndID();
    this.getRecordById();
  }
  getRoleAndID(){
    this.trainer_id = localStorage.getItem('employeeId');
  }
  getRecordById(){
    this.trainingService.getRecordById(this.training_record_id)
    .subscribe((res)=>{

        this.preTripFormData= res.summary[0];

        this.patchForm();

    },(err)=>{
      this.toastService.presentToast(err.mssage, 'danger');
    });
  }
  patchForm(){

    this.preTripForm.patchValue({
      seat_belt: this.preTripFormData.seat_belt=== 'true'? true: false,
      loose_floor: this.preTripFormData.loose_floor=== 'true'? true: false,
      mirror_positioning: this.preTripFormData.mirror_positioning=== 'true'? true: false,
      gear_stick_condition: this.preTripFormData.gear_stick_condition=== 'true'? true: false,
      emergency_items: this.preTripFormData.emergency_items=== 'true'? true: false,
      safe_start: this.preTripFormData.safe_start=== 'true'? true: false,
      dash_lights: this.preTripFormData.dash_lights=== 'true'? true: false,
      warning_lights: this.preTripFormData.warning_lights=== 'true'? true: false,
      turn_signals: this.preTripFormData.turn_signals=== 'true'? true: false,
      way_4_flashers: this.preTripFormData.way_4_flashers=== 'true'? true: false,
      high_beam: this.preTripFormData.high_beam=== 'true'? true: false,
      abs_lights: this.preTripFormData.abs_lights=== 'true'? true: false,
      volt_meter: this.preTripFormData.volt_meter=== 'true'? true: false,
      fuel_level: this.preTripFormData.fuel_level=== 'true'? true: false,
      oil_pressure: this.preTripFormData.oil_pressure=== 'true'? true: false,
      air_pressure: this.preTripFormData.air_pressure=== 'true'? true: false,
      coolant_temperature: this.preTripFormData.coolant_temperature=== 'true'? true: false,
      diff_lock_engages: this.preTripFormData.diff_lock_engages=== 'true'? true: false,
      heater_demister: this.preTripFormData.heater_demister=== 'true'? true: false,
      horn: this.preTripFormData.horn=== 'true'? true: false,
      wiper_washer_working: this.preTripFormData.wiper_washer_working=== 'true'? true: false,
      test_service_brake: this.preTripFormData.test_service_brake=== 'true'? true: false,
      test_trailer_park_brake: this.preTripFormData.test_trailer_park_brake=== 'true'? true: false,
      test_truck_park_brake: this.preTripFormData.test_truck_park_brake=== 'true'? true: false,
      leak_stage_1: this.preTripFormData.leak_stage_1=== 'true'? true: false,
      leak_stage_2: this.preTripFormData.leak_stage_2=== 'true'? true: false,
      leak_stage_3: this.preTripFormData.leak_stage_3=== 'true'? true: false,
      front_external_lights: this.preTripFormData.front_external_lights=== 'true'? true: false,
      trailer_lights: this.preTripFormData.trailer_lights=== 'true'? true: false,
      rear_external_lights: this.preTripFormData.rear_external_lights=== 'true'? true: false,
      commentsCab: this.preTripFormData.commentsCab !== 'null'?this.preTripFormData.commentsCab: '',
    });
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
        percentageInCab: this.result
      });

    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          // form reset
          this.preTripForm.reset();

          // spinner
          this.loadingSpinner.next(false);

          // tooltip
          this.toastService.presentToast(
            'Category 2 details have been submitted',
            'success'
          );

          // navigating
            this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external'],{
              queryParams:{
                training_record_id: this.training_record_id,
                supervisor_id: this.supervisor_id
              }
            });

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
