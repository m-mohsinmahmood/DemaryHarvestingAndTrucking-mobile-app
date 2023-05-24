/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckInOutService } from './../../components/check-in-out/check-in-out.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

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
  actualRoles;
  rolesDropdown = [{
    value: ''
  }]
  showRoleDropdown = false;
  roleToShow = '';

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
    this.rolesDropdown = [{
      value: ''
    }]

    this.selectform = this.formbuilder.group({
      select: [''],
    });

    this.showRoleDropdown = false;

    if (localStorage.getItem("actualRole") && localStorage.getItem("role")) {
      this.actualRoles = localStorage.getItem("actualRole");

      try {
        if (this.actualRoles.includes(',')) {
          this.actualRoles = this.actualRoles.split(',');
          this.role = this.actualRoles[0];
          localStorage.setItem("role", this.role);
        }
        else {
          this.role = this.actualRoles;
          localStorage.setItem("role", this.role);
        }

        this.selectform.patchValue({ select: this.role })
        this.roleToShow = this.actualRoles;
        this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
          this.activeDwr = workOrder.dwr;

          this.empName = localStorage.getItem('employeeName');

          if (this.activeDwr.length <= 0) {
            // this.role = localStorage.getItem('role');
            // to stop loading
            this.loading.next(false);
            this.isModalOpen = false;
            this.checkMultipleRoles();
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
      catch {
        this.logout();
      }
    }
    else {
      this.logout();
    }
  }

  checkMultipleRoles() {
    this.actualRoles = localStorage.getItem("actualRole");
    console.log("Actual Roles: ", this.actualRoles);

    try {
      if (this.actualRoles.includes(',')) {
        this.actualRoles = this.actualRoles.split(',');

        // User having multiple roles
        if (this.actualRoles.includes('Crew Chief')) {
          // User having multiple roles including Crew Chief
          this.showRoleDropdown = true;
          this.actualRoles = this.actualRoles.map((item) => {
            return { value: item };
          });

          this.actualRoles.push(
            {
              value: 'Crew Chief'
            },
            {
              value: 'Combine Operator'
            },
            {
              value: 'Cart Operator'
            },
            {
              value: 'Truck Driver'
            }
          );

          this.actualRoles = Object.values(this.actualRoles.reduce((acc, obj) => {
            acc[obj.value] = obj;
            return acc;
          }, {}));

          this.rolesDropdown = this.actualRoles;

        }
        else {
          // User having multiple roles other than Crew Chief
          this.showRoleDropdown = true;
          this.actualRoles = this.actualRoles.map((item) => {
            return { value: item };
          });

          this.rolesDropdown = this.actualRoles;
        }
      }
      else {
        // User having only one role
        if (this.actualRoles === 'Crew Chief') {
          // Role is Crew Cheif
          this.showRoleDropdown = true;

          this.rolesDropdown = [
            {
              value: 'Crew Chief'
            },
            {
              value: 'Combine Operator'
            },
            {
              value: 'Cart Operator'
            },
            {
              value: 'Truck Driver'
            }
          ]
        }
        else {
          // Some other role than Crew Chief
          localStorage.setItem("role", this.actualRoles);
          this.role = this.actualRoles;
          this.showRoleDropdown = false;
        }
      }
    }
    catch {
      this.logout();
    }
  }

  async logout() {
    await this.auth.logout();

    this.isOpen = false;
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
