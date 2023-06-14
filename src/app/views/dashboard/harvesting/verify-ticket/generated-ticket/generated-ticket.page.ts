/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HarvestingService } from './../../harvesting.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-generated-ticket',
  templateUrl: './generated-ticket.page.html',
  styleUrls: ['./generated-ticket.page.scss'],
})
export class GeneratedTicketPage implements OnInit {
  @ViewChild('machineryInput') machineryInput: ElementRef;
  // machinery variables
  allMachinery: Observable<any>;
  machine_search$ = new Subject();
  machine_name: any = '';
  machineSearchValue: any = '';
  machineUL: any = false;
  isMachineSelected: any = true;
  selectedMachinery: any;


  role: any;
  generateTicketFormTruck: FormGroup;
  editTicketForm: FormGroup;
  ticketID: any;
  ticketName: any;
  slCheck: any;
  ticket: any;
  // ticket data
  ticketData: any;

  //loaders
  isLoadingTicket$;

  // isLoadingKartTicket: boolean;
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  ticketSub;
  fieldPivot; //field/pivot
  fieldPivotSL; //field/pivot-sl
  isEditModalOpen = false;


  public loadingSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private renderer: Renderer2,
  ) {
    if (localStorage.getItem('role').includes('Truck Driver')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]);
          this.machineUL = false; // to hide the UL
        }
      });
    }
  }

  async ionViewDidLeave() {
    this.DataDestroy();
  }

  DataDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    this.initForm();
    this.machineSearchSubscription();

    this.ticket = JSON.parse(this.router.getCurrentNavigation().extras.state?.ticket);

    console.log('Ticket: ', this.ticket);

    this.ticketID = this.ticket.id;
    this.ticketName = this.ticket.delivery_ticket_name;
    this.slCheck = this.ticket.split_load_check;
    this.fieldPivot = this.ticket.field_name;
    this.fieldPivotSL = this.ticket.sl_field_name == undefined ? '' : this.ticket.sl_field_name;

    if (this.ticket) {
      this.generateTicketFormTruck.patchValue({
        ticketId: this.ticket.id,
        fieldId: this.ticket.field_id,
        destination: this.ticket.destination,
        farmId: this.ticket.farm_id,
        cropName: this.ticket.crop_name,
        farmers_bin_weight_initial : (this.ticket.farmers_bin_weight == undefined || this.ticket.farmers_bin_weight == "") ? "" : this.ticket.farmers_bin_weight,
        farmers_bin_weight : (this.ticket.farmers_bin_weight == undefined || this.ticket.farmers_bin_weight == "") ? "" : this.ticket.farmers_bin_weight,
      });
    }

    if (this.role.includes('Truck Driver')) {
      this.initApis();
      this.initObservables();
    } else {
      // this.initKartApis();
      // this.initKartObservables();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  initForm() {
    this.generateTicketFormTruck = this.formBuilder.group({
      scaleTicket: ['', [Validators.required]],
      NetWeight: [0, [Validators.required]],
      NetWeight2: [0, [Validators.required]],
      testWeight: [''],
      proteinContent: [''],
      moistureContent: [''],
      ticketId: [''],
      fieldId: [''],
      destination: [''],
      farmId: [''],
      cropName: [''],
      scale_ticket_docs: [''],
      scale_ticket_weight_docs: [''],
      status: ['pending'],
      image_1: [''],
      image_2: ['', [Validators.required]],
      machineryId: ['', [Validators.required]],
      farmers_bin_weight_initial: [{value:'',disabled:true}],
      farmers_bin_weight: ['', [Validators.required]],
    });

    this.generateTicketFormTruck.valueChanges.subscribe((value) => {
      if (value.NetWeight !== value.NetWeight2) {
        this.generateTicketFormTruck
          .get('NetWeight')
          .setErrors({ mustMatch: true });
        this.generateTicketFormTruck
          .get('NetWeight2')
          .setErrors({ mustMatch: true });
      } else {
        this.generateTicketFormTruck.get('NetWeight').setErrors(null);
        this.generateTicketFormTruck.get('NetWeight2').setErrors(null);
      }

      // custom validation for 'farmers_bin_weight'

      if( value.farmers_bin_weight!=null && value.farmers_bin_weight == this.generateTicketFormTruck.get('farmers_bin_weight_initial').value){
        this.generateTicketFormTruck.get('farmers_bin_weight').setErrors(null);
      }else{
        this.generateTicketFormTruck.get('farmers_bin_weight').setErrors({ mustMatch: true })
      }

      if(value.farmers_bin_weight == null){
        this.generateTicketFormTruck.get('farmers_bin_weight').setErrors({ required: true })
      }

      if(this.generateTicketFormTruck.get('farmers_bin_weight_initial').value == ""){
        this.generateTicketFormTruck.get('farmers_bin_weight').setErrors(null);
        this.generateTicketFormTruck.controls['farmers_bin_weight'].disable();

      }
    });

    this.editTicketForm = this.formBuilder.group({
      ticket_id: [''],
      net_weight: [''],
      moisture_content: [''],
      protein_content: [''],
      test_weight:[''],
      scale_ticket:[''],
      operation:['updateTicketInfo']
    });

  }

  goBack() {
    this.location.back();
  }

  onSelectedFiles(file, name) {

    if (name === 'upload_2') {
      this.upload_2 = !this.upload_2;
      if (file.target.files && file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.generateTicketFormTruck.controls.image_2?.setValue(
            file.target.files[0]
          );
        };
        reader.readAsDataURL(file.target.files[0]);
      } else {
      }
    }
  }

  initApis() {
    this.harvestingService.getTicketById(this.ticketID, 'verify-ticket-truck');
  }

  initObservables() {
    this.harvestingService.ticket$.subscribe((res) => {
      console.log('Res:', res);
      this.ticketData = res;
    });

    this.isLoadingTicket$ = this.harvestingService.ticketLoading$;
  }

  submit() {
    if (this.role.includes('Truck Driver')) {
      // Form Data
      const formData: FormData = new FormData();
      formData.append(
        'generateTicketFormTruck',
        JSON.stringify(this.generateTicketFormTruck.value)
      );
      formData.append('operation', 'completeTicket');

      formData.append(
        'image_2',
        this.generateTicketFormTruck.get('image_2').value
      );
      console.log(this.generateTicketFormTruck.value);
      console.log(formData);

      this.loadingSpinner.next(true);
      this.harvestingService.truckDriverCompleteTicket(formData).subscribe(
        (response: any) => {
          console.log('Response', response);
          if (response.status === 200) {

            //stop loader
            this.loadingSpinner.next(false);

            // reset
            this.generateTicketFormTruck.reset();
            this.fieldPivot = '';
            this.fieldPivotSL = '';

            // navigate
            this.router.navigate(['/tabs/home/harvesting/verify-ticket']);

            //toast
            this.toastService.presentToast(response.message, 'success');
          } else {
            console.log('Something happened :)');
            this.loadingSpinner.next(false);
            this.toastService.presentToast(response.message, 'danger');
          }
        },
        (err) => {
          this.toastService.presentToast(err, 'danger');
          this.loadingSpinner.next(false);
          console.log('Error:', err);
        }
      );
    } else {
      const formData: FormData = new FormData();
      formData.append(
        'generateTicketFormTruck',
        JSON.stringify(this.generateTicketFormTruck.value)
      );
      formData.append('operation', 'verifyTicket');
      formData.append('ticketId', this.ticket.id);
      this.loadingSpinner.next(true);
      this.harvestingService.kartOperatorVerifyTickets(formData).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.loadingSpinner.next(false);

            this.toastService.presentToast(res.message, 'success');

            // navigating
            this.router.navigateByUrl('/tabs/home/harvesting/verify-ticket');
          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
          }
        },
        (err) => {
          this.toastService.presentToast(err, 'danger');
          console.log('Error:', err);
          this.loadingSpinner.next(false);

        }
      );
    }
  }
  async ionModalDidDismiss() {
    this.isEditModalOpen = false;
  }

  openModal() {
    this.isEditModalOpen = true;
    this.editTicketForm.patchValue({
      ticket_id: this.ticket.id,
      net_weight: this.ticket.scale_ticket_net_weight,
      moisture_content: this.ticket.moisture_content,
      protein_content: this.ticket.protein_content,
      test_weight: this.ticket.test_weight,
      scale_ticket: this.ticket.scale_ticket_number
    });
  }

  updateTicketInfo() {
    this.loadingSpinner.next(true);
    this.harvestingService.reAssignTruckDrivers(this.editTicketForm.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            // stop loader
            this.loadingSpinner.next(false);

            // clode modal
            this.isEditModalOpen = false;

            this.ticket.scale_ticket_net_weight = this.editTicketForm.get('net_weight').value;
            this.ticket.moisture_content = this.editTicketForm.get('moisture_content').value;
            this.ticket.protein_content = this.editTicketForm.get('protein_content').value;
            this.ticket.test_weight = this.editTicketForm.get('test_weight').value;
            this.ticket.scale_ticket_number = this.editTicketForm.get('scale_ticket').value;
            // navigation
          } else {
            console.log('Something happened :)');
            this.loadingSpinner.next(false);

          }
        },
        (err) => {
          console.log('Error:', err);
          this.loadingSpinner.next(false);

        },
      );
  }

  //#region Machinery
  machineSearchSubscription() {
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.machineSearchValue = value;
        // for asterik to look required
        if (value === '') {
          this.isMachineSelected = true;
        }

        if (this.role.includes('Truck Driver')) {
          this.allMachinery = this.harvestingService.getMachinery(
            value,
            'allMotorizedVehicles',
            'Truck IFTA'
          );
        }

        // subscribing to show/hide machine UL
        this.allMachinery.subscribe((machine) => {
          if (machine.count === 0) {
            // hiding UL
            this.machineUL = false;
            this.isMachineSelected = true;
          } else {
            this.machineUL = true;
          }
        });
      });
  }

  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machineSearchValue = v;
      });

    const value =
      this.machineSearchValue === undefined
        ? this.machine_name
        : this.machineSearchValue;

    // calling API

    if (this.role.includes('Truck Driver')) {
      this.allMachinery = this.harvestingService.getMachinery(
        value,
        'allMotorizedVehicles',
        'Truck IFTA'
      );
    }

    // subscribing to show/hide field UL
    this.allMachinery.subscribe((machinery) => {
      console.log('--', machinery);
      if (machinery.count === 0) {
        // hiding UL
        this.machineUL = false;
      } else {
        // showing UL
        this.machineUL = true;
      }
    });
  }

  listClickedMachiney(machinery) {
    console.log('Machinery Object:', machinery);
    // hiding UL
    this.machineUL = false;

    //selected machinery
    this.selectedMachinery = machinery;

    // passing name in select's input
    this.machineryInput.nativeElement.value = machinery.name;

    // to enable submit button
    this.isMachineSelected = false;

    // assigning values in form conditionally
    if (this.role.includes('Truck Driver')) {
      this.generateTicketFormTruck.patchValue({
        machineryId: machinery.id
      });
    }

    // clearing array
    this.allMachinery = of([]);
  }
  //#endregion

}
