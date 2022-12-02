import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-repair-or-maintenance',
  templateUrl: './create-repair-or-maintenance.page.html',
  styleUrls: ['./create-repair-or-maintenance.page.scss'],
})
export class CreateRepairORMaintenancePage implements OnInit {

  category = '';
  createTicket: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(param => {
      this.category = param.category;
    });

    this.createTicket = this.formBuilder.group({
      repairTicketId: ['', Validators.required],
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
    console.log(this.createTicket.value);
    this.router.navigateByUrl('/tabs/home/maintenance-repair');
  }
}
