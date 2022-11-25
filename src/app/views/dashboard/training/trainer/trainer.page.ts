import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
navigate(route){
  this.router.navigateByUrl('/tabs/home/training/trainer/training-tasks',{
    state:{
      routeName: route
    }
  });
}
}
