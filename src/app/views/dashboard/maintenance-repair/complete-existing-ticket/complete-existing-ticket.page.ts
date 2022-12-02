import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-complete-existing-ticket',
  templateUrl: './complete-existing-ticket.page.html',
  styleUrls: ['./complete-existing-ticket.page.scss'],
})
export class CompleteExistingTicketPage implements OnInit {

  category = '';
  completeExistingTicketForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      this.category = param.category;
      console.log(this.category);
    });

    this.completeExistingTicketForm = this.formBuilder.group({
      ticketId: [''],
      empIssueReportedId: ['', [Validators.required]],
      assignedById: ['', [Validators.required]],
      assignedToId: ['', [Validators.required]],
      equipID: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      categoriesId: ['', [Validators.required]],
      severityId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      summary: ['', [Validators.required]],
    });
  }

  submit() {
    console.log(this.completeExistingTicketForm.value);
    this.router.navigateByUrl('/tabs/home/maintenance-repair');
  }

}
