import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-records',
  templateUrl: './training-records.page.html',
  styleUrls: ['./training-records.page.scss'],
})
export class TrainingRecordsPage implements OnInit {
formtype;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onSelect(e){
this.formtype = e.target.value;
}
navigate(){
  this.router.navigateByUrl('/tabs/home/training/trainer/training-records/search-records',{
    state:{
      formType: this.formtype
    }
  });
}
}
