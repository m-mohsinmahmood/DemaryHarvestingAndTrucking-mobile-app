import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  navigate(){
// this.router.navigateByUrl('/tabs');
this.router.navigateByUrl('/tabs/home/training/trainer');
  }
}
