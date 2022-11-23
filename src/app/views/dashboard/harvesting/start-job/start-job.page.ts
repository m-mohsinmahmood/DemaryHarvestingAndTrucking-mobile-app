import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-job',
  templateUrl: './start-job.page.html',
  styleUrls: ['./start-job.page.scss'],
})
export class StartJobPage implements OnInit {
role: any;
startJobFormCombine: FormGroup;
startJobFormCrew: FormGroup;
startJobFormKart: FormGroup;
startJobFormTruck: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
   this.initForms();

  }
  goBack(){
    this.location.back();
  }

  initForms(){
    this.startJobFormCrew = this.formBuilder.group({
      machineId: ['',[Validators.required]],
      separatorHours: ['',[Validators.required]],
      engineHours: ['',[Validators.required]],
      confirmField: ['',[Validators.required]],
    });
    this.startJobFormCombine = this.formBuilder.group({
      machineId: ['',[Validators.required]],
      separatorHours: ['',[Validators.required]],
      engineHours: ['',[Validators.required]],
      confirmField: ['',[Validators.required]],
    });
    this.startJobFormKart = this.formBuilder.group({
      machineId: ['',[Validators.required]],
      engineHours: ['',[Validators.required]],
    });
    this.startJobFormTruck = this.formBuilder.group({
      truckId: ['',[Validators.required]],
      crewChief: ['',[Validators.required]],
      truckCompany: ['',[Validators.required]],
      beginingOdometerMiles: ['',[Validators.required]],
    });
  }
  submit(){
          console.log(this.startJobFormCrew.value);
          console.log(this.startJobFormCombine.value);
          console.log(this.startJobFormKart.value);
          console.log(this.startJobFormTruck.value);
  }
}
