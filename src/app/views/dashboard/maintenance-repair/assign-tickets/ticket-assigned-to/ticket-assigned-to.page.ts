import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-assigned-to',
  templateUrl: './ticket-assigned-to.page.html',
  styleUrls: ['./ticket-assigned-to.page.scss'],
})
export class TicketAssignedToPage implements OnInit {

  assignTicket: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.assignTicket = this.formBuilder.group({
      repairTicketId: [''],
      empId: ['', Validators.required],
      assignedById: ['', Validators.required],
      assignedToId: ['', Validators.required],
      equipID: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      categoryId: ['', Validators.required],
      severityId: ['', Validators.required],
      status: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.assignTicket.value);
    this.router.navigateByUrl('/tabs/home/maintenance-repair');
  }

}
