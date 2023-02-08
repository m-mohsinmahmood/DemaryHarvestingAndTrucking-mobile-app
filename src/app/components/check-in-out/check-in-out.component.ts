import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckInOutService } from './check-in-out.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss'],
})
export class CheckInOutComponent implements OnInit {
  @Input() module: any;

  activeDwr: any;

  constructor(private router: Router, private dwrServices: CheckInOutService, private toast: ToastService) { }

  ngOnInit() {
    this.initDataRetrieval();
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
  }

  initDataRetrieval() {
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log("Active Check In ", workOrder.dwr);
      this.activeDwr = workOrder.dwr;
    })
  }

  checkIn() {
    let data = {
      employeeId: localStorage.getItem("employeeId"),
      role: localStorage.getItem("role"),
      module: this.module
    }

    this.dwrServices.createNewDWR(data)
      .subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.initDataRetrieval();
            this.toast.presentToast("User has checked-In " + this.module + " module", 'success');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

  checkOut() {
    let data = { id: this.activeDwr[0].id }
    this.dwrServices.updateDWR(data)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast("Checked Out from last module successfully!", 'success');
            this.router.navigateByUrl('/tabs/home');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }
}
