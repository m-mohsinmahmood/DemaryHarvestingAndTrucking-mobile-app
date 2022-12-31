import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HarvestingService } from './harvesting.service';
import { takeLast } from 'rxjs/operators';
import { range } from 'rxjs';

@Component({
  selector: 'app-harvesting',
  templateUrl: './harvesting.page.html',
  styleUrls: ['./harvesting.page.scss'],
})
export class HarvestingPage implements OnInit {
// role= 'combine-operator';
role: any;
  constructor(
    private location: Location,
   private router: Router,
   private harvestingService: HarvestingService
  ) { }

  ngOnInit() {
    // console.log('AAA',localStorage.getItem('role'));
    this.role = localStorage.getItem('role');

//     const many = range(1, 100);
//     console.log('first',range);
// const lastThree = many.pipe(takeLast(1));
// console.log(lastThree);
// lastThree.subscribe(x => console.log('ss',x));

// const source = interval(1000);
// const clicks = fromEvent(document, 'click');
// const result = source.pipe(takeUntil(clicks));
// result.subscribe(x => console.log(x));
  }
  goBack(){
    this.location.back();
  }
  navigate(route){
    if (route === 'ticket') {
      this.router.navigateByUrl('tabs/home/harvesting/ticket',{
        state:{
          reassign: false
        }
      });
    } else {
      this.router.navigateByUrl('tabs/home/harvesting/ticket',{
        state:{
          reassign: true
        }
      });
    }

  }
}
// function interval(arg0: number) {
//   throw new Error('Function not implemented.');
// }

// function fromEvent(document: Document, arg1: string) {
//   throw new Error('Function not implemented.');
// }

// function takeUntil(clicks: any): any {
//   throw new Error('Function not implemented.');
// }

