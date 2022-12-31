import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  @Input() title: any;
  @Input() color: any;
  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log('Router:',this.router.getCurrentNavigation());
    //  console.log('Location',this.location);

  }


  goBack() {
    // conditions for pre-check-form pages to go back on specific page
    if(this.location.path() === '/tabs/home/harvesting/complete-pre-check-form/pre-trip-form'){
      this.router.navigateByUrl('/tabs/home/harvesting/complete-pre-check-form');
    }else if(this.location.path() === '/tabs/home/harvesting/complete-pre-check-form'){
      this.router.navigateByUrl('/tabs/home/harvesting');
    }else if(this.location.path() === '/tabs/home/harvesting'){
      this.router.navigateByUrl('/tabs/home');
    }
    else{
      // for normal navigation (go-back) of all pages
      this.location.back();
    }
  }
}
