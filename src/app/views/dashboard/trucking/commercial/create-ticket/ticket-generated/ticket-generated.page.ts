import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TruckingService } from '../../../trucking.service';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ticket-generated',
  templateUrl: './ticket-generated.page.html',
  styleUrls: ['./ticket-generated.page.scss'],
})
export class TicketGeneratedPage implements OnInit {

  data: any;
  nameArr: any;
  moment: any = moment;
  public loadingSpinner = new BehaviorSubject(true);

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private truckingService: TruckingService,
    private toast: ToastService,


  ) {
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.getNewDeliveryTicketById(params.id);
      // this.data = params;
      // this.nameArr = this.data.uploadFile.split(',');
      console.log(this.nameArr);

    })
  }

  ngOnInit() {
  }

  navigateTo(nav: string) {
    this.router.navigateByUrl(nav);
  }
  getNewDeliveryTicketById(id){
    console.log('object');
    this.truckingService.getNewDeliveryTicketById(id)
    .subscribe((res)=>{
      this.loadingSpinner.next(false);
              console.log(res);
                    this.data = res;


    },
    (err)=>{
        this.toast.presentToast(err, 'danger');
    });
  }
}
