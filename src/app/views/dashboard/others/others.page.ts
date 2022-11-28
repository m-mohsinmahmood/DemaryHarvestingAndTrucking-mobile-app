import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  otherForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.otherForm = this.formBuilder.group({
      empName: ['', Validators.required],
      supervisor: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      apprTask: ['driveCVehicle', Validators.required],
      notes: ['', Validators.required],
    });
  }

  navigateTo() {
    console.log(this.otherForm.value);
    this.router.navigateByUrl('/tabs/home');
  }
}
