import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-equip-issue',
  templateUrl: './report-equip-issue.page.html',
  styleUrls: ['./report-equip-issue.page.scss'],
})
export class ReportEquipIssuePage implements OnInit {

  reportNewEquipIssue: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.reportNewEquipIssue = this.formBuilder.group({
      empId: ['', Validators.required],
      equipmentId: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      categoryTaskId: ['', Validators.required],
      categoryDepartmentId: ['', Validators.required],
      severityId: ['', Validators.required],
      repairCategoryId: ['', Validators.required],
      detailedDescription: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.reportNewEquipIssue.value);
    this.router.navigateByUrl('/tabs/home/maintenance-repair');
  }

}
