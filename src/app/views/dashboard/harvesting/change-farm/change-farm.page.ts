import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';

@Component({
  selector: 'app-change-farm',
  templateUrl: './change-farm.page.html',
  styleUrls: ['./change-farm.page.scss'],
})
export class ChangeFarmPage implements OnInit {
  changeFarmForm: FormGroup;
  states: string[];
role;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.changeFarmForm = this.formBuilder.group({
      state: ['',[Validators.required]],
      customerName: ['',[Validators.required]],
      farm: ['',[Validators.required]],
      crop: ['',[Validators.required]],
      initailField: ['',[Validators.required]],
    });

    // passing states
    this.states = states;
  }
  goBack(){
    this.location.back();
  }
  submit(){
    console.log(this.changeFarmForm.value);
  }

}
