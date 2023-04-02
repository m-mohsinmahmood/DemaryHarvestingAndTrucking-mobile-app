import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
isOpen = false;
editForm: FormGroup;

  constructor(private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.editForm = this.formBuilder.group({
      state: ['', Validators.required],
      destination: ['', Validators.required],
      field: ['', Validators.required],
      farm: ['', Validators.required],
    });
  }

  edit(){
    this.isOpen = true;
  }

  modalDismiss(){
    this.isOpen = false;
  }
  update(){
    this.isOpen = false;
  }

}
