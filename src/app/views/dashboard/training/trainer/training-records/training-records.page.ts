import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-records',
  templateUrl: './training-records.page.html',
  styleUrls: ['./training-records.page.scss'],
})
export class TrainingRecordsPage implements OnInit {
formtype;
evaluationType;
recordsFrom: FormGroup;
  constructor(
    private router: Router,
    private fromBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.recordsFrom = this.fromBuilder.group({
      traineeSelect: ['', [Validators.required]],
      evaluationSelect: ['', [Validators.required]],
      evaluationTypeSelect: ['', [Validators.required]],
    });
  }
  onSelect(e){
this.formtype = e.target.value;
}
onSelectEvaluation(e){
  this.evaluationType = e.target.value;
}

navigate(){
  console.log('first',this.evaluationType);
  console.log(this.recordsFrom.value);
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
