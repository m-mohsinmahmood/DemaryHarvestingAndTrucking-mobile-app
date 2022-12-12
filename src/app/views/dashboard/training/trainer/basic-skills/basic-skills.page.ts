/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-skills',
  templateUrl: './basic-skills.page.html',
  styleUrls: ['./basic-skills.page.scss'],
})
export class BasicSkillsPage implements OnInit {
  value;
  buffer = 1;
  progress = 0;
  selectAray: any[] = [
    'straight-line',
    'alley-docking',
    'offset',
    'parking-blind',
    'parking-sight',
    'coup-uncoup'
  ];
  // indexArray: any[] = [0.1666666666666667, 0.3333333333333334, 0.5000000000000001, 0.6666666666666668, 0.8333333333333335,1];
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  text=0;

  increment = 0;
  increment1 = 0;
  basicSkillForm: FormGroup;
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
 upload = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    // this.value = 'straight-line';
    this.value = '1';

    this.basicSkillForm = this.formBuilder.group({
      formSelect: ['',[Validators.required]],
      trainerName: ['',[Validators.required]],
      traineeName: ['',[Validators.required]],
      clp: [''], //<-
      supervisorName: ['',[Validators.required]],
      truckId: ['',[Validators.required]],
      odometerStartingMiles: ['',[Validators.required]],
      odometerEndingMiles: ['',[Validators.required]],
      classroomSelect: ['',[Validators.required]],
      groupPracticalSelect: ['',[Validators.required]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      uploadDocs1: ['',[Validators.required]],
      uploadDocs2: ['',[Validators.required]],
      uploadDocs3: ['',[Validators.required]],
    });
  };
  // navigate() {
  //   console.log(this.basicSkillForm.value);
  //   this.increment1 = this.increment1 +1;
  //   // console.log(this.increment1)
  //   this.value = this.selectAray[this.increment1];
  //   console.log(this.value);

  //   // passing index to get progress
  //   this.progress = this.indexArray[this.increment];

  //   this.increment = this.increment +1;
  //   console.log(this.increment);
  //   this.text = this.increment;
  // }
  onSelectedFiles(file,name){
    console.log('file:',file);

    if(name === 'upload_1'){
      this.upload_1 = !this.upload_1;
    }
    if(name === 'upload_2'){
      this.upload_2 = !this.upload_2;
    }if(name === 'upload_3'){
      this.upload_3 = !this.upload_3;
    }

  }
  uploadClick(){
     this.upload = !this.upload;
  }
  onSelect(e){
    console.log(e.target.value);
    if(e.target.value === '1'){
      this.value = e.target.value;
    }else {
      this.upload = false;
      this.value = e.target.value;
    }
  }
  submit(){
    console.log(this.basicSkillForm.value);
  }
  continue(){
    // console.log(this.preTrip.value);
    this.router.navigateByUrl('/tabs/home/training/trainer/pre-trip/digital-form');
  }
}
