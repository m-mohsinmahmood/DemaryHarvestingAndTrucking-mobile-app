/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  loginForm: FormGroup;
  logedIn;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    localStorage.setItem('login_status', 'false');
    this.logedIn = localStorage.getItem('login_status')
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  async login() {

    // eslint-disable-next-line prefer-const
    let { email, password } = this.loginForm.value;

    localStorage.setItem('login_status', 'logging');
    this.logedIn = localStorage.getItem('login_status')
    await this.auth.loginWithEmailPassword(email, password);
    this.logedIn = localStorage.getItem('login_status')
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
