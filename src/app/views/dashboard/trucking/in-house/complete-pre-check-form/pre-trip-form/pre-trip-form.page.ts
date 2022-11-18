import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-trip-form',
  templateUrl: './pre-trip-form.page.html',
  styleUrls: ['./pre-trip-form.page.scss'],
})
export class PreTripFormPage implements OnInit {
  buffer = 1;
  progress = 0.2;
 items=[];
  constructor(private router: Router) { }

  ngOnInit() {
  //   this.items = [
  //     {content:'Applicant Completed',name:'', date:'15/02/2022', status:'a',active:true},
  //     {content:'Advance Preliminary review',name:'Bethnay Blake', date:'15/02/2022', status:'b',active:true},
  //     {content:'Adavnce to interview',name:'Martha Grander', date:'15/02/2022',status:'c',active:true},
  //     {content:'Interview Completed',name:'Bethnay Blake', date:'15/02/2022',status:'d1',active:true},
  //     {content:'Reference calls completed', name:'Katherine synder', date:'15/02/2022',status:'e2',active:false},
  //     {content:'Recruiter decision made', name:'', date:'15/02/2022',status:'e1',active:false},
  //     {content:'Offer made', name:'Bethnay Blake', date:'15/02/2022',status:'e1',active:false},
  //     {content:'Offer Accepted', name:'Martha Grander', date:'15/02/2022',status:'e1',active:false},
  //     {content:'Advance to pre-employment Process', name:'Martha Grander', date:'15/02/2022',status:'e1',active:false},
  //     {content:'Not Qualified', name:'rejected', date:'15/02/2022',status:false,active:false},
  //     {content:'Reconsider in Future', name:'rejected', date:'15/02/2022',status:false,active:false},
  // ];
  }

  navigateTo(navTo: string) {
    this.router.navigateByUrl(navTo);
  }
}
