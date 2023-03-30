import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('sectionSelect') sectionSelect: any;

  segment = 'repair';
  repairTicketsData: any;
  maintenanceTicketsData: any;
  isModalOpen;
  activeDwr: Observable<any>;
  data;
  hidden = true;
  type: any = 'repair';
  value = 'all';



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

  getTicketsData(){
this.getRepairAll();

this.getMaintenanceAll();

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
  }

  // getTicketsData() {
  //   this.isModalOpen = false;

  //       // Check-in/Check-out
  //       this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
  //         console.log('Active Check In ', workOrder.dwr);
  //         this.activeDwr = workOrder.dwr;
  //         this.data = this.activeDwr[0];

  //         if (workOrder.dwr.length > 0)
  //           {this.isModalOpen = false;}
  //         else
  //           {this.isModalOpen = true;}
  //       });


  //   // repair tickets
  //   this.maintenanceRepairService
  //     .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets','repair')
  //     .subscribe((res) => {
  //       console.log('repair tickets', res);
  //       this.loading.next(true);
  //       this.repairTicketsData = res;
  //       this.loading.next(false);
  //     });

  //   // maintenance tickets
  //   this.maintenanceRepairService
  //     .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets', 'maintenance')
  //     .subscribe((res) => {
  //       console.log('maintenance tickets', res);
  //       this.loading.next(true);
  //       this.maintenanceTicketsData = res;
  //       this.loading.next(false);
  //     });
  // }
  navigate(id: any, entity: any){
      this.router.navigate(['/tabs/home/maintenance-repair/complete-existing-ticket'],{
        queryParams:{
          ticketRecordId: id,
          category: entity
        }
      });
  }
  getData(value){
    this.value = value
    // if (entity === 'repair') {
    //   // repair tickets
    // // this.maintenanceRepairService
    // // .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets','repair')
    // // .subscribe((res) => {
    // //   console.log('repair tickets', res);
    // //   this.loading.next(true);
    // //   this.repairTicketsData = res;
    // //   this.loading.next(false);
    // // });

    // // this.type = 'repair';
    // this.getRepairAll();
    // } else {
    //   // maintenance tickets
    // // this.maintenanceRepairService
    // // .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets', 'maintenance')
    // // .subscribe((res) => {
    // //   console.log('maintenance tickets', res);
    // //   this.loading.next(true);
    // //   this.maintenanceTicketsData = res;
    // //   this.loading.next(false);
    // // });
    // // this.type = 'maintenance';
    // this.getMaintenanceAll();
    // }

  }
  // filter(type){
  //   this.sectionSelect.hidden = false;
  //   this.sectionSelect.open();
  //   this.type = type;


  // }
  getTickets(type){
    this.type = type;

    if(type === 'repair'){
      this.value = 'all';
      this.getRepairAll();
    }
    if(type === 'maintenance'){
      this.value = 'all';
      this.getMaintenanceAll();
    }
  }

  handleChange(value) {
 this.value = value;
 console.log('value',this.value);
 console.log('type',this.type);

// repair tickets (continued)
if( this.type === 'repair' && this.value === 'continuedTickets'){
this.getRepairContinuedTickets();
}

// maintenance tickets (continued)
else if( this.type === 'maintenance' && this.value === 'continuedTickets'){
  this.getMaintenaceContinuedTickets();
  console.log('---------');
  }

    // repair tickets (assigned)
  else if( this.type === 'repair' && this.value === 'assignedTickets'){
    this.getRepairAssignedtickets();
    }

    // maintenance tickets (assigned)
    else if( this.type === 'maintenance' && this.value === 'assignedTickets'){
      this.getMaintenanceAssignedtickets();
      }

      // repair all
      else if(this.type === 'repair' && this.value === 'all'){
        this.getRepairAll();
      }
      // maintenance all
      else if(this.type === 'maintenance' && this.value === 'all'){
        this.getMaintenanceAll();

      }

}


getRepairContinuedTickets(){
  this.maintenanceRepairService
  .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets', 'repair')
  .subscribe((res) => {
    console.log('repair continued tickets', res);
    this.loading.next(true);
    this.repairTicketsData = res;
    this.loading.next(false);
  });
}
getMaintenaceContinuedTickets(){
  this.maintenanceRepairService
  .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets', 'maintenance')
  .subscribe((res) => {
    console.log('maintenance continued tickets', res);
    this.loading.next(true);
    this.maintenanceTicketsData = res;
    this.loading.next(false);
  });
}
getRepairAssignedtickets(){
  this.maintenanceRepairService
  .getRepairMaintenanceTickets(
    localStorage.getItem('employeeId'),
    'repair'
  )
  .subscribe((res) => {
    console.log('repair  assigned tickets', res);
    this.loading.next(true);
    this.repairTicketsData = res;
    this.loading.next(false);
  });
}
getMaintenanceAssignedtickets(){
  this.maintenanceRepairService
  .getRepairMaintenanceTickets(
    localStorage.getItem('employeeId'),
    'maintenance'
  )
  .subscribe((res) => {
    console.log('maintenance assigned tickets', res);
    this.loading.next(true);
    this.maintenanceTicketsData = res;
    this.loading.next(false);
  });
}
getRepairAll(){
  this.maintenanceRepairService.getAllTickets('all', 'repair', localStorage.getItem('employeeId'))
  .subscribe((res) => {
    console.log('all repair tickets', res);
    this.loading.next(true);
    this.repairTicketsData = res;
    this.loading.next(false);
  });
}
getMaintenanceAll(){
  this.maintenanceRepairService.getAllTickets('all', 'maintenance', localStorage.getItem('employeeId'))
  .subscribe((res) => {
    console.log('all maintenance  tickets', res);
    this.loading.next(true);
    this.maintenanceTicketsData = res;
    this.loading.next(false);
  });
}
}
