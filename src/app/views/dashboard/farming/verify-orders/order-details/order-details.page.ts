import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmingService } from '../../farming.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  data: any;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private farmingService: FarmingService) {
    this.activeRoute.params.subscribe(params => {
      console.log(params);

      this.data = params;
    })
  }

  ngOnInit() {
  }

  navigateTo(nav: string) {
    this.farmingService.updateWorkOrder({customerId:this.data.work_order_id}, 'dispatcher');
    this.router.navigateByUrl(nav);
  }

}
