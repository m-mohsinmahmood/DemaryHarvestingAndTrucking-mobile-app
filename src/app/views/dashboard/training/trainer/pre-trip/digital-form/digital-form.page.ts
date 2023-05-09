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
 preTripFormData;
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

    this.getRecordById();

  }
  initForm(){
    this.preTripForm = this.formBuilder.group({
      //Engine/Compartment
      leans: [false,[Validators.required]],
      leaks: [false,[Validators.required]],
      lights: [false,[Validators.required]],
      hazards: [false,[Validators.required]],
      check_neutral: [false,[Validators.required]],
      parking_brakes: [false,[Validators.required]],
      power_steering_level: [false,[Validators.required]],
      keys_removed: [false,[Validators.required]],
      outside_windshield: [false,[Validators.required]],
      wiper_condition: [false,[Validators.required]],
      engine_oil: [false,[Validators.required]],
      power_steering_evel: [false,[Validators.required]],
      wiring_loom: [false,[Validators.required]],
      frame_condition: [false,[Validators.required]],
      hub_oil_level: [false,[Validators.required]],
      hub_seal_outer: [false,[Validators.required]],
      hub_seal_inner: [false,[Validators.required]],
      rim: [false,[Validators.required]],
      lug_nuts: [false,[Validators.required]],
      valve_stems: [false,[Validators.required]],
      side_walls: [false,[Validators.required]],
      tread: [false,[Validators.required]],
      brake_drum: [false,[Validators.required]],
      brake_pads: [false,[Validators.required]],
      slack_adjuster: [false,[Validators.required]],
      push_rod: [false,[Validators.required]],
      brake_chamber: [false,[Validators.required]],
      brake_hoses: [false,[Validators.required]],
      air_compressor: [false,[Validators.required]],
      steering_shaft: [false,[Validators.required]],
      universal_joints: [false,[Validators.required]],
      steering_blocks: [false,[Validators.required]],
      steering_linkages: [false,[Validators.required]],
      steering_hoses: [false,[Validators.required]],
      steering_pump: [false,[Validators.required]],
      suspension_mounts: [false,[Validators.required]],
      bushings: [false,[Validators.required]],
      leaf_springs: [false,[Validators.required]],
      u_bolts: [false,[Validators.required]],
      shock_absorbers: [false,[Validators.required]],
      clutch_condition: [false,[Validators.required]],
      inter_cooler_ducts: [false,[Validators.required]],
      radiator: [false,[Validators.required]],
      radiator_fan: [false,[Validators.required]],
      radiator_shroud: [false,[Validators.required]],
      radiator_hoses: [false,[Validators.required]],
      ac_pump: [false,[Validators.required]],
      alternator: [false,[Validators.required]],
      water_pump: [false,[Validators.required]],
      coolant_reservoir: [false,[Validators.required]],
      coolant_level: [false,[Validators.required]],
      windshield_washer_level: [false,[Validators.required]],
      turbo: [false,[Validators.required]],
      exhaust_sysytem: [false,[Validators.required]],
      step: [false,[Validators.required]],
      battery_box: [false,[Validators.required]],
      mirrors: [false,[Validators.required]],
      hand_rail: [false,[Validators.required]],
      door: [false,[Validators.required]],
      hinges: [false,[Validators.required]],
      commentsEngine: ['',[Validators.required]],
      category:['engine-compartment'],
      percentageEngineCompartment:[],
      trainer_id:[this.trainer_id]
    });
    this.preTripForm.valueChanges.subscribe((value)=>{
      let sum = 0;
      if(value.leans){
        sum = 1 + sum;
      }
       if (value.leaks){
        sum = 1 + sum;
      }
      if (value.lights){
        sum = 1 + sum;
      }
      if (value.hazards){
        sum = 1 + sum;
      }
      if (value.check_neutral){
        sum = 1 + sum;
      }
      if (value.parking_brakes){
        sum = 1 + sum;
      }
      if (value.power_steering_level){
        sum = 1 + sum;
      }
      if (value.keys_removed){
        sum = 1 + sum;
      }
      if (value.outside_windshield){
        sum = 1 + sum;
      }
      if (value.wiper_condition){
        sum = 1 + sum;
      }
      if (value.engine_oil){
        sum = 1 + sum;
      }
      if (value.power_steering_evel){
        sum = 1 + sum;
      }
      if (value.wiring_loom){
        sum = 1 + sum;
      }
      if (value.frame_condition){
        sum = 1 + sum;
      }
      if (value.hub_oil_level){
        sum = 1 + sum;
      }
      if (value.hub_seal_outer){
        sum = 1 + sum;
      }
      if (value.rim){
        sum = 1 + sum;
      }
      if (value.lug_nuts){
        sum = 1 + sum;
      }
      if (value.valve_stems){
        sum = 1 + sum;
      }
      if (value.side_walls){
        sum = 1 + sum;
      }
      if (value.tread){
        sum = 1 + sum;
      }
      if (value.brake_drum){
        sum = 1 + sum;
      }
      if (value.brake_pads){
        sum = 1 + sum;
      }
      if (value.slack_adjuster){
        sum = 1 + sum;
      }
      if (value.push_rod){
        sum = 1 + sum;
      }
      if (value.brake_chamber){
        sum = 1 + sum;
      }
      if (value.brake_hoses){
        sum = 1 + sum;
      }
      if (value.air_compressor){
        sum = 1 + sum;
      }
      if (value.steering_shaft){
        sum = 1 + sum;
      }
      if (value.universal_joints){
        sum = 1 + sum;
      }
      if (value.steering_blocks){
        sum = 1 + sum;
      }
      if (value.steering_linkages){
        sum = 1 + sum;
      }
      if (value.steering_hoses){
        sum = 1 + sum;
      }
      if (value.steering_pump){
        sum = 1 + sum;
      }
      if (value.suspension_mounts){
        sum = 1 + sum;
      }
      if (value.bushings){
        sum = 1 + sum;
      }
      if (value.leaf_springs){
        sum = 1 + sum;
      }
      if (value.u_bolts){
        sum = 1 + sum;
      }
      if (value.shock_absorbers){
        sum = 1 + sum;
      }
      if (value.clutch_condition){
        sum = 1 + sum;
      }
      if (value.inter_cooler_ducts){
        sum = 1 + sum;
      }
      if (value.radiator){
        sum = 1 + sum;
      }
      if (value.radiator_fan){
        sum = 1 + sum;
      }
      if (value.radiator_shroud){
        sum = 1 + sum;
      }
      if (value.radiator_hoses){
        sum = 1 + sum;
      }
      if (value.ac_pump){
        sum = 1 + sum;
      }
      if (value.alternator){
        sum = 1 + sum;
      }
      if (value.water_pump){
        sum = 1 + sum;
      }
      if (value.coolant_reservoir){
        sum = 1 + sum;
      }
      if (value.coolant_level){
        sum = 1 + sum;
      }
      if (value.windshield_washer_level){
        sum = 1 + sum;
      }
      if (value.turbo){
        sum = 1 + sum;
      }
      if (value.exhaust_sysytem){
        sum = 1 + sum;
      }
      if (value.step){
        sum = 1 + sum;
      }
      if (value.battery_box){
        sum = 1 + sum;
      }
      if (value.mirrors){
        sum = 1 + sum;
      }
      if (value.hand_rail){
        sum = 1 + sum;
      }
      if (value.mirrors){
        sum = 1 + sum;
      }
      if (value.door){
        sum = 1 + sum;
      }
      if (value.hinges){
        sum = 1 + sum;
      }
       this.result = Math.round((sum / 60) * 100);
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
      leans: this.preTripFormData.leans=== 'true'? true: false,
      leaks: this.preTripFormData.leaks=== 'true'? true: false,
      lights: this.preTripFormData.lights=== 'true'? true: false,
      hazards: this.preTripFormData.hazards=== 'true'? true: false,
      check_neutral: this.preTripFormData.check_neutral=== 'true'? true: false,
      parking_brakes: this.preTripFormData.parking_brakes=== 'true'? true: false,
      power_steering_level: this.preTripFormData.power_steering_level=== 'true'? true: false,
      keys_removed: this.preTripFormData.keys_removed=== 'true'? true: false,
      outside_windshield: this.preTripFormData.outside_windshield=== 'true'? true: false,
      wiper_condition: this.preTripFormData.wiper_condition=== 'true'? true: false,
      engine_oil: this.preTripFormData.engine_oil=== 'true'? true: false,
      power_steering_evel: this.preTripFormData.power_steering_evel=== 'true'? true: false,
      wiring_loom: this.preTripFormData.wiring_loom=== 'true'? true: false,
      hub_oil_level: this.preTripFormData.hub_oil_level=== 'true'? true: false,
      hub_seal_outer: this.preTripFormData.hub_seal_outer=== 'true'? true: false,
      hub_seal_inner: this.preTripFormData.hub_seal_inner=== 'true'? true: false,
      rim: this.preTripFormData.rim=== 'true'? true: false,
      lug_nuts: this.preTripFormData.lug_nuts=== 'true'? true: false,
      valve_stems: this.preTripFormData.valve_stems=== 'true'? true: false,
      side_walls: this.preTripFormData.side_walls=== 'true'? true: false,
      tread: this.preTripFormData.tread=== 'true'? true: false,
      brake_drum: this.preTripFormData.brake_drum=== 'true'? true: false,
      brake_pads: this.preTripFormData.brake_pads=== 'true'? true: false,
      slack_adjuster: this.preTripFormData.slack_adjuster=== 'true'? true: false,
      push_rod: this.preTripFormData.push_rod=== 'true'? true: false,
      brake_hoses: this.preTripFormData.brake_hoses=== 'true'? true: false,
      air_compressor: this.preTripFormData.air_compressor=== 'true'? true: false,
      steering_shaft: this.preTripFormData.steering_shaft=== 'true'? true: false,
      universal_joints: this.preTripFormData.universal_joints=== 'true'? true: false,
      steering_blocks: this.preTripFormData.steering_blocks=== 'true'? true: false,
      steering_linkages: this.preTripFormData.steering_linkages=== 'true'? true: false,
      steering_hoses: this.preTripFormData.steering_hoses=== 'true'? true: false,
      steering_pump: this.preTripFormData.steering_pump=== 'true'? true: false,
      suspension_mounts: this.preTripFormData.suspension_mounts=== 'true'? true: false,
      bushings: this.preTripFormData.bushings=== 'true'? true: false,
      leaf_springs: this.preTripFormData.leaf_springs=== 'true'? true: false,
      u_bolts: this.preTripFormData.u_bolts=== 'true'? true: false,
      shock_absorbers: this.preTripFormData.shock_absorbers=== 'true'? true: false,
      clutch_condition: this.preTripFormData.clutch_condition=== 'true'? true: false,
      inter_cooler_ducts: this.preTripFormData.inter_cooler_ducts=== 'true'? true: false,
      radiator: this.preTripFormData.radiator=== 'true'? true: false,
      radiator_fan: this.preTripFormData.radiator_fan=== 'true'? true: false,
      radiator_shroud: this.preTripFormData.radiator_shroud=== 'true'? true: false,
      radiator_hoses: this.preTripFormData.radiator_hoses=== 'true'? true: false,
      ac_pump: this.preTripFormData.ac_pump=== 'true'? true: false,
      alternator: this.preTripFormData.alternator=== 'true'? true: false,
      water_pump: this.preTripFormData.water_pump=== 'true'? true: false,
      coolant_reservoir: this.preTripFormData.coolant_reservoir=== 'true'? true: false,
      coolant_level: this.preTripFormData.coolant_level=== 'true'? true: false,
      windshield_washer_level: this.preTripFormData.windshield_washer_level=== 'true'? true: false,
      turbo: this.preTripFormData.turbo=== 'true'? true: false,
      exhaust_sysytem: this.preTripFormData.exhaust_sysytem=== 'true'? true: false,
      step: this.preTripFormData.step=== 'true'? true: false,
      battery_box: this.preTripFormData.battery_box=== 'true'? true: false,
      mirrors: this.preTripFormData.mirrors=== 'true'? true: false,
      hand_rail: this.preTripFormData.hand_rail=== 'true'? true: false,
      door: this.preTripFormData.door=== 'true'? true: false,
      hinges: this.preTripFormData.hinges=== 'true'? true: false,
      commentsEngine: this.preTripFormData.commentsEngine !== 'null'?this.preTripFormData.commentsEngine: '',
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
      percentageEngineCompartment: this.result
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

          // tooltip
          this.toastService.presentToast(
            'Category 1 details have been submitted',
            'success'
          );

          // navigating
              this.router.navigate([ '/tabs/home/training/trainer/pre-trip/digital-form/in-cab'],{
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
