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
closeJobForm: FormGroup;
closeJobFormKart: FormGroup;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.closeJobForm = this.formBuilder.group({
      separatorHours: ['',[Validators.required]],
      engineHours: ['',[Validators.required]],
      acresGPSCompleted: ['',[Validators.required]],
    });

    this.closeJobFormKart = this.formBuilder.group({
      engineHours: ['',[Validators.required]],
    });
  }
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.closeJobForm.value);
    console.log(this.closeJobFormKart.value);

  }
}
