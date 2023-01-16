import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false;

  roleOptions = [
    'crew-chief',
    'kart-operator',
    'combine-operator',
    'truck-driver',
    'tractor-driver',
    'dispatcher',
  ];
  role = this.roleOptions[0];
  selectform: FormGroup;

  constructor(private formbuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    localStorage.setItem('role', this.role);

    this.selectform = this.formbuilder.group({
      select: [''],
    });
    this.selectform.get('select').setValue(this.roleOptions[0]);
    // this.selectform.controls.select.setValue(this.roleOptions[1]);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
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

    if (localStorage.getItem('role') === 'dispatcher')
      localStorage.setItem(
        'employeeId',
        '5254e1f7-bedf-4166-bba7-8a64892dc28e'
      );
    else if (localStorage.getItem('role') === 'truck-driver')
      localStorage.setItem(
        'employeeId',
        '00277ae0-9534-473a-afe8-c648aa0e6d9d'
      );
    else if (localStorage.getItem('role') === 'tractor-driver')
      localStorage.setItem(
        'employeeId',
        '2bf46542-d0bb-4ada-96e6-c103853c3f0d'
      );
  }
}
