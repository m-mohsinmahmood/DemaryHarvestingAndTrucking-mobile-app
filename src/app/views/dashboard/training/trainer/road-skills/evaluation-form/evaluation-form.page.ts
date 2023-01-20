/* eslint-disable max-len */
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
totalSatisfactory = 0;
totalUnSatisfactory = 0;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private toastService: ToastService
    ) { }

  ngOnInit() {
    this.evaluationFrom = this.formBuilder.group({
      leftTurns: ['',[Validators.required]],
      leftTurnsInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      rightTurns: ['',[Validators.required]],
      rightTurnsInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      intersectionStop: ['',[Validators.required]],
      intersectionStopInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      intersectionThru: ['',[Validators.required]],
      intersectionThruInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      interstate: ['',[Validators.required]],
      interstateInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      urbanBusiness: ['',[Validators.required]],
      urbanBusinessInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      lanceChanges: ['',[Validators.required]],
      lanceChangesInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      curve: ['',[Validators.required]],
      curveInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      roadside: ['',[Validators.required]],
      roadsideInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      rrCrossing: ['',[Validators.required]],
      rrCrossingInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      signs: ['',[Validators.required]],
      signsInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      generalDriving: ['',[Validators.required]],
      generalDrivingInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      eLogPractical: ['',[Validators.required]],
      eLogPracticalInput: ['',[Validators.required,Validators.pattern('^([1-5])$')]],
      category:['road-testing']

    });
  }
endEvaluation(){
  console.log(this.evaluationFrom.value === 'true');
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
  console.log('-----',typeof(this.evaluationFrom.get('leftTurns').value));
  console.log('--',typeof(this.evaluationFrom.get('leftTurns').value),this.evaluationFrom.get('leftTurns').value);
  console.log('--',typeof(this.evaluationFrom.get('rightTurns').value),this.evaluationFrom.get('rightTurns').value);

  if (this.evaluationFrom.get('leftTurns').value === 'true'){
    console.log('left turn true');
    this.totalSatisfactory = +this.evaluationFrom.get('leftTurnsInput').value + this.totalSatisfactory;
  }
  else{
    console.log('left turn false');
    this.totalUnSatisfactory = +this.evaluationFrom.get('leftTurnsInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('rightTurns').value === 'true'){
    console.log('right turn true');
    this.totalSatisfactory = +this.evaluationFrom.get('rightTurnsInput').value + this.totalSatisfactory;
  }
  else {
    console.log('right turn false');
    this.totalUnSatisfactory = +this.evaluationFrom.get('rightTurnsInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('intersectionStop').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('intersectionStopInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('intersectionStopInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('intersectionThru').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('intersectionThruInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('intersectionThruInput').value + this.totalUnSatisfactory;
  }

  if (this.evaluationFrom.get('interstate').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('interstateInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('interstateInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('urbanBusiness').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('urbanBusinessInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('urbanBusinessInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('lanceChanges').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('lanceChangesInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('lanceChangesInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('curve').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('curveInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('curveInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('roadside').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('roadsideInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('roadsideInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('rrCrossing').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('rrCrossingInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('rrCrossingInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('signs').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('signsInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('signsInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('generalDriving').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('generalDrivingInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory = +this.evaluationFrom.get('generalDrivingInput').value + this.totalUnSatisfactory;
  }
  if (this.evaluationFrom.get('eLogPractical').value === 'true'){
    this.totalSatisfactory = +this.evaluationFrom.get('eLogPracticalInput').value + this.totalSatisfactory;
  }
  else {
    this.totalUnSatisfactory =  +this.evaluationFrom.get('eLogPracticalInput').value + this.totalUnSatisfactory;
  }
console.log('Sat:',this.totalSatisfactory);
console.log('Un-Sat',this.totalUnSatisfactory);
  // this.evaluationFrom.reset();



//  this.sum =  +this.evaluationFrom.get('leftTurnsInput').value +
//   +this.evaluationFrom.get('rightTurnsInput').value +
//   +this.evaluationFrom.get('intersectionStopInput').value +
//   +this.evaluationFrom.get('intersectionThruInput').value +
//   +this.evaluationFrom.get('interstateInput').value +
//   +this.evaluationFrom.get('urbanBusinessInput').value +
//   +this.evaluationFrom.get('lanceChangesInput').value +
//   +this.evaluationFrom.get('curveInput').value +
//   +this.evaluationFrom.get('roadsideInput').value +
//   +this.evaluationFrom.get('rrCrossingInput').value +
//   +this.evaluationFrom.get('signsInput').value +
//   +this.evaluationFrom.get('generalDrivingInput').value +
//   +this.evaluationFrom.get('eLogPracticalInput').value;

//   this.totalUnSat = 65- this.sum;
}
};
