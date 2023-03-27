import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MaintenanceRepairService } from './maintenance-repair.services';
import { CheckInOutService } from './../../../components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-maintenance-repair',
  templateUrl: './maintenance-repair.page.html',
  styleUrls: ['./maintenance-repair.page.scss'],
})
export class MaintenanceRepairPage implements OnInit {

  segment = 'repair';
  repairTicketsData: any;
  maintenanceTicketsData: any;
  isModalOpen;
  activeDwr: Observable<any>;
  data;

  public loading = new BehaviorSubject(true);

  constructor(private router: Router,
    private maintenanceRepairService: MaintenanceRepairService,
    private dwrServices: CheckInOutService
    ) { }

  ngOnInit() {
    this.getTicketsData();
  }

  ionViewWillEnter(){
    this.getTicketsData();
  }

  getTicketsData() {
    this.isModalOpen = false;

        // Check-in/Check-out
        this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
          console.log('Active Check In ', workOrder.dwr);
          this.activeDwr = workOrder.dwr;
          this.data = this.activeDwr[0];

          if (workOrder.dwr.length > 0)
            {this.isModalOpen = false;}
          else
            {this.isModalOpen = true;}
        });


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
