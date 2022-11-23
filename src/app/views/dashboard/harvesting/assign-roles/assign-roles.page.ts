import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.page.html',
  styleUrls: ['./assign-roles.page.scss'],
})
export class AssignRolesPage implements OnInit {
 assignForm: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.assignForm = this.formBuilder.group({
      combineOperator: ['',[Validators.required]],
      kartOperator:['',[Validators.required]]
    });

  }
  goBack(){
    this.location.back();
  }
  add(){
    console.log(this.assignForm.value);
  }

}
