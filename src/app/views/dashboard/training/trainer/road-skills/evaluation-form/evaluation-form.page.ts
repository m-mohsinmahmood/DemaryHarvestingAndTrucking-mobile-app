import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../../training.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.page.html',
  styleUrls: ['./evaluation-form.page.scss'],
})
export class EvaluationFormPage implements OnInit {
  evaluationFrom: FormGroup;
sum= 0;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
    ) { }

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
      category:['road-testing']

    });

    console.log('SUM:', this.evaluationFrom.get('eLogPracticalInput').value);
  }
endEvaluation(){
  console.log(this.evaluationFrom.value);
  // this.trainingService.saveFroms(this.evaluationFrom.value, 'road-skills').subscribe(
  //   (res) => {
  //     console.log('RES:', res);
  //     if (res.status === 200) {
  //       this.toastService.presentToast(
  //         'Evaluation ended',
  //         'success'
  //       );


  //       // navigating
  //       this.router.navigateByUrl('/tabs/home/training/trainer');

  //     } else {
  //       console.log('Something happened :)');
  //       this.toastService.presentToast(res.mssage, 'danger');
  //     }
  //   },
  //   (err) => {
  //     console.log('ERROR::', err);
  //     this.toastService.presentToast(err.mssage, 'danger');
  //   }
  // );
}
getSum(){
  console.log('SUM:',   this.evaluationFrom.get('leftTurnsInput').value +
  this.evaluationFrom.get('rightTurnsInput').value +
  this.evaluationFrom.get('intersectionStopInput').value +
  this.evaluationFrom.get('intersectionThruInput').value +
  this.evaluationFrom.get('interstateInput').value +
  this.evaluationFrom.get('urbanBusinessInput').value +
  this.evaluationFrom.get('lanceChangesInput').value +
  this.evaluationFrom.get('curveInput').value +
  this.evaluationFrom.get('roadsideInput').value +
  this.evaluationFrom.get('rrCrossingInput').value +
  this.evaluationFrom.get('signsInput').value +
  this.evaluationFrom.get('generalDrivingInput').value +
  this.evaluationFrom.get('eLogPracticalInput').value );


 this.sum =  this.evaluationFrom.get('leftTurnsInput').value +
  this.evaluationFrom.get('rightTurnsInput').value +
  this.evaluationFrom.get('intersectionStopInput').value +
  this.evaluationFrom.get('intersectionThruInput').value +
  this.evaluationFrom.get('interstateInput').value +
  this.evaluationFrom.get('urbanBusinessInput').value +
  this.evaluationFrom.get('lanceChangesInput').value +
  this.evaluationFrom.get('curveInput').value +
  this.evaluationFrom.get('roadsideInput').value +
  this.evaluationFrom.get('rrCrossingInput').value +
  this.evaluationFrom.get('signsInput').value +
  this.evaluationFrom.get('generalDrivingInput').value +
  this.evaluationFrom.get('eLogPracticalInput').value;
}
};
