import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MaintenanceRepairService } from './maintenance-repair.services';

@Component({
  selector: 'app-maintenance-repair',
  templateUrl: './maintenance-repair.page.html',
  styleUrls: ['./maintenance-repair.page.scss'],
})
export class MaintenanceRepairPage implements OnInit {

  segment = 'repair';
  repairTicketsData: any;
  maintenanceTicketsData: any;
  public loading = new BehaviorSubject(true);

  constructor(private router: Router,
    private maintenanceRepairService: MaintenanceRepairService,
    ) { }

  ngOnInit() {
    this.getTicketsData();
  }
  ionViewWillEnter(){
    this.getTicketsData();
  }
  getTicketsData() {

    // repair tickets
    this.maintenanceRepairService
      .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets','repair')
      .subscribe((res) => {
        console.log('repair tickets', res);
        this.loading.next(true);
        this.repairTicketsData = res;
        this.loading.next(false);
      });

    // maintenance tickets
    this.maintenanceRepairService
      .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets', 'maintenance')
      .subscribe((res) => {
        console.log('maintenance tickets', res);
        this.loading.next(true);
        this.maintenanceTicketsData = res;
        this.loading.next(false);
      });
  }
  navigate(id: any, entity: any){
      this.router.navigate(['/tabs/home/maintenance-repair/complete-existing-ticket'],{
        queryParams:{
          ticketRecordId: id,
          category: entity
        }
      });
  }
  getTickets(entity){
    if (entity === 'repair') {
      // repair tickets
    this.maintenanceRepairService
    .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets','repair')
    .subscribe((res) => {
      console.log('repair tickets', res);
      this.loading.next(true);
      this.repairTicketsData = res;
      this.loading.next(false);
    });
    } else {
      // maintenance tickets
    this.maintenanceRepairService
    .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets', 'maintenance')
    .subscribe((res) => {
      console.log('maintenance tickets', res);
      this.loading.next(true);
      this.maintenanceTicketsData = res;
      this.loading.next(false);
    });
    }

  }

}
