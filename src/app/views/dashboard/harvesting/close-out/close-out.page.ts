import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-close-out',
  templateUrl: './close-out.page.html',
  styleUrls: ['./close-out.page.scss'],
})
export class CloseOutPage implements OnInit {
  closeJobForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.closeJobForm = this.formBuilder.group({
      date: ['',[Validators.required]],
      totalAcres: ['',[Validators.required]],
      totalGPSAcres: ['',[Validators.required]],
    });
  }
  submit(){
    console.log(this.closeJobForm.value);
  }
}
