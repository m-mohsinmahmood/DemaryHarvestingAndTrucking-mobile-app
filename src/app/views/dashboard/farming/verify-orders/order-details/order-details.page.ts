import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmingService } from '../../farming.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  data: any;
  tractorDriver: string = '';
  dataLoaded = false;

  constructor(private toast: ToastService, private router: Router, private activeRoute: ActivatedRoute, private farmingService: FarmingService) {
    this.activeRoute.params.subscribe(params => {
      console.log(params);

      this.data = params;
    })
  }

  ngOnInit() {
    console.log(this.data.tractor_driver_id);

    this.farmingService.getEmployeesById(this.data.tractor_driver_id).subscribe(tractorDriver => {

      this.tractorDriver = tractorDriver.first_name;
      this.dataLoaded = true;
    })
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
    this.farmingService.updateWorkOrder({ customerId: this.data.work_order_id }, 'dispatcher')
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res.status === 200) {
            this.toast.presentToast("Work Order has verified!", 'success');
            this.router.navigateByUrl(nav);
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

}
