import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
role: any;
isReassign: boolean;
// isSplitTrue = false;
isSplitTrue;
deliveryTicketForm: FormGroup;
  constructor(
    private location: Location,
    private router: Router,
    private formbuildr: FormBuilder
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.isReassign = this.router.getCurrentNavigation().extras.state.reassign;

    this.deliveryTicketForm = this.formbuildr.group({
      truckDriver: ['',[Validators.required]],
      destination: ['',[Validators.required]],
      loadedMiles: ['',[Validators.required]],
      field: ['',[Validators.required]],
      splitLoadCheck: ['false',[Validators.required]],
      kartScaleWeight: ['',[Validators.required]],
      deliveryTicketNumber: ['',[Validators.required]],
      kartoperatorName: ['',[Validators.required]],
      truckDriverCompany: ['',[Validators.required]],
      truck: ['',[Validators.required]],
      splitLoad: ['',[Validators.required]],
      kartScaleWeightSplit: ['',[Validators.required]],
      kartScaleWeightOptionalSplit: ['',[Validators.required]],
      fieldLoadSplit: ['',[Validators.required]],
      deliveryTicketNumberSplit: ['',[Validators.required]],
      kartoperatorNameSplit: ['',[Validators.required]],
      truckDriverCompanySplit: ['',[Validators.required]],
      truckSplit: ['',[Validators.required]],
    });

  }
  goBack(){
    this.location.back();
  }
  buttton(){
    this.isSplitTrue = !this.isSplitTrue;
  }
  submit(){
    console.log(this.deliveryTicketForm.value);
    this.router.navigateByUrl('/tabs/home/harvesting/ticket/generated-ticket');
  }
}
