import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-harvesting-guest',
  templateUrl: './harvesting-guest.page.html',
  styleUrls: ['./harvesting-guest.page.scss'],
})
export class HarvestingGuestPage implements OnInit {
  role = '';
  private initDataRetrievalExecuted = false;
  private ionViewRetrievalExecuted = true;

  constructor() { }

  ngOnInit() {
    if (!this.initDataRetrievalExecuted) {
      this.initDataRetrieval();
      this.initDataRetrievalExecuted = true;
    }
  }

  async ionViewDidEnter() {
    if (!this.ionViewRetrievalExecuted) {
      this.initDataRetrieval();
      this.ionViewRetrievalExecuted = true;
    }
  }

  async ionViewDidLeave() {
    this.ionViewRetrievalExecuted = false;
  }

  initDataRetrieval() {
    this.role = localStorage.getItem('role');
  }

}
