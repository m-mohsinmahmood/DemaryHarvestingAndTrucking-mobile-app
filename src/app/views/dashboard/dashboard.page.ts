/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckInOutService } from './../../components/check-in-out/check-in-out.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HarvestingService } from './harvesting/harvesting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;

  empName = '';
  role = '';
  selectform: FormGroup;
  activeDwr: any;
  isModalOpen = false;
  toShow = true;
  public loading = new BehaviorSubject(true);

  constructor(
    private formbuilder: FormBuilder,
    private dwrServices: CheckInOutService,
    private nav: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.loading.next(true);
    this.initDataRetrieval();
    console.log(localStorage.getItem('employeeId'));
    console.log(localStorage.getItem('role'));
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
  }
  async ionViewWillEnter() {
    this.initDataRetrieval();
  }

  initDataRetrieval() {
    this.selectform = this.formbuilder.group({
      select: [''],
    });

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeDwr = workOrder.dwr;

      this.role = localStorage.getItem('role');
      this.empName = localStorage.getItem('employeeName');

      if (this.activeDwr.length <= 0) {
        this.role = localStorage.getItem('role');
        // to stop loading
        this.loading.next(false);

        this.isModalOpen = false;
      }
      else {
        console.log('Already CheckedIn');
        this.role = this.activeDwr[0].role;
        this.selectform.patchValue({ select: this.role });
        localStorage.setItem('role', this.activeDwr[0].role);
        localStorage.setItem('employeeId', this.activeDwr[0].employee_id);
        this.isModalOpen = true;
        // to stop loading
        this.loading.next(false);
      }
    });


  }

  async logout() {
    await this.auth.logout();
    this.isOpen = false;

    localStorage.removeItem('employeeId');
    localStorage.removeItem('role');
  }

  onSelect(e) {
    console.log(e.target.value);
    localStorage.setItem('role', e.target.value);
    // assigning role
    this.role = e.target.value;

  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  setOpen() {

    if (this.activeDwr[0].module_to_redirect === 'farming') {
      this.isModalOpen = false;
      this.nav.navigate(['farming'], { relativeTo: this.activatedRoute });
    }
    else if (this.activeDwr[0].module_to_redirect === 'trucking') {
      this.isModalOpen = false;
      this.nav.navigate(['trucking'], { relativeTo: this.activatedRoute });
    }
    else if (this.activeDwr[0].module_to_redirect === 'harvesting') {
      this.isModalOpen = false;
      this.nav.navigate(['harvesting'], { relativeTo: this.activatedRoute });
    }
    else if (this.activeDwr[0].module_to_redirect === 'maintenance-repair') {
      this.isModalOpen = false;
      this.nav.navigate(['maintenance-repair'], { relativeTo: this.activatedRoute });
    }
    else if (this.activeDwr[0].module_to_redirect === 'training') {
      this.isModalOpen = false;
      this.nav.navigate(['training'], { relativeTo: this.activatedRoute });
    }
    else if (this.activeDwr[0].module_to_redirect === 'other') {
      this.isModalOpen = false;
      this.nav.navigate(['others'], { relativeTo: this.activatedRoute });
    }
  }
}
