import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-field',
  templateUrl: './change-field.page.html',
  styleUrls: ['./change-field.page.scss'],
})
export class ChangeFieldPage implements OnInit {

  changeField: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changeField = this.formBuilder.group({
      fieldId: ['', [Validators.required]],
      gpsAcresCompleted: ['', [Validators.required]],
    });
  }

  navigateTo() {
    console.log(this.changeField.value);
    this.router.navigateByUrl('/tabs/home/farming');
  }

}
