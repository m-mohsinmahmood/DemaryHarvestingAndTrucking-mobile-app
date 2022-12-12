import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-field',
  templateUrl: './change-field.page.html',
  styleUrls: ['./change-field.page.scss'],
})
export class ChangeFieldPage implements OnInit {
role: any;
changeFieldFormChief: FormGroup;
changeFieldFormKart: FormGroup;
changeFieldFormCombine: FormGroup;


constructor(
  private formBuilder: FormBuilder,
  private location: Location,

) { }

ngOnInit() {
  this.role = localStorage.getItem('role');
  this.changeFieldFormChief = this.formBuilder.group({
    fieldName: ['',[Validators.required]],
    acres: ['',[Validators.required]],
    acresPriorField: ['',[Validators.required]],
  });
  this.changeFieldFormKart = this.formBuilder.group({
    fieldName: ['',[Validators.required]],
    acresPriorField: ['',[Validators.required]],
  });
  this.changeFieldFormCombine = this.formBuilder.group({
    fieldName: ['',[Validators.required]],
    acresPriorField: ['',[Validators.required]],
  });
}
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.changeFieldFormChief.value);
    console.log(this.changeFieldFormKart.value);
    console.log(this.changeFieldFormCombine.value);

  }

}
