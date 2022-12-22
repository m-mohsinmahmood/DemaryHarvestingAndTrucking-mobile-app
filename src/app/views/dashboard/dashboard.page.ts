import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  roleOptions = ['crew-chief','kart-operator','combine-operator','truck-driver','tractor-driver','dispatcher'];
role = this.roleOptions[1];
selectform: FormGroup;

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    localStorage.setItem('role',this.role);
    this.selectform = this.formbuilder.group({
      select: ['']
    });
    this.selectform.get('select').setValue(this.roleOptions[0]);
    // this.selectform.controls.select.setValue(this.roleOptions[1]);

  }
onSelect(e){
console.log(e.target.value);
localStorage.setItem('role',e.target.value);
// assigning role
this.role = e.target.value;
// this.selectform.get('select').setValue(e.target.value);

}
}
