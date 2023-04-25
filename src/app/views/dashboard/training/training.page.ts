import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckInOutService } from './../../../components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  role: any;
  isModalOpen;
  activeDwr: Observable<any>;
  data;

  constructor(private dwrServices: CheckInOutService) { }

  ngOnInit() {
    this.getRoleAndID();
    this.checkInOut();
  }
  async ionViewDidEnter() {
    this.getRoleAndID();
    this.checkInOut();

  }

  getRoleAndID() {
    this.role = localStorage.getItem('role');
  }
  checkInOut(){
    // Check-in/Check-out
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
     console.log('Active Check In ', workOrder.dwr);
     this.activeDwr = workOrder.dwr;
     this.data = this.activeDwr[0];

     if (workOrder.dwr.length > 0)
       {this.isModalOpen = false;}
     else
       {this.isModalOpen = true;}
   });
 }

}
