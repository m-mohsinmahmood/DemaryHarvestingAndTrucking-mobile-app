import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generated-ticket',
  templateUrl: './generated-ticket.page.html',
  styleUrls: ['./generated-ticket.page.scss'],
})
export class GeneratedTicketPage implements OnInit {
role: any;
generateTicketFormTruck: FormGroup;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.generateTicketFormTruck = this.formBuilder.group({
      scaleTicket: ['',[Validators.required]],
      scaleTicketWeight: ['',[Validators.required]],
      testWeight: ['',[Validators.required]],
      proteinContent: ['',[Validators.required]],
      moistureContent: ['',[Validators.required]],
    });

  }
  goBack(){
    this.location.back();
  }
submit(){
  console.log(this.generateTicketFormTruck.value);
}
}
