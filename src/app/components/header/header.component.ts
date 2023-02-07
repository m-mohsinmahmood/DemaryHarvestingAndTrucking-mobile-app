/* eslint-disable max-len */
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { filter, map, pairwise } from 'rxjs/operators';

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
  constructor(private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      // this.previousUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
      // localStorage.setItem('localRoute',this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString());
      // console.log('---',location.getState());
      console.log('CHECK:',this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString());
      this.routeString = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();

      // if(this.routeString === undefined){
      //  console.log('==');
      //  this.previousUrl = localStorage.getItem('localRoute');
      // }
      // else if((this.routeString !== undefined && this.routeString.includes('?'))){
      //   console.log('===');
      //   // console.log('===',this.routeString);
      //   // console.log(this.routeString.indexOf('?'));
      //   console.log('new route',this.routeString.slice(0,this.routeString.indexOf('?')));
      //   // console.log('-------', this.routeString.includes('?'));
      //   // if(this.routeString.contains('?')){
      //   //   console.log('ubjnklm;jklm.')
      //   // }
      //   // localStorage.setItem('localRoute',this.routeString);
      //   // this.previousUrl = localStorage.getItem('localRoute');
      //   this.previousUrl = this.routeString.slice(0,this.routeString.indexOf('?'));
      //   console.log('=======',this.previousUrl);
      // }
      // else if((this.routeString !== undefined && !this.routeString.includes('?'))){
      //   console.log('====:');
      //   localStorage.setItem('localRoute',this.routeString);
      //   this.previousUrl = localStorage.getItem('localRoute');
      // }
      // console.log('====',this.previousUrl);

      // localStorage.setItem('localRoute',this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString() === undefined? null:  this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString());
      // this.currentURL = this.router.url;
      // router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     this.previousUrl = this.currentURL;
      //     this.currentURL = event.url;
      //     console.log('PRE:',this.previousUrl);
      //     console.log('CURR:',this.currentURL);
      //   };
      // });

      this.router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event) => event as RoutesRecognized),
        pairwise()
      )
      .subscribe((events: [RoutesRecognized, RoutesRecognized]) => {
        // this.previousUrl = events[0].urlAfterRedirects;
        console.log('---',events[0].urlAfterRedirects);
      });
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
    } else {
      if (
        // this.location.path().includes('training/trainer/pre-trip/digital-form') ||
        // this.location.path().includes('training/trainer/road-skills/evaluation-form') ||
        // this.location.path().includes('training/trainer/basic-skills/digital-evaluation')
        this.routeValue === 'pre-trip' || this.routeValue === 'basic-skills'
      ) {
        this.location.historyGo(-2);
      }
      // to navigate view-records & search-records page due to query-params
      else if(this.routeValue === 'view-records' || this.routeValue === 'search-records'){
        this.location.back();
      }
      // else if(this.routeValue === 'repair-maintenance'){
      //   // this.router.navigate(['/tabs/home']);
      //   this.location.historyGo(-1);

      // }
       else {
        console.log('PRE:',this.previousUrl);
        if(this.previousUrl === undefined){
          console.log('If called');
          this.location.historyGo(-1);
          // console.log('history:',this.location);


          // this.router.navigate([],{relativeTo: this.activatedRoute});
          // this.location.back();
          // this.location.historyGo();


        }
        else{
          console.log('else called');
          this.router.navigate([this.previousUrl]);
          // this.location.historyGo(-1);
          // this.router.navigate(['./'],{relativeTo: this.activatedRoute});

          console.log('history:',this.location);


        }
      }
    }
  }
}
