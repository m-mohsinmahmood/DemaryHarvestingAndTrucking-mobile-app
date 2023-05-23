import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TripCheckService } from '../trip-check-form.service';
@Component({
  selector: 'app-pre-trip-form',
  templateUrl: './pre-trip-form.page.html',
  styleUrls: ['./pre-trip-form.page.scss'],
})
export class PreTripFormPage implements OnInit {

  role = '';
  employeeId = '';

  @ViewChild('trailerInput') trailerInput: ElementRef;
  isTrailerSelected: any = true;
  trailer_search$ = new Subject();
  trailer_name: any = '';
  trailerSearchValue: any;
  allTrailer: Observable<any>;
  trailerUL: any = false;
  data: Observable<any>;
  truckNo = '';
  trailerNo;

  buffer = 1;
  progress = 0;
  items = [];
  selectAray: any[] = [
    'Engine/Compartment',
    'In Cab',
    'Vehicle/External',
    'Brakes, Coupling',
    'Trailer'
  ];
  d = -1;
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  isDisabled: any = true;
  dataLoaded = false;
  preCheckForm: FormGroup;
  activeTicket;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private tripCheckFormService: TripCheckService,
    private activeRoute: ActivatedRoute
  ) {
    {
      this.renderer.listen('window', 'click', (e) => {
        if (this.d === 0) {
          if (e.target !== this.trailerInput.nativeElement) {
            this.allTrailer = of([]); // to clear array
            this.trailerUL = false; // to hide the UL
          }
        }
      });
    }
  }

  ngOnInit() {
    this.initDataFetch();
  }

  async ionViewDidEnter() {
    this.initDataFetch();
  }

  initDataFetch() {
    this.activeRoute.params.subscribe(params => {
      this.activeTicket = params;
      this.truckNo = params.truck_id;
      console.log(params);

    })
    this.data = this.tripCheckFormService.getActivePreCheckTicket('getTicketStatus', localStorage.getItem('employeeId'));

    this.data.subscribe((workOrders) => {
      this.data = workOrders;
      this.d = workOrders.count;
      this.dataLoaded = true;
      console.log(this.d);

    });

    if (this.data) {
      this.data.subscribe(param => {

        this.items = [
          { content: 'Engine/Compartment', status: 'in-complete', active: true, button: "Start" },
          { content: 'In Cab', status: 'in-complete', active: false, button: "Continue" },
          { content: 'Vehicle/External', status: 'in-complete', active: false, button: "Continue" },
          { content: 'Brakes, Coupling & Suspension', status: 'in-complete', active: false, button: "Continue" },
          { content: 'Trailer', status: 'in-complete', active: false, button: "Continue" },
        ];

        if (param.count === 0) {
          this.items[0].status = "active";
        } else {

          let tic = param.ticket[0];
          console.log(tic);

          if (tic.is_category1_completed) {
            this.reset();
            this.items[0].status = "complete";

            this.items[1].status = "active";
            this.items[1].active = true;
            this.progress = this.indexArray[0];
          }
          if (tic.is_category2_completed) {
            this.reset();
            this.items[0].status = "complete";
            this.items[1].status = "complete";

            this.items[2].status = "active";
            this.items[2].active = true;
            this.progress = this.indexArray[1];
          }
          if (tic.is_category3_completed) {
            this.reset();
            this.items[0].status = "complete";
            this.items[1].status = "complete";
            this.items[2].status = "complete";

            this.items[3].status = "active";
            this.items[3].active = true;
            this.progress = this.indexArray[2];
          }
          if (tic.is_category4_completed) {
            this.reset();
            this.items[0].status = "complete";
            this.items[1].status = "complete";
            this.items[2].status = "complete";
            this.items[3].status = "complete";

            this.items[4].status = "active";
            this.items[4].active = true;
            this.progress = this.indexArray[3];
          }
        }
      })
    }

    this.preCheckForm = this.formBuilder.group({
      truckID: [this.activeTicket.truck_id],
      trailerID: ['', Validators.required]
    });

    this.trailerSearchSubscription();

    this.role = localStorage.getItem('role');
    this.employeeId = localStorage.getItem('employeeId');
  }

  reset() {
    this.items.forEach(element => {
      element.status = "in-complete";
      element.active = false;
    });
  }

  navigateTo(navTo: string) {
    console.log(navTo);

    switch (navTo) {
      case 'Engine/Compartment':
        this.router.navigate(['engine-check', { truckNo: this.truckNo, trailerNo: this.trailerNo, deliveryTicketId: this.activeTicket.id }], { relativeTo: this.activeRoute });
        break;
      case 'In Cab':
        this.router.navigate(['in-cab', { truckNo: this.truckNo, trailerNo: this.trailerNo, deliveryTicketId: this.activeTicket.id }], { relativeTo: this.activeRoute });
        break;
      case 'Vehicle/External':
        this.router.navigate(['vehicle-external', { truckNo: this.truckNo, trailerNo: this.trailerNo, deliveryTicketId: this.activeTicket.id }], { relativeTo: this.activeRoute });
        break;
      case 'Brakes, Coupling & Suspension':
        this.router.navigate(['coupling', { truckNo: this.truckNo, trailerNo: this.trailerNo, deliveryTicketId: this.activeTicket.id }], { relativeTo: this.activeRoute });
        break;
      case 'Trailer':
        this.router.navigate(['trailer', { truckNo: this.truckNo, trailerNo: this.trailerNo, deliveryTicketId: this.activeTicket.id }], { relativeTo: this.activeRoute });
        break;
    }
  }

  //#region Trailer
  trailerSearchSubscription() {
    this.trailer_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // for asterik to look required
        if (value === '') { this.isTrailerSelected = true; }
        this.allTrailer = this.tripCheckFormService.getTrailer(
          value,
          'allNonMotorizedVehicles'
        );

        // subscribing to show/hide Field UL
        this.allTrailer.subscribe((trailer) => {
          if (trailer.count === 0) {
            // hiding UL
            this.trailerUL = false;
          } else {
            // showing UL
            this.trailerUL = true;
          }
        });
      });
  }

  inputClickedTrailer() {
    // getting the serch value to check if there's a value in input
    this.trailer_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.trailerSearchValue = v;
      });

    const value =
      this.trailerSearchValue === undefined
        ? this.trailer_name
        : this.trailerSearchValue;

    // calling API
    this.allTrailer = this.tripCheckFormService.getTrailer(
      value,
      'allNonMotorizedVehicles'
    );

    // subscribing to show/hide farm UL
    this.allTrailer.subscribe((trailer) => {

      if (trailer.count === 0) {
        // hiding UL
        this.trailerUL = false;
      } else {
        // showing UL
        this.trailerUL = true;
      }
    });
  }

  listClickedTrailer(trailer) {
    // hiding UL
    this.trailerUL = false;
    console.log(trailer);

    // assigning values in form
    this.trailerNo = trailer.id,
      // clearing array
      this.allTrailer = of([]);

    // For Specific Fields

    // passing name in select's input
    this.trailer_name = trailer.id;

    // to enable submit button
    this.isTrailerSelected = false;
  }
  //#endregion

  disableFields() {
    this.isDisabled = true;
  }
}
