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
changeFieldForm: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private location: Location,

) { }

ngOnInit() {
  this.role = localStorage.getItem('role');
  this.changeFieldForm = this.formBuilder.group({
    fieldName: ['',[Validators.required]],
    acresPriorField: ['',[Validators.required]],
  });
}
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.changeFieldForm.value);
  }

}
