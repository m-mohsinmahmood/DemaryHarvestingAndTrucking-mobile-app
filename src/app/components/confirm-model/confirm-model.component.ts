import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.scss'],
})
export class ConfirmModelComponent implements OnInit {
  @Input() route: any;
  constructor() { }

  ngOnInit() {}
next(){
  // this.router.navigate([ '/tabs/home/training/trainer/pre-trip/digital-form/in-cab'],{

}
}
