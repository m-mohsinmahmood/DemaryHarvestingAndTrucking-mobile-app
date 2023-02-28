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
   previousUrl: string;
   routeString: string;
   private previousURL: string;
   private currentURL: string;
   private history = [];


  constructor(private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
     ) {
      console.log('CHECK:',this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString());
      this.previousUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
      const previousRoute = this.activatedRoute.snapshot.data.previousRoute;

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
         this.location.path().includes('training/trainer/pre-trip/digital-form') ||
        this.location.path().includes('training/trainer/road-skills/evaluation-form') ||
        this.location.path().includes('training/trainer/basic-skills/digital-evaluation')
        ){
      this.location.historyGo(-2);
    }
    else if(this.routeValue === 'pre-trip' || this.routeValue === 'basic-skills'){
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
      this.router.navigateByUrl('/tabs/home/maintenance-repair/assign-tickets');
    }
    else if(this.routeValue === 'complete-maintenance-ticket'){
      this.router.navigateByUrl('/tabs/home/maintenance-repair');
    }
    else{
      this.location.back();
    }

  }
}
