import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MaintenanceRepairService } from '../maintenance-repair.services';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-tickets',
  templateUrl: './assign-tickets.page.html',
  styleUrls: ['./assign-tickets.page.scss'],
})
export class AssignTicketsPage implements OnInit {
  segment = 'unassigned';
  unassgnedData: any;
  repairTicketsData: any;
  maintenanceTicketsData: any;
  public loading = new BehaviorSubject(true);

  constructor(
    private maintenanceRepairService: MaintenanceRepairService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTicketsData();
  }
  getTicketsData() {
    // unassigned tickets
    this.maintenanceRepairService
      .getTicketsById(localStorage.getItem('employeeId'), 'unassignedTickets')
      .subscribe((res) => {
        console.log('res', res);
        this.loading.next(true);
        this.unassgnedData = res;
        this.loading.next(false);
      });

    // repair tickets
    this.maintenanceRepairService
      .getRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'repair')
      .subscribe((res) => {
        console.log('repair tickets', res);
        this.loading.next(true);
        this.repairTicketsData = res;
        this.loading.next(false);
      });

    // maintenance tickets
    this.maintenanceRepairService
      .getRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'maintenance')
      .subscribe((res) => {
        console.log('maintenance tickets', res);
        this.loading.next(true);
        this.maintenanceTicketsData = res;
        this.loading.next(false);
      });
  }
  navigate(id, entity) {
    this.router.navigate(
      ['/tabs/home/maintenance-repair/assign-tickets/ticket-assigned-to'],
      {
        queryParams: {
          ticketRecordId: id,
          entity
        },
      }
    );
  }
  getTickets(entity) {
    if (entity === 'repair') {
      this.maintenanceRepairService
        .getRepairMaintenanceTickets(
          localStorage.getItem('employeeId'),
          'repair'
        )
        .subscribe((res) => {
          console.log('repair tickets', res);
          this.loading.next(true);
          this.repairTicketsData = res;
          this.loading.next(false);
        });
    } else if (entity === 'maintenance') {
      // for maintenance
      this.maintenanceRepairService
        .getRepairMaintenanceTickets(
          localStorage.getItem('employeeId'),
          'maintenance'
        )
        .subscribe((res) => {
          console.log('maintenance tickets', res);
          this.loading.next(true);
          this.maintenanceTicketsData = res;
          this.loading.next(false);
        });
    } else if (entity === 'unassignedTickets') {
      // for unassigned tickets
      this.maintenanceRepairService
        .getTicketsById(localStorage.getItem('employeeId'), 'unassignedTickets')
        .subscribe((res) => {
          console.log('res', res);
          this.loading.next(true);
          this.unassgnedData = res;
          this.loading.next(false);
        });
    }
  }
}
