import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-tasks',
  templateUrl: './training-tasks.page.html',
  styleUrls: ['./training-tasks.page.scss'],
})
export class TrainingTasksPage implements OnInit {
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  route;
  trainingTasksForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
 console.log(this.router.getCurrentNavigation().extras.state.routeName);
 this.route = this.router.getCurrentNavigation().extras.state.routeName;

 this.trainingTasksForm = this.formBuilder.group({
  trainerName: ['',[Validators.required]],
  supervisorName: ['',[Validators.required]],
  city: ['',[Validators.required]],
  state: ['',[Validators.required]],
  training: ['',[Validators.required]],
  topic: ['',[Validators.required]],
  uploadDocs1: ['',[Validators.required]],
  uploadDocs2: ['',[Validators.required]],
  uploadDocs3: ['',[Validators.required]],
  comments: ['',[Validators.required]],
 });
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
console.log(this.trainingTasksForm.value);
  }
}
