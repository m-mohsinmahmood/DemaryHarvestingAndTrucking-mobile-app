import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pre-trip',
  templateUrl: './pre-trip.page.html',
  styleUrls: ['./pre-trip.page.scss'],
})
export class PreTripPage implements OnInit {
  preTripForm: FormGroup;

  value: any;
  buffer = 1;
  progress = 0;
  selectAray: any[] = [
    'engine/compartment',
    'incab',
    'vehicle/external',
    'coupling',
    'suspension/brakes',
  ];
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  text=0;
  increment = 0;
  increment1 = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // passing the select value for Engine/Compartment to render when page loads
    this.value = 'engine/compartment';

    this.initForms();
  }

  initForms(){
    this.preTripForm = this.formBuilder.group({
      preSelect: ['',[Validators.required]],
      //Engine/Compartment
      oilLevel: ['false',[Validators.required]],
      coolantLevelEngine: ['false',[Validators.required]],
      powerSteelingLevel: ['false',[Validators.required]],
      h20: ['false',[Validators.required]],
      alternatorBelt: ['false',[Validators.required]],
      airCompresseorEngine: ['false',[Validators.required]],
      leaksHoses: ['false',[Validators.required]],
      fanShroud: ['false',[Validators.required]],
      radiator: ['false',[Validators.required]],
      wiring: ['false',[Validators.required]],
      steeringBox: ['false',[Validators.required]],
      steeringLinkage: ['false',[Validators.required]],
      hosesSteering: ['false',[Validators.required]],
      turbo: ['false',[Validators.required]],
      windowFluid: ['false',[Validators.required]],
      mirror: ['false',[Validators.required]],
      clutchCondition: ['false',[Validators.required]],
      commentsEngine: ['',[Validators.required]],

      // In Cab
      safetyBelt: ['false',[Validators.required]],
      coolantLevelCab: ['false',[Validators.required]],
      emergencyEquipment: ['false',[Validators.required]],
      safeStart: ['false',[Validators.required]],
      temperatureGauge: ['false',[Validators.required]],
      oilPressure: ['false',[Validators.required]],
      voltMeter: ['false',[Validators.required]],
      airGaugeBuCo: ['false',[Validators.required]],
      indicators: ['false',[Validators.required]],
      horns: ['false',[Validators.required]],
      defroster: ['false',[Validators.required]],
      windshield: ['false',[Validators.required]],
      wipersWash: ['false',[Validators.required]],
      parkBrake: ['false',[Validators.required]],
      svcBrake: ['false',[Validators.required]],
      leakTest: ['false',[Validators.required]],
      abcLights: ['false',[Validators.required]],
      lightFunction: ['false',[Validators.required]],
      commentsCab: ['',[Validators.required]],

      // Vehicle/External
      lightFunctionVehicle: ['false',[Validators.required]],
      lensReflector: ['false',[Validators.required]],
      door: ['false',[Validators.required]],
      fuelTank: ['false',[Validators.required]],
      leaks: ['false',[Validators.required]],
      steps: ['false',[Validators.required]],
      frame: ['false',[Validators.required]],
      driveShaft: ['false',[Validators.required]],
      tires: ['false',[Validators.required]],
      rims: ['false',[Validators.required]],
      lugNuts: ['false',[Validators.required]],
      axelHubSeal: ['false',[Validators.required]],
      bidSpacers: ['false',[Validators.required]],
      batteryBox: ['false',[Validators.required]],
      exhaust: ['false',[Validators.required]],
      headerBvd: ['false',[Validators.required]],
      landingGear: ['false',[Validators.required]],
      commentsVehicle: ['',[Validators.required]],

      //Coupling
      airConditioners: ['false',[Validators.required]],
      electricConnectors: ['false',[Validators.required]],
      mountingBolts: ['false',[Validators.required]],
      platformBase: ['false',[Validators.required]],
      lockingJaws: ['false',[Validators.required]],
      grease: ['false',[Validators.required]],
      releaseArm: ['false',[Validators.required]],
      skidPlate: ['false',[Validators.required]],
      slidingPins: ['false',[Validators.required]],
      kingPin: ['false',[Validators.required]],
      apron: ['false',[Validators.required]],
      gap: ['false',[Validators.required]],
      airLine: ['false',[Validators.required]],
      location: ['false',[Validators.required]],
      safetyDevices: ['false',[Validators.required]],
      print: ['false',[Validators.required]],
      drawBar: ['false',[Validators.required]],
      commentsCoupling: ['',[Validators.required]],

      //Suspension/Brakes
      springs: ['false',[Validators.required]],
      airBags: ['false',[Validators.required]],
      shocks: ['false',[Validators.required]],
      vBolts: ['false',[Validators.required]],
      mounts: ['false',[Validators.required]],
      bushings: ['false',[Validators.required]],
      leafSprings: ['false',[Validators.required]],
      slackAdjusters: ['false',[Validators.required]],
      crackChammber: ['false',[Validators.required]],
      pushRod: ['false',[Validators.required]],
      drums: ['false',[Validators.required]],
      linings: ['false',[Validators.required]],
      rotor: ['false',[Validators.required]],
      discPads: ['false',[Validators.required]],
      brakeHoses: ['false',[Validators.required]],
      cams: ['false',[Validators.required]],
      torqueArm: ['false',[Validators.required]],
      wheelSeals: ['false',[Validators.required]],
      commentsSuspension: ['',[Validators.required]],
    });
  }
  // onSelect(e) {
  //   this.value = e.target.value;
  //   // getting the index
  //   const index = this.selectAray.indexOf(e.target.value);

  //   // passing index to get progress
  //   this.progress = this.indexArray[index];
  // }
  submit(){
    console.log(this.preTripForm.value);

    this.increment1 = this.increment1 +1;
    this.value = this.selectAray[this.increment1];

    // passing index to get progress
    this.progress = this.indexArray[this.increment];

    this.increment = this.increment +1;
    console.log(this.increment);
    this.text = this.increment;
  }
}
