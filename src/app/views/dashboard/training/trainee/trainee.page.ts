import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.page.html',
  styleUrls: ['./trainee.page.scss'],
})
export class TraineePage implements OnInit {
  // cardClicked_3 = false;
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  traineeForm: FormGroup;
  states: string[];


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.traineeForm = this.formBuilder.group({
      traineeName: ['', [Validators.required]],
      trainerName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      training: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      details: ['', [Validators.required]],
      uploadDocs1: ['', [Validators.required]],
      uploadDocs2: ['', [Validators.required]],
      uploadDocs3: ['', [Validators.required]],
    });
    console.log(this.traineeForm.value);

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
submit(){
  console.log(this.traineeForm.value);

}

}
