import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
     // passing the select value for Paper Form to render when page loads
     this.value = '1';

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

}
