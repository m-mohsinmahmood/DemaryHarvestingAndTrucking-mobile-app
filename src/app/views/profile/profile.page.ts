import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ProfileService } from './profile.services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
isOpen = false;
editForm: FormGroup;
employeeData: any;
public loading = new BehaviorSubject(true);

  constructor(private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private profileservice: ProfileService) { }

  ngOnInit() {
    this.initForm();

    // getting employee details
    this.getEmployeeDetailsByFirbaseId();
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
  getEmployeeDetailsByFirbaseId(){
    this.profileservice.getEmployeeDetailsByFirbaseId(localStorage.getItem('fb_id')).subscribe((res)=>{
      this.loading.next(true);
      console.log('res',res);
      this.employeeData = res;
      this.loading.next(false);
    });
  }

}
