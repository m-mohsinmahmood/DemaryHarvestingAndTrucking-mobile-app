import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-tasks',
  templateUrl: './training-tasks.page.html',
  styleUrls: ['./training-tasks.page.scss'],
})
export class TrainingTasksPage implements OnInit {
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  constructor() { }

  ngOnInit() {
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
}
