/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckInOutService } from './../../components/check-in-out/check-in-out.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;

  roleOptions = ['crew-chief', 'kart-operator', 'combine-operator', 'truck-driver', 'tractor-driver', 'dispatcher'];
  role = this.roleOptions[0];
  // role;
  selectform: FormGroup;
  activeDwr: any;
  isModalOpen = false;

  constructor(
    private formbuilder: FormBuilder,
    private dwrServices: CheckInOutService,
    private nav: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initDataRetrieval();
    console.log('On-INIT');
  }

  async ionViewDidEnter() {
    this.initDataRetrieval();
    console.log('ionViewDidEnter');
  }
  async ionViewWillEnter(){
    this.initDataRetrieval();
    console.log('ionViewWillEnter');
  }

  initDataRetrieval() {
    // assigning role & employeeId
    this.isModalOpen = false;
    this.selectform = this.formbuilder.group({
      select: [''],
    });

    this.selectform.patchValue({ select: this.roleOptions[0] });
    // eslint-disable-next-line @typescript-eslint/quotes
    // console.log('-',localStorage.getItem("employeeId"));
    // console.log('--',localStorage.getItem('emp_id'));
    // console.log('---',localStorage.getItem('emp_role'));
    // console.log('-------',localStorage.getItem('emp_role').includes('Crew Chief'));
    // const role = localStorage.getItem('emp_role');
    // console.log(role.includes('Crew Chief'));
    // console.log(role.includes('Combine Operator'));
    // console.log(role.includes('Crew Chief') || role.includes('Combine Operator'));

    // assigning role
    // this.role = localStorage.getItem('role');

    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      console.log(workOrder.dwr);
      this.activeDwr = workOrder.dwr;

      if (this.activeDwr.length <= 0) {
        // localStorage.setItem('role', this.role);
        // localStorage.setItem('employeeId', '8920a566-453c-47f0-82dc-21e74196bb98');
        // localStorage.setItem('role', localStorage.getItem('role'));
        // localStorage.setItem('employeeId', localStorage.getItem('employeeId'));

      }
      else {
        this.isModalOpen = true;
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

    if (localStorage.getItem('role') === 'dispatcher') { localStorage.setItem('employeeId', '5254e1f7-bedf-4166-bba7-8a64892dc28e'); }
    else if (localStorage.getItem('role') === 'truck-driver') { localStorage.setItem('employeeId', '00277ae0-9534-473a-afe8-c648aa0e6d9d'); }
    else if (localStorage.getItem('role') === 'tractor-driver') { localStorage.setItem('employeeId', '2bf46542-d0bb-4ada-96e6-c103853c3f0d'); }
    else if (localStorage.getItem('role') === 'crew-chief') { localStorage.setItem('employeeId', '8920a566-453c-47f0-82dc-21e74196bb98'); }
    else if (localStorage.getItem('role') === 'combine-operator') { localStorage.setItem('employeeId', '3ac2db42-d0c1-4493-a0cf-b19deb834f46'); }
    else if (localStorage.getItem('role') === 'mechanic') { localStorage.setItem('employeeId', '4543344b-0b74-49a2-b3c7-d3884f5f0013'); }
    else if (localStorage.getItem('role') === 'supervisor') { localStorage.setItem('employeeId', '4543344b-0b74-49a2-b3c7-d388851f0013'); }
    else if (localStorage.getItem('role') === 'kart-operator') { localStorage.setItem('employeeId', 'f4cfa75b-7c14-4b68-a192-00d56c9f2022'); }
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  setOpen() {

    if (this.activeDwr[0].module === 'farming') {
      this.isModalOpen = false;
      console.log(this.isModalOpen);
      this.nav.navigate(['farming'], { relativeTo: this.activatedRoute });
    }
    else if (this.activeDwr[0].module === 'trucking') {
      this.isModalOpen = false;
      console.log(this.isModalOpen);
      this.nav.navigate(['trucking'], { relativeTo: this.activatedRoute });
    }
    else if (this.activeDwr[0].module === 'harvesting') {
      this.isModalOpen = false;
      console.log(this.isModalOpen);
      this.nav.navigate(['harvesting'], { relativeTo: this.activatedRoute });
    }
  }
}
