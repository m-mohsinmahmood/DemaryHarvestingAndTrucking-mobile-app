import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  @ViewChild('machineryInput') machineryInput: ElementRef;
  isMachinerySelected: any = true;
  machinery_search$ = new Subject();
  machinery_name: any = '';
  machinerySearchValue: any;
  allMachinery: Observable<any>;
  isDisabled: any = true;
  machineryUL: any = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  verifyFormInHouseTruck: FormGroup;
  role = '';

  data;

  constructor(private toast: ToastService, private truckingService: TruckingService, private router: Router, private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private renderer: Renderer2) {
    if (localStorage.getItem('role') === 'truck-driver') {
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

    this.verifyFormInHouseTruck = this.formBuilder.group({
      ticketNo: [this.data.id],
      truckNo: ['', [Validators.required]],
      homeBeginingOdometerReading: ['', [Validators.required]],
      originBeginingOdometerReading: ['', [Validators.required]],
      destinationEndingOdometerReading: ['', [Validators.required]],
      totalTripMiles: ['', [Validators.required]],
      deadHeadMiles: ['', [Validators.required]],
      totalJobMiles: ['', [Validators.required]],
      truckDriverNotes: [''],
    });
  }

  navigateAfterVerify(nav: string) {
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

  navigateTruck() {
    console.log(this.verifyFormInHouseTruck.value);

    this.truckingService.updateDeliveryTicket(this.verifyFormInHouseTruck.value, 'pending')
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.toast.presentToast("Delivery ticket has been updated successfully!", 'success');
            this.router.navigateByUrl('/tabs/home/trucking/in-house')
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
    this.verifyFormInHouseTruck.patchValue({
      truckNo: machinery.id,
    });
    // clearing array
    this.allMachinery = of([]);

    // For Specific Fields

    // passing name in select's input
    this.machinery_name = machinery.id;

    // to enable submit button
    this.isMachinerySelected = false;
  }
  //#endregion

  disableFields() {
    this.isDisabled = true;
  }
}
