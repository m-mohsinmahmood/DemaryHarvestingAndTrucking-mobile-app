import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-close-job',
  templateUrl: './close-job.page.html',
  styleUrls: ['./close-job.page.scss'],
})
export class CloseJobPage implements OnInit {
role: any;
closeJobFormCrew: FormGroup;
closeJobFormCombine: FormGroup;
closeJobFormKart: FormGroup;
closeJobFormTruck: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.closeJobFormCrew = this.formBuilder.group({
      separatorHours: ['',[Validators.required]],
      engineHours: ['',[Validators.required]],
    });
    this.closeJobFormCombine = this.formBuilder.group({
      endingSeparatorHours: ['',[Validators.required]],
      endingEngineHours: ['',[Validators.required]],
    });

    this.closeJobFormKart = this.formBuilder.group({
      engineHours: ['',[Validators.required]],
    });
    this.closeJobFormTruck = this.formBuilder.group({
      endingOdometerMiles: ['',[Validators.required]],
    });
  }
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.closeJobFormCrew.value);
    console.log(this.closeJobFormKart.value);
    console.log(this.closeJobFormTruck.value);
    console.log(this.closeJobFormCombine.value);

  }
}
