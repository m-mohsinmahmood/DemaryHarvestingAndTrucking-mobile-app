import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-training-records',
  templateUrl: './training-records.page.html',
  styleUrls: ['./training-records.page.scss'],
})
export class TrainingRecordsPage implements OnInit {
formType;
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
this.formType = e.target.value;
}
onSelectEvaluation(e){
  this.evaluationType = e.target.value;
}

navigate(){
  console.log('Evaluation type',this.evaluationType);
  console.log('Evaluation Form',this.formType);
  console.log(this.recordsFrom.value);
  if(this.formType === 'summary'){
    this.router.navigateByUrl('/tabs/home/training/trainer/training-records/search-records/view-records',{
      state:{
        formType: this.formType,
      }
    });
  }
else{

  this.router.navigateByUrl('/tabs/home/training/trainer/training-records/search-records',{
    state:{
      formType: this.formType,
      evaluationType: this.evaluationType,
    }
  });

}
}
}
