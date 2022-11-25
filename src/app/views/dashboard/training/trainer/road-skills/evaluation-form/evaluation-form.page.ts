import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.page.html',
  styleUrls: ['./evaluation-form.page.scss'],
})
export class EvaluationFormPage implements OnInit {
  evaluationFrom: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.evaluationFrom = this.formBuilder.group({
      leftTurns: ['',[Validators.required]],
      leftTurnsInput: ['',[Validators.required]],
      rightTurns: ['',[Validators.required]],
      rightTurnsInput: ['',[Validators.required]],
      intersectionStop: ['',[Validators.required]],
      intersectionStopInput: ['',[Validators.required]],
      intersectionThru: ['',[Validators.required]],
      intersectionThruInput: ['',[Validators.required]],
      interstate: ['',[Validators.required]],
      interstateInput: ['',[Validators.required]],
      urbanBusiness: ['',[Validators.required]],
      urbanBusinessInput: ['',[Validators.required]],
      lanceChanges: ['',[Validators.required]],
      lanceChangesInput: ['',[Validators.required]],
      curve: ['',[Validators.required]],
      curveInput: ['',[Validators.required]],
      roadside: ['',[Validators.required]],
      roadsideInput: ['',[Validators.required]],
      rrCrossing: ['',[Validators.required]],
      rrCrossingInput: ['',[Validators.required]],
      signs: ['',[Validators.required]],
      signsInput: ['',[Validators.required]],
      generalDriving: ['',[Validators.required]],
      generalDrivingInput: ['',[Validators.required]],
      eLogPractical: ['',[Validators.required]],
      eLogPracticalInput: ['',[Validators.required]],

    });
  }
endEvaluation(){
  console.log(this.evaluationFrom.value);
}
}
