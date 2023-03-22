import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TruckingService } from './../../../trucking.service';
import { ToastService } from './../../../../../../services/toast/toast.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {
  role;
  createFormTruckCommercial: FormGroup;

  @ViewChild('machineryInput') machineryInput: ElementRef;
  isMachinerySelected: any = true;
  machinery_search$ = new Subject();
  machinery_name: any = '';
  machinerySearchValue: any;
  allMachinery: Observable<any>;
  isDisabled: any = true;
  machineryUL: any = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  data: any;
  options: any;
  rateSheetImg: string[] = [];
  originDocs: string[] = [];
  customDocs: string[] = [];

  constructor(private toast: ToastService, private truckingService: TruckingService, private activeRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private renderer: Renderer2) {
    if (localStorage.getItem('role').includes('Truck Driver')) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]); // to clear array
          this.machineryUL = false; // to hide the UL
        }
      });
    }

    this.activeRoute.params.subscribe(ticket => {
      console.log(ticket);
      this.data = ticket;
    })
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.machinerySearchSubscription();

    this.createFormTruckCommercial = this.formBuilder.group({
      ticketNo: [this.data.id],
      truckNo: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      originEmptyWeight: ['', [Validators.required]],
      originLoadedWeight: ['', [Validators.required]],
      originWeightLoad: ['', [Validators.required]],
      destinationEndingOdometerReading: ['', [Validators.required]],
      destinationLoadedWeight: ['', [Validators.required]],
      destinationEmptyWeight: ['', [Validators.required]],
      weightLoad: ['', [Validators.required]],
      scaleTicket: ['', [Validators.required]],
      destinationDeliveryLoad: ['', [Validators.required]],
      totalTripMiles: ['12'],
      deadHeadMiles: ['34'],
      totalJobMiles: ['56'],
      truckDriverNotes: [''],
    });
  }

  chooseImage(event) {
    if (event.target.name === 'rateSheet') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.rateSheetImg.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    else if (event.target.name === 'originDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.originDocs.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    if (event.target.name === 'customDocs') {
      for (let i = 0; i < event.target.files.length; i++) {
        this.customDocs.push(URL.createObjectURL(event.target.files[i]));
      }
    }
  }
  navigateTo(nav: string) {
    this.truckingService.updateDeliveryTicket({ ticketNo: this.data.id }, 'verified')
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.toast.presentToast("Delivery ticket has been Verified!", 'success');
            this.router.navigateByUrl(nav);
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

  submitExistingTicket() {
    console.log(this.createFormTruckCommercial.value);
    this.createFormTruckCommercial.value.isTicketInfoCompleted = true;
    this.truckingService.updateDeliveryTicket(this.createFormTruckCommercial.value, 'sent')
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.toast.presentToast("Delivery ticket has been Updated!", 'success');
            this.router.navigateByUrl('/tabs/home/trucking/commercial');
          }
        },
        (err) => {
          this.toast.presentToast(err, 'danger');
        },
      );
  }

  //#region Machinery
  machinerySearchSubscription() {
    this.machinery_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isMachinerySelected = true; }
        this.allMachinery = this.truckingService.getTruck(
          value,
          'allMotorizedVehicles'
        );

        // subscribing to show/hide Field UL
        this.allMachinery.subscribe((machinery) => {
          if (machinery.count === 0) {
            // hiding UL
            this.machineryUL = false;
          } else {
            // showing UL
            this.machineryUL = true;
          }
        });
      });
  }

  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machinery_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machinerySearchValue = v;
      });

    const value =
      this.machinerySearchValue === undefined
        ? this.machinery_name
        : this.machinerySearchValue;

    // calling API
    this.allMachinery = this.truckingService.getTruck(
      value,
      'allMotorizedVehicles'
    );

    // subscribing to show/hide farm UL
    this.allMachinery.subscribe((machinery) => {

      if (machinery.count === 0) {
        // hiding UL
        this.machineryUL = false;
      } else {
        // showing UL
        this.machineryUL = true;
      }
    });
  }
  listClickedMachinery(machinery) {

    // hiding UL
    this.machineryUL = false;
    console.log(machinery);

    // assigning values in form
    this.createFormTruckCommercial.patchValue({
      truckNo: machinery.id,
    });
    // clearing array
    this.allMachinery = of([]);

    // For Specific Fields

    // passing name in select's input
    this.machineryInput.nativeElement.value = machinery.id;

    // to enable submit button
    this.isMachinerySelected = false;
  }
  //#endregion

  disableFields() {
    this.isDisabled = true;
  }

}
