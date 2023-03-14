import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckInOutService } from './../../../components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-trucking',
  templateUrl: './trucking.page.html',
  styleUrls: ['./trucking.page.scss'],
})
export class TruckingPage implements OnInit {
  activeDwr: any;
  isModalOpen;

  constructor(private dwrServices: CheckInOutService) { }

  ngOnInit() {
    this.initDataRev();
  }

  async ionViewDidEnter() {
    this.initDataRev();
  }

  initDataRev() {
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log("Active Check In ", workOrder.dwr);
      this.activeDwr = workOrder.dwr;

      if (workOrder.dwr.length > 0)
        this.isModalOpen = false;
      else
        this.isModalOpen = true;
    })
  }
}
