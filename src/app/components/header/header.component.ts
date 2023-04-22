/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  @Input() color: any;
  @Input() routeValue: any;
  @Input() training_record_id: any;
  @Input() supervisor_id: any;

  //  previousUrl: string;
   routeString: string;
   private previousURL: string;
   private currentURL: string;
   private history = [];


  constructor(private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
     ) {
    }
  ngOnInit() {

  }




  goBack() {
    console.log('route-value',this.routeValue);
    // conditions for pre-check-form pages to go back on specific page
    if (
      this.location.path() ===
      '/tabs/home/harvesting/complete-pre-check-form/pre-trip-form'
    ) {
      this.router.navigateByUrl(
        '/tabs/home/harvesting/complete-pre-check-form'
      );
    } else if (
      this.location.path() === '/tabs/home/harvesting/complete-pre-check-form'
    ) {
      this.router.navigateByUrl('/tabs/home/harvesting');
    } else if (this.location.path() === '/tabs/home/harvesting') {
      this.router.navigateByUrl('/tabs/home');
    }
    else if(
        this.location.path().includes('training/trainer/road-skills/evaluation-form') ||
        this.location.path().includes('training/trainer/basic-skills/digital-evaluation')
        ){
      this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills');

    }

    else if(this.routeValue === 'engine-compartment'){
      this.router.navigateByUrl('/tabs/home/training/trainer/pre-trip');
    }
    else if(this.routeValue === 'in-cab'){
  this.router.navigate([ '/tabs/home/training/trainer/pre-trip/digital-form'],{
    queryParams:{
      training_record_id: this.training_record_id,
      supervisor_id: this.supervisor_id
    }
  });
 }
 else if(this.routeValue === 'vehicle-external'){
  this.router.navigate([ '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/'],{
    queryParams:{
      training_record_id: this.training_record_id,
      supervisor_id: this.supervisor_id
    }
  });
 }
 else if(this.routeValue === 'coupling'){
  this.router.navigate([ '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external'],{
    queryParams:{
      training_record_id: this.training_record_id,
      supervisor_id: this.supervisor_id
    }
  });
 }
 else if(this.routeValue === 'basic-skills' || this.routeValue === 'pre-trip'){
  this.router.navigateByUrl('/tabs/home/training/trainer');
}

    else if(this.routeValue === 'view-records' || this.routeValue === 'search-records'){
      this.location.back();
    }
    else if(this.routeValue === 'training' || this.routeValue === 'maintenance-repair' || this.routeValue === 'harvesting'){
      this.router.navigateByUrl('/tabs/home');
    }
    else if(this.routeValue === 'trainer'){
      this.router.navigateByUrl('/tabs/home/training');
    }
    else if(this.routeValue === 'assign-ticket'){
      this.router.navigateByUrl('/tabs/home/maintenance-repair');
    }
    else if(this.routeValue === 'complete-maintenance-ticket'){
      this.router.navigateByUrl('/tabs/home/maintenance-repair');
    }
    else if(this.routeValue === 'dwr'){
      this.router.navigateByUrl('/tabs/home');
    }
    else if(this.routeValue === 'dwr-main'){
      this.router.navigateByUrl('/tabs/home/dwr');
    }
    else if(this.routeValue === 'dwr-detail'){
      // this.router.navigateByUrl('/tabs/home/dwr');
      this.location.historyGo(-1);
    }
    else if(this.routeValue === 'dwr-view-job'){
      this.location.historyGo(-1);
    }
    else{
      this.location.back();
    }

  }
}
