import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';

@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.page.html',
  styleUrls: ['./job-setup.page.scss'],
})
export class JobSetupPage implements OnInit {
 jobSetupForm: FormGroup;
states: string[];
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {

    this.jobSetupForm = this.formBuilder.group({
       state: ['',[Validators.required]],
       customerName:['',[Validators.required]],
       farm: ['',[Validators.required]],
       crop:['',[Validators.required]],
       initailField: ['',[Validators.required]]
    });

    // pasing states
    this.states = states;
  }
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.jobSetupForm.value);
  }
}
