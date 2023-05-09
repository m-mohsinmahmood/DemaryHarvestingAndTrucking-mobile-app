/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from 'src/app/views/dashboard/training/training.service';

@Component({
  selector: 'app-vehicle-external',
  templateUrl: './vehicle-external.page.html',
  styleUrls: ['./vehicle-external.page.scss'],
})
export class VehicleExternalPage implements OnInit {
  preTripForm: FormGroup;
  buffer = 1;
  progress = 0.5;
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

  ) { }

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

      fuel_tank_sec: [false, [Validators.required]],
      fuel_tank_leaks: [false, [Validators.required]],
      head_rack: [false, [Validators.required]],
      cab_air_bags: [false, [Validators.required]],
      cat_walk: [false, [Validators.required]],
      cat_walk_steps: [false, [Validators.required]],
      air_electrical_lines_truck: [false, [Validators.required]],
      chassis_frame: [false, [Validators.required]],
      wheel_front_fender: [false, [Validators.required]],
      tire_hub_oil_outer: [false, [Validators.required]],
      tire_hub_oil_inner: [false, [Validators.required]],
      tire_rim: [false, [Validators.required]],
      tire_lug_nuts: [false, [Validators.required]],
      tire_valve_stem: [false, [Validators.required]],
      tire_sidewalls: [false, [Validators.required]],
      tires_tread: [false, [Validators.required]],
      duals_evenly_matched: [false, [Validators.required]],
      duals_no_rim_gaps: [false, [Validators.required]],
      duals_not_touching: [false, [Validators.required]],
      duals_clear_rocks: [false, [Validators.required]],
      duals_no_mis_match: [false, [Validators.required]],
      drive_wheel_brake_drum: [false, [Validators.required]],
      drive_wheel_brake_pads: [false, [Validators.required]],
      drive_wheel_slack_adjuster: [false, [Validators.required]],
      drive_wheel_push_rod: [false, [Validators.required]],
      drive_wheel_brake_chamber: [false, [Validators.required]],
      drive_wheel_brake_hoses: [false, [Validators.required]],
      dw_suspension_wheels: [false, [Validators.required]],
      dw_bushings: [false, [Validators.required]],
      dw_leaf_springs: [false, [Validators.required]],
      dw_u_bolts: [false, [Validators.required]],
      dw_shock_absorbers: [false, [Validators.required]],
      dw_airbags: [false, [Validators.required]],
      top_plate_apron: [false, [Validators.required]],
      sliding_plate: [false, [Validators.required]],
      wheel_5: [false, [Validators.required]],
      mounting_block: [false, [Validators.required]],
      sliding_frame: [false, [Validators.required]],
      air_ram_line: [false, [Validators.required]],
      release_liver: [false, [Validators.required]],
      locking_jaws: [false, [Validators.required]],
      locking_pins: [false, [Validators.required]],
      king_pin: [false, [Validators.required]],
      wheel_positioning_5: [false, [Validators.required]],
      drive_shaft: [false, [Validators.required]],
      torison_bars: [false, [Validators.required]],
      mud_flaps: [false, [Validators.required]],
      rear_lights: [false, [Validators.required]],
      commentsVehicle: ['',[Validators.required]],
      category:['vehicle-external'],
      percentageVehicleExternal:[],
      trainer_id:[this.trainer_id]
    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.fuel_tank_sec){
        sum = 1 + sum;
      }
       if (value.fuel_tank_leaks){
        sum = 1 + sum;
      }
      if (value.head_rack){
        sum = 1 + sum;
      }
      if (value.cab_air_bags){
        sum = 1 + sum;
      }
      if (value.cat_walk){
        sum = 1 + sum;
      }
      if (value.cat_walk_steps){
        sum = 1 + sum;
      }
      if (value.air_electrical_lines_truck){
        sum = 1 + sum;
      }
      if (value.chassis_frame){
        sum = 1 + sum;
      }
      if (value.wheel_front_fender){
        sum = 1 + sum;
      }
      if (value.tire_hub_oil_outer){
        sum = 1 + sum;
      }
      if (value.tire_hub_oil_inner){
        sum = 1 + sum;
      }
      if (value.tire_rim){
        sum = 1 + sum;
      }
      if (value.tire_lug_nuts){
        sum = 1 + sum;
      }
      if (value.tire_valve_stem){
        sum = 1 + sum;
      }
      if (value.tire_sidewalls){
        sum = 1 + sum;
      }
      if (value.tires_tread){
        sum = 1 + sum;
      }
      if (value.duals_evenly_matched){
        sum = 1 + sum;
      }
      if (value.duals_no_rim_gaps){
        sum = 1 + sum;
      }
      if (value.duals_not_touching){
        sum = 1 + sum;
      }
      if (value.duals_clear_rocks){
        sum = 1 + sum;
      }
      if (value.duals_no_mis_match){
        sum = 1 + sum;
      }
      if (value.drive_wheel_brake_drum){
        sum = 1 + sum;
      }
      if (value.drive_wheel_brake_pads){
        sum = 1 + sum;
      }
      if (value.drive_wheel_slack_adjuster){
        sum = 1 + sum;
      }
      if (value.drive_wheel_push_rod){
        sum = 1 + sum;
      }
      if (value.drive_wheel_brake_chamber){
        sum = 1 + sum;
      }
      if (value.drive_wheel_brake_hoses){
        sum = 1 + sum;
      }
      if (value.dw_suspension_wheels){
        sum = 1 + sum;
      }
      if (value.dw_bushings){
        sum = 1 + sum;
      }
      if (value.dw_leaf_springs){
        sum = 1 + sum;
      }
      if (value.dw_u_bolts){
        sum = 1 + sum;
      }
      if (value.dw_shock_absorbers){
        sum = 1 + sum;
      }
      if (value.dw_airbags){
        sum = 1 + sum;
      }
      if (value.top_plate_apron){
        sum = 1 + sum;
      }
      if (value.sliding_plate){
        sum = 1 + sum;
      }

      if (value.wheel_5){
        sum = 1 + sum;
      }
      if (value.mounting_block){
        sum = 1 + sum;
      }
      if (value.sliding_frame){
        sum = 1 + sum;
      }
      if (value.air_ram_line){
        sum = 1 + sum;
      }
      if (value.release_liver){
        sum = 1 + sum;
      }
      if (value.locking_jaws){
        sum = 1 + sum;
      }
      if (value.locking_pins){
        sum = 1 + sum;
      }
      if (value.king_pin){
        sum = 1 + sum;
      }
      if (value.wheel_positioning_5){
        sum = 1 + sum;
      }
      if (value.drive_shaft){
        sum = 1 + sum;
      }
      if (value.torison_bars){
        sum = 1 + sum;
      }
      if (value.mud_flaps){
        sum = 1 + sum;
      }
      if (value.rear_lights){
        sum = 1 + sum;
      }

      console.log('Sum:',sum);
      this.result = Math.round((sum / 48) * 100);

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
      fuel_tank_sec: this.preTripFormData.fuel_tank_sec === 'true'? true: false,
      fuel_tank_leaks: this.preTripFormData.fuel_tank_leaks === 'true'? true:false,
      head_rack: this.preTripFormData.head_rack === 'true'? true:false,
      cab_air_bags: this.preTripFormData.cab_air_bags === 'true'? true:false,
      cat_walk: this.preTripFormData.cat_walk === 'true'? true:false,
      cat_walk_steps: this.preTripFormData.cat_walk_steps === 'true'? true:false,
      air_electrical_lines_truck: this.preTripFormData.air_electrical_lines_truck === 'true'? true:false,
      chassis_frame: this.preTripFormData.chassis_frame === 'true'? true:false,
      wheel_front_fender: this.preTripFormData.wheel_front_fender === 'true'? true:false,
      tire_hub_oil_outer: this.preTripFormData.tire_hub_oil_outer === 'true'? true:false,
      tire_hub_oil_inner: this.preTripFormData.tire_hub_oil_inner === 'true'? true:false,
      tire_rim: this.preTripFormData.tire_rim === 'true'? true:false,
      tire_lug_nuts: this.preTripFormData.tire_lug_nuts === 'true'? true:false,
      tire_valve_stem: this.preTripFormData.tire_valve_stem === 'true'? true:false,
      tires_tread: this.preTripFormData.tires_tread === 'true'? true:false,
      duals_evenly_matched: this.preTripFormData.duals_evenly_matched === 'true'? true:false,
      duals_no_rim_gaps: this.preTripFormData.duals_no_rim_gaps === 'true'? true:false,
      duals_not_touching: this.preTripFormData.duals_not_touching === 'true'? true:false,
      duals_clear_rocks: this.preTripFormData.duals_clear_rocks === 'true'? true:false,
      duals_no_mis_match: this.preTripFormData.duals_no_mis_match === 'true'? true:false,
      drive_wheel_brake_drum: this.preTripFormData.drive_wheel_brake_drum === 'true'? true:false,
      drive_wheel_brake_pads: this.preTripFormData.drive_wheel_brake_pads === 'true'? true:false,
      drive_wheel_slack_adjuster: this.preTripFormData.drive_wheel_slack_adjuster === 'true'? true:false,
      drive_wheel_push_rod: this.preTripFormData.drive_wheel_push_rod === 'true'? true:false,
      drive_wheel_brake_chamber: this.preTripFormData.drive_wheel_brake_chamber === 'true'? true:false,
      drive_wheel_brake_hoses: this.preTripFormData.drive_wheel_brake_hoses === 'true'? true:false,
      dw_suspension_wheels: this.preTripFormData.dw_suspension_wheels === 'true'? true:false,
      dw_bushings: this.preTripFormData.dw_bushings === 'true'? true:false,
      dw_leaf_springs: this.preTripFormData.dw_leaf_springs === 'true'? true:false,
      dw_u_bolts: this.preTripFormData.dw_u_bolts === 'true'? true:false,
      dw_shock_absorbers: this.preTripFormData.dw_shock_absorbers === 'true'? true:false,
      dw_airbags: this.preTripFormData.dw_airbags === 'true'? true:false,
      top_plate_apron: this.preTripFormData.top_plate_apron === 'true'? true:false,
      sliding_plate: this.preTripFormData.sliding_plate === 'true'? true:false,
      wheel_5: this.preTripFormData.wheel_5 === 'true'? true:false,
      mounting_block: this.preTripFormData.mounting_block === 'true'? true:false,
      sliding_frame: this.preTripFormData.sliding_frame === 'true'? true:false,
      air_ram_line: this.preTripFormData.air_ram_line === 'true'? true:false,
      release_liver: this.preTripFormData.release_liver === 'true'? true:false,
      locking_jaws: this.preTripFormData.locking_jaws === 'true'? true:false,
      locking_pins: this.preTripFormData.locking_pins === 'true'? true:false,
      king_pin: this.preTripFormData.king_pin === 'true'? true:false,
      wheel_positioning_5: this.preTripFormData.wheel_positioning_5 === 'true'? true:false,
      drive_shaft: this.preTripFormData.drive_shaft === 'true'? true:false,
      torison_bars: this.preTripFormData.torison_bars === 'true'? true:false,
      mud_flaps: this.preTripFormData.mud_flaps === 'true'? true:false,
      rear_lights: this.preTripFormData.rear_lights === 'true'? true:false,
      commentsVehicle: this.preTripFormData.commentsVehicle !== 'null'? this.preTripFormData.commentsVehicle: '',
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
      percentageVehicleExternal: this.result
    });
    console.log(this.preTripForm.value);

    this.trainingService.saveFroms(this.preTripForm.value, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
           // form reset
           this.preTripForm.reset();

          // spinner
          this.loadingSpinner.next(false);

          this.toastService.presentToast(
            'Category 3 details have been submitted',
            'success'
          );

          // navigating
            this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling'],{
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
