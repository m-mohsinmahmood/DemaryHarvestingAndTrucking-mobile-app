import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HarvestingService } from '../../../harvesting/harvesting.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-generated-ticket',
  templateUrl: './generated-ticket.page.html',
  styleUrls: ['./generated-ticket.page.scss'],
})
export class GeneratedTicketPage implements OnInit {

  public loadingSpinner = new BehaviorSubject(false);
  role: any;
  generateTicketFormTruck: FormGroup;

  // machinery variables
  @ViewChild('machineryInput') machineryInput: ElementRef;
  allMachinery: Observable<any>;
  machine_search$ = new Subject();
  machine_name: any = '';
  machineSearchValue: any = '';
  machineUL: any = false;
  isMachineSelected: any = true;
  selectedMachinery: any;

  ticket: any;
  isGuestUser = 'false';

  ticketID: any;
  ticketName: any;
  slCheck: any;

  field_name: any = '';
  destination_name: any = '';

  fieldPivot;
  fieldPivotSL;

  uploaded = false;
  upload_2 = false;
  upload_2_url;

  isLoadingTicket$;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private harvestingService: HarvestingService,
    private toastService: ToastService,
    private renderer: Renderer2,
    private sessionService: AuthService,
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
    this.isGuestUser = localStorage.getItem('is_guest_user');

    this.initForm();
    if (localStorage.getItem('role').includes('Truck Driver')) {
      this.machineSearchSubscription();
    }

    this.ticket = JSON.parse(this.router.getCurrentNavigation().extras.state?.ticket);

    this.ticketID = this.ticket.id;
    this.ticketName = this.ticket.delivery_ticket_name;
    this.slCheck = this.ticket.split_load_check;
    this.fieldPivot = this.ticket.field_name;
    this.field_name = this.ticket.field_name;
    this.destination_name = this.ticket.destination;
    this.fieldPivotSL = this.ticket.sl_field_name == undefined ? '' : this.ticket.sl_field_name;

    if (this.ticket) {
      this.generateTicketFormTruck.patchValue({
        ticketId: this.ticket.id,
        fieldId: this.ticket.field_id,
        destinationId: this.ticket.destinationid,
        destination: this.ticket.destination,
        farmId: this.ticket.farm_id,
        cropName: this.ticket.crop_name,
        farmers_bin_weight_initial: (this.ticket.farmers_bin_weight == undefined || this.ticket.farmers_bin_weight == "") ? "" : this.ticket.farmers_bin_weight,
        farmers_bin_weight: (this.ticket.farmers_bin_weight == undefined || this.ticket.farmers_bin_weight == "") ? "" : this.ticket.farmers_bin_weight,
      });

      this.sessionService.getEmployeeByFirebaseId(localStorage.getItem('fb_id')).subscribe((res) => {
        if (res.truck_id) {
          console.log("Truck :", res.truck_id);

          this.allMachinery = this.harvestingService.getMachinery(
            '',
            'allMotorizedVehicles',
            'Truck IFTA'
          );
          this.machineUL = false;
          this.allMachinery.subscribe((machinery) => {
            for (let t of machinery.machinery) {
              if (t.id == res.truck_id) {
                this.listClickedMachiney(t)
              }
            }
          });

        }
      })
    }

    if (this.role.includes('Truck Driver')) {
      this.initObservables();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  initForm() {
    this.generateTicketFormTruck = this.formBuilder.group({
      truckDriverId: [localStorage.getItem('employeeId')],
      scaleTicket: ['', [Validators.required]],
      NetWeight: ['', [Validators.required]],
      NetWeight2: ['', [Validators.required]],
      testWeight: [''],
      proteinContent: [''],
      moistureContent: [''],
      ticketId: [''],
      fieldId: [''],
      destinationId: [''],
      destination: [''],
      farmId: [''],
      cropName: [''],
      scale_ticket_docs: [''],
      scale_ticket_weight_docs: [''],
      status: ['pending'],
      image_1: [''],
      image_2: ['', [Validators.required]],
      machineryId: ['', [Validators.required]],
      farmers_bin_weight_initial: [{ value: '', disabled: true }],
      farmers_bin_weight: ['', [Validators.required]],
    });

    this.generateTicketFormTruck.valueChanges.subscribe((value) => {

      if (this.generateTicketFormTruck.get('farmers_bin_weight_initial').value != '') {

        //remove required validations for Delivery/Scale Ticket 'Net' Weight
        this.generateTicketFormTruck.get('NetWeight').setValidators(null);
        this.generateTicketFormTruck.get('NetWeight2').setValidators(null);

        //custom validations Farmers Bin Weight
        if (value.farmers_bin_weight == '' || value.farmers_bin_weight == null) {
          this.generateTicketFormTruck.get('farmers_bin_weight').setErrors({ required: true });
        } else {
          if (value.farmers_bin_weight == this.generateTicketFormTruck.get('farmers_bin_weight_initial').value) {
            this.generateTicketFormTruck.get('farmers_bin_weight').setErrors(null);
          } else {
            this.generateTicketFormTruck.get('farmers_bin_weight').setErrors({ mustMatch: true });
          }
        }
      } else {

        //remove required validations for Farmers Bin Weight
        this.generateTicketFormTruck.get('farmers_bin_weight').setValidators(null);

        //custom validations Delivery/Scale Ticket 'Net' Weight
        if (value.NetWeight == '' && value.NetWeight2 == '') {
          this.generateTicketFormTruck.get('NetWeight').setErrors({ required: true });
          this.generateTicketFormTruck.get('NetWeight2').setErrors({ required: true });
        } else if (value.NetWeight != '' && value.NetWeight2 == '') {
          this.generateTicketFormTruck.get('NetWeight').setErrors(null);
          this.generateTicketFormTruck.get('NetWeight2').setErrors({ required: true });
        } else if (value.NetWeight == '' && value.NetWeight2 != '') {
          this.generateTicketFormTruck.get('NetWeight').setErrors({ required: true });
          this.generateTicketFormTruck.get('NetWeight2').setErrors({ mustMatch: true });
        } else {
          if (value.NetWeight == value.NetWeight2) {
            this.generateTicketFormTruck.get('NetWeight').setErrors(null);
            this.generateTicketFormTruck.get('NetWeight2').setErrors(null);
          } else {
            this.generateTicketFormTruck.get('NetWeight2').setErrors({ mustMatch: true });
          }
        }
      }
    });
  }

  onSelectedFiles(file, name) {
    if (name === 'upload_2') {
      if (file.target.files && file.target.files[0]) {
        const uploadedFile = file.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (allowedTypes.includes(uploadedFile.type)) {
          const reader = new FileReader();

          this.upload_2 = !this.upload_2;
          this.uploaded = true;
          reader.onload = (_event: any) => {
            this.generateTicketFormTruck.controls.image_2?.setValue(uploadedFile);
            this.upload_2_url = reader.result;
            this.toastService.presentToast('Photo Uploaded!', 'success');
          };
          reader.readAsDataURL(uploadedFile);
        } else {
          // Display an error message or take appropriate action for invalid file types
          this.uploaded = false;
          this.upload_2 = null;
          this.upload_2_url = null;
          this.generateTicketFormTruck.controls.image_2?.setValue('');
          this.toastService.presentToast('Invalid file type. Please upload a JPEG or PNG image.', 'danger');
        }
      }
    }
  }

  initObservables() {
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
          if (response.status === 200) {

            //stop loader
            this.loadingSpinner.next(false);

            // reset
            this.generateTicketFormTruck.reset();
            this.fieldPivot = '';
            this.fieldPivotSL = '';

            // navigate
            this.router.navigate(['/tabs/home/harvesting-guest/complete-delivery-ticket']);

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
    }
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
