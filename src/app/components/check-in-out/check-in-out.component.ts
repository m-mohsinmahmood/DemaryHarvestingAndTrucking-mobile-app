import { Component, Input, OnInit } from '@angular/core';
import { CheckInOutService } from './check-in-out.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss'],
})
export class CheckInOutComponent implements OnInit {
  @Input() module: any;
  @Input() data: any;
  @Input() isModalOpen: any;
  public loadingSpinner = new BehaviorSubject(false);

  constructor(private router: Router,
    private dwrServices: CheckInOutService,
    private toast: ToastService) {
  }

  ngOnInit() {

  }

  checkIn() {
    this.loadingSpinner.next(true);

    const data = {
      employeeId: localStorage.getItem('employeeId'),
      role: localStorage.getItem('role'),
      module: this.module,
      moduleToRedirect: this.module,
    };

    this.dwrServices.createNewDWR(data)
      .subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
              console.log('Active Check In ', workOrder.dwr);
              this.data = workOrder.dwr;
              this.loadingSpinner.next(false);
            });
            this.toast.presentToast('User has checked-In ' + this.module + ' module', 'success');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
          this.loadingSpinner.next(false);
        },
      );
    this.isModalOpen = false;
  }

  checkOut() {

    console.log(this.data);
    this.loadingSpinner.next(true);

    const data = {
      id: this.data[0].id
    };
    this.dwrServices.updateDWR(data)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast('Checked Out from last module successfully!', 'success');
            this.router.navigateByUrl('/tabs/home');
            this.loadingSpinner.next(false);
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
          this.loadingSpinner.next(false);
        },
      );
  }

  closePopup() {
    this.router.navigateByUrl('/tabs/home');
  }

}
