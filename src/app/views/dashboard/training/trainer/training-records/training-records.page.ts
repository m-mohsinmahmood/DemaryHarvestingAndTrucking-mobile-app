import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-records',
  templateUrl: './training-records.page.html',
  styleUrls: ['./training-records.page.scss'],
})
export class TrainingRecordsPage implements OnInit {
formtype;
evaluationType;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onSelect(e){
this.formtype = e.target.value;
}
onSelectEvaluation(e){
  this.evaluationType = e.target.value;
}

navigate(){
  console.log('first',this.evaluationType);
  if(this.evaluationType === 'summary'){
    console.log('first');
    this.router.navigateByUrl('/tabs/home/training/trainer/training-records/search-records/view-records',{
      state:{
        evaluationType: this.evaluationType,
      }
    });
  }
else{
  console.log('firsfft');

  this.router.navigateByUrl('/tabs/home/training/trainer/training-records/search-records',{
    state:{
      formType: this.formtype,
      evaluationType: this.evaluationType,
    }
  });

}
}
}
