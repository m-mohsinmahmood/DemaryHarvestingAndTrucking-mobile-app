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
startJobForm: FormGroup;
startJobFormKart: FormGroup;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.startJobForm = this.formBuilder.group({
      machineId: ['',[Validators.required]],
      separatorHours: ['',[Validators.required]],
      engineHours: ['',[Validators.required]],
      confirmField: ['',[Validators.required]],
    });
    this.startJobFormKart = this.formBuilder.group({
      machineId: ['',[Validators.required]],
      engineHours: ['',[Validators.required]],
    });

  }
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.startJobForm.value);
    console.log(this.startJobFormKart.value);
  }
}
