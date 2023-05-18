/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-driver-setup',
  templateUrl: './driver-setup.page.html',
  styleUrls: ['./driver-setup.page.scss'],
})
export class DriverSetupPage implements OnInit {
  driverSetupForm: FormGroup;

  @ViewChild('driverInput') driverInput: ElementRef;

  truck_driver_search$ = new Subject();
  isTruckDriverSelected: any = true;
  add_location_overlay = true;

  driver_name: any = '';
  allDriversDropdown: Observable<any>;
  driverSearchValue: any = '';
  driverUL: any = false;
  allTruckDrivers: Observable<any>;
  deleteId;

  getAllDrivers;
  job_id;
  customerJobSetupLoading2: any
  data: any;
  public loadingSpinner = new BehaviorSubject(false);
  public deleteSpinner = new BehaviorSubject(false);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private harvestingService: HarvestingService,
    private toastService: ToastService
  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.driverInput.nativeElement) {
        this.driverUL = false;
      }
    });
  }

  ngOnInit() {
    this.driverSetupForm = this.formBuilder.group({
      truck_driver: ['', [Validators.required]],
    });

    this.getKartOperatorTruckDrivers();

    this.combineSearchSubscription();

    this.initObservables()
  }

  async ionViewDidEnter() {
    this.getKartOperatorTruckDrivers();
  }

  getKartOperatorTruckDrivers() {
    this.harvestingService
      .getKartOperatorTruckDrivers(
        'kartOperatorTruckDrivers',
        localStorage.getItem('employeeId'),
        ''
      )
      .subscribe(
        (res: any) => {
          this.getAllDrivers = res;
        },
        (err) => {
          console.log('Error:', err);
        }
      );
  }

  //#region comnine
  combineSearchSubscription() {
    this.truck_driver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.driverSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isTruckDriverSelected = true;
        }

        // calling API
        this.allTruckDrivers =
          this.harvestingService.getCombineCartOperator(
            this.driverSearchValue,
            'getCombineCartOperator',
            'Truck Driver'
          );

        // subscribing to show/hide field UL
        this.allTruckDrivers.subscribe((truckDrivers) => {

          if (truckDrivers.length === 0) {
            // hiding UL
            this.driverUL = false;
            this.isTruckDriverSelected = true;

          } else {
            this.driverUL = true;
          }
        });
      });
  }

  goBack() {
    this.location.back();
  }

  addTruckDriver() {
    this.initObservables()
    let raw = {
      driverIds: this.driverSetupForm.get('truck_driver').value,
      kartOperatorId: localStorage.getItem('employeeId'),
      operation: 'addTruckDrivers'
    };

    console.log(raw);
    this.loadingSpinner.next(true);

    this.harvestingService
      .kartOperatorAddTruckDriver('addTruckDrivers', raw)
      .subscribe(
        (response: any) => {
          console.log(response);
          // clearing truck input
          this.driverInput.nativeElement.value = '';
          this.driver_name = '';

          // to look asterik
          this.isTruckDriverSelected = true;

          // toast
          this.toastService.presentToast(response.message, 'success');

          // stop loader
          this.loadingSpinner.next(false);
        },
        (err) => {
          console.log('Error:', err);
          this.loadingSpinner.next(false);
        },
        () => {
          this.getKartOperatorTruckDrivers();
        }
      );
  }

  initObservables() {
    this.customerJobSetupLoading2 = this.harvestingService.customerJobSetupLoading2$;
    this.harvestingService.customerJobSetup2$.subscribe(res => {

      this.data = res;

      this.customerJobSetupLoading2.subscribe((loadValue) => {
        if (loadValue === true) {

        } else {
          console.log("param: ", res);

          this.job_id = this?.data?.customer_job[0]?.id;
          console.log(this.job_id);

        }
      })
    })
  }


  clickedTruckDriverInput() {
    this.truck_driver_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((val) => {
        this.driverSearchValue = val;
      });

    const value =
      this.driverSearchValue === undefined
        ? this.driver_name
        : this.driverSearchValue;

    // calling API
    this.allTruckDrivers =
      this.harvestingService.getCombineCartOperator(
        this.driverSearchValue,
        'getCombineCartOperator',
        'Truck Driver'
      );

    this.allTruckDrivers.subscribe((driver) => {
      console.log('--', driver);
      if (driver.length === 0) {
        this.driverUL = false;
        this.isTruckDriverSelected = true;
      } else {
        this.driverUL = true;
      }
    });
  }

  removeCrewMember(id) {
    this.deleteId = id;
    const data = {
      id,
      operation: 'removeAssignedRole'
    };

    // start loader
    this.deleteSpinner.next(true);

    this.harvestingService.removeAssignedRole(data).subscribe((res: any) => {
      if (res.status === 200) {
        this.toastService.presentToast(res.message, 'success');
        // this.deleteSpinner.next(false);
        this.getKartOperatorTruckDrivers();
        this.removeTruckDriverFromAssignedRoles(id);

      } else {
        console.log('Something happened :)');
        this.deleteSpinner.next(false);
      }
    },
      (err) => {
        console.log('Error:', err);
        this.deleteSpinner.next(false);
        // this.handleError(err);
      },
      () => {
        this.getKartOperatorTruckDrivers();
      }
    );
  }

  removeTruckDriverFromAssignedRoles(id) {
    const removeData = {
      driverIds: id,
      kartOperatorId: localStorage.getItem("employeeId"),
      operation: 'deleteAssignedRolesJobs'
    };

    this.harvestingService.deleteAssignedRole(removeData).subscribe((res: any) => {
      if (res.status === 200) {
        this.toastService.presentToast(res.message, 'success');
        this.deleteSpinner.next(false);
        this.getKartOperatorTruckDrivers();

      } else {
        console.log('Something happened :)');
        this.deleteSpinner.next(false);
      }
    },
      (err) => {
        console.log('Error:', err);
        this.deleteSpinner.next(false);
        // this.handleError(err);
      },
      () => {
        this.getKartOperatorTruckDrivers();
      }
    );
  }

  selectedDriver(driver) {
    console.log(driver);

    this.driverUL = false;
    this.driverInput.nativeElement.value = driver.first_name + ' ' + driver.last_name;
    this.isTruckDriverSelected = false;
    this.driverSetupForm.controls['truck_driver'].setValue(driver.id ?? '');
  }
}
