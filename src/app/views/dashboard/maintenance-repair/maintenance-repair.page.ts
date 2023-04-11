import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MaintenanceRepairService } from './maintenance-repair.services';
import { CheckInOutService } from './../../../components/check-in-out/check-in-out.service';
import { IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-maintenance-repair',
  templateUrl: './maintenance-repair.page.html',
  styleUrls: ['./maintenance-repair.page.scss'],
})
export class MaintenanceRepairPage implements OnInit {
  @ViewChild('sectionSelect') sectionSelect: any;


  segment = 'repair';
  allRepairTicketsData: any;
  assignedRepairTicketsData: any;
  pausedRepairTicketsData: any;

  allMaintenanceTicketsData: any;
  assignedMaintenanceTicketsData: any;
  pausedMaintenanceTicketsData: any;

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
    this.value = 'all';
  }

  getTicketsData(){
this.getRepairAll();
this.getRepairAssignedtickets();
this.getRepairContinuedTickets();

this.getMaintenanceAll();
this.getMaintenanceAssignedtickets();
this.getMaintenaceContinuedTickets();

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

  navigate(id: any, entity: any, data){
    if(data.iscontinue === true){
      this.router.navigate(['/tabs/home/maintenance-repair/complete-existing-ticket'],{
        queryParams:{
          ticketRecordId: id,
          category: entity
        }
      });
    }
    else{
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
  }
  getData(value){
    this.value = value;
  }

  getTickets(type){
    this.type = type;

    if(type === 'repair'){
      this.value = 'all';
      this.getRepairContinuedTickets();
      this.getRepairAssignedtickets();
      this.getRepairAll();
    }
    if(type === 'maintenance'){
      this.value = 'all';
      this.getMaintenaceContinuedTickets();
      this.getMaintenanceAssignedtickets();
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
    if(this.value === 'continuedTickets'){ this.repairTicketsData = res;}
    this.pausedRepairTicketsData = res;
    this.loading.next(false);
  });
}
getMaintenaceContinuedTickets(){
  this.maintenanceRepairService
  .getExistingRepairMaintenanceTickets(localStorage.getItem('employeeId'), 'continuedTickets', 'maintenance')
  .subscribe((res) => {
    console.log('maintenance continued tickets', res);
    this.loading.next(true);
    if(this.value === 'continuedTickets'){ this.maintenanceTicketsData = res;}
    this.pausedMaintenanceTicketsData = res;
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
    if(this.value === 'assignedTickets'){ this.repairTicketsData = res;}
    this.assignedRepairTicketsData = res;
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
    if(this.value === 'assignedTickets'){ this.maintenanceTicketsData = res;}
    this.assignedMaintenanceTicketsData = res;
    this.loading.next(false);
  });
}
getRepairAll(){
  this.maintenanceRepairService.getAllTickets('all', 'repair', localStorage.getItem('employeeId'))
  .subscribe((res) => {
    console.log('all repair tickets', res);
    this.loading.next(true);
    this.repairTicketsData = res;
    this.allRepairTicketsData = res;
    this.loading.next(false);
  });
}
getMaintenanceAll(){
  this.maintenanceRepairService.getAllTickets('all', 'maintenance', localStorage.getItem('employeeId'))
  .subscribe((res) => {
    console.log('all maintenance  tickets', res);
    this.loading.next(true);
    this.maintenanceTicketsData = res;
    this.allMaintenanceTicketsData = res;
    this.loading.next(false);
  });
}
}
