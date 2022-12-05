import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { states } from 'src/JSON/state';

@Component({
  selector: 'app-road-skills',
  templateUrl: './road-skills.page.html',
  styleUrls: ['./road-skills.page.scss'],
})
export class RoadSkillsPage implements OnInit {

  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
 upload = false;
 value: any;
 roadTestForm: FormGroup;
 states: string[];


  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
     // passing the select value for Paper Form to render when page loads
     this.value = '1';

    // console.log('file:',file);
    this.roadTestForm = this.formBuilder.group({
      formSelect: ['',[Validators.required]],
      trainerName: ['',[Validators.required]],
      traineeName: ['',[Validators.required]],
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

    // pasing states
    this.states = states;

  }
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
    if(e.target.value === '1'){
      this.value = e.target.value;
    }else{
      this.upload = false;
      this.value = e.target.value;
    }
  }
  continue(){
    console.log(this.roadTestForm.value);
    this.router.navigateByUrl('/tabs/home/training/trainer/road-skills/evaluation-form');
  }

}
