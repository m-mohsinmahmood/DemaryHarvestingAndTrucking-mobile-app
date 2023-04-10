/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaintenanceRepairService } from '../maintenance-repair.services';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-complete-existing-ticket',
  templateUrl: './complete-existing-ticket.page.html',
  styleUrls: ['./complete-existing-ticket.page.scss'],
})
export class CompleteExistingTicketPage implements OnInit {

  category = '';
  completeExistingTicketForm: FormGroup;
  ticketRecordId: any;
  ticketData: any;
  assignedBy: any;
  assignedTo: any;

  active_check_in_id: any;
  taskType: any;

  // behaviour subject's for loader
  public loading = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);
  public activeCheckInSpinner = new BehaviorSubject(false);


  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private maintenanceRepairService: MaintenanceRepairService,
    private toastService: ToastService,
    private dwrServices: CheckInOutService

  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      this.category = param.category;
      this.ticketRecordId = param.ticketRecordId;

      console.log(param);
    });

    this.initForms();
    this.getExistingTicketRecord();


  }
  initForms() {
    this.completeExistingTicketForm = this.formBuilder.group({
      repairTicketId: [''],
      // empIssueReportedId: [''],
      assignedById: [''],
      assignedToId: [''],
      equipID: [''],
      city: [''],
      state: [''],
      issueCategory: [''],
      severityType: [''],
      status: [''],
      description: [''],
      summary: ['', [Validators.required]],
    });
  }
  getExistingTicketRecord() {
    // getting ticket record
    this.maintenanceRepairService
      .getExistingTicketRecordById(this.ticketRecordId, 'continuedTicket')
      .subscribe((res) => {
        console.log('res', res);
        this.loading.next(true);
        this.ticketData = res[0];
        this.loading.next(false);

        // patching
        this.completeExistingTicketForm.patchValue({
          repairTicketId: this.ticketData.repairTicketId.substring(0, 6),
          assignedById: this.ticketData.assignedById,
          assignedToId: this.ticketData.assignedToId,
          empModule: this.ticketData.empModule,
          equipID: this.ticketData.equipmentId,
          city: this.ticketData.city,
          state: this.ticketData.state,
          issueCategory: this.ticketData.issueCategory,
          severityType: this.ticketData.severityType,
          status: this.ticketData.status,
          description: this.ticketData.description,
          summary: this.ticketData.summary,
        });
        this.assignedBy = this.ticketData.assignedBy;
        this.assignedTo = this.ticketData.assignedTo;
        // }
      });
  }

  completTicket() {

    this.loadingSpinner.next(true);
    this.getCheckInID();

  }

  getCheckInID() {
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeCheckInSpinner.next(true);
      this.active_check_in_id = workOrder.dwr[0].id;
      this.activeCheckInSpinner.next(false);


      // complete ticket
      this.completeticket();
    });

  }
  completeticket(){
    this.maintenanceRepairService
          .ticket(this.completeExistingTicketForm.value, this.ticketRecordId, 'complete',this.active_check_in_id)
          .subscribe(
            (res) => {
              console.log('RES:', res);
              if (res.status === 200) {

                // ticket nature
                this.taskType = 'work done';

                // creating DWR
                this.createDWR();

              } else {
                console.log('Something happened :)');
                this.loadingSpinner.next(false);

                this.toastService.presentToast(res.mssage, 'danger');
              }
            },
            (err) => {
              console.log('ERROR::', err);
              this.loadingSpinner.next(false);

              this.toastService.presentToast(err.mssage, 'danger');
            }
          );
      }
  createDWR() {
    let supervisor_id;
    supervisor_id = this.completeExistingTicketForm.get('assignedById').value;
    this.maintenanceRepairService
      .createDWR(localStorage.getItem('employeeId'), this.ticketRecordId, this.completeExistingTicketForm.get('assignedById').value, this.active_check_in_id, this.taskType)
      .subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {

            // to stop loader
            this.loadingSpinner.next(false);

            // tooltip
            this.toastService.presentToast(
              'Paused ticket has been completed',
              'success'
            );

            // navigating
            this.router.navigateByUrl('/tabs/home/maintenance-repair');
          } else {
            console.log('Something happened :)');
            this.loadingSpinner.next(false);

            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          console.log('ERROR::', err);
          this.loadingSpinner.next(false);

          this.toastService.presentToast(err.mssage, 'danger');
        }
      );
  }

}
