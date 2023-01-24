/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HarvestingService } from './../harvesting.service';

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

  getAllDrivers;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private harvestingService: HarvestingService
  ) {}

  ngOnInit() {
    this.driverSetupForm = this.formBuilder.group({
      truck_driver: ['', [Validators.required]],
    });

    this.getKartOperatorTruckDrivers();
  }

  async ionViewDidEnter() {
    this.getKartOperatorTruckDrivers();
  }

  getKartOperatorTruckDrivers() {
    this.harvestingService
      .getKartOperatorTruckDrivers(
        'kartOperatorTruckDrivers',
        'f4cfa75b-7c14-4b68-a192-00d56c9f2022'
      )
      .subscribe(
        (res: any) => {
          console.log('response:', res);
          this.getAllDrivers = res;
        },
        (err) => {
          console.log('Error:', err);
        }
      );
  }

  goBack() {
    this.location.back();
  }

  addTruckDriver() {
    let raw = JSON.stringify({
      driverIds: [this.driverSetupForm.value],
      kartOperatorId: 'f4cfa75b-7c14-4b68-a192-00d56c9f2022',
    });

    this.harvestingService
      .kartOperatorAddTruckDriver('addTruckDrivers', raw)
      .subscribe(
        (response: any) => {
          console.log('response:', response);
          this.getKartOperatorTruckDrivers();
        },
        (err) => {
          console.log('Error:', err);
        }
      );
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
      this.harvestingService.getKartOperatorTruckDriversDropdown(
        'truckDriversDropDown',
        value
      );

    this.allTruckDrivers.subscribe((driver) => {
      console.log('--', driver);
      if (driver.length === 0) {
        this.driverUL = false;
      } else {
        this.driverUL = true;
      }
    });
  }

  selectedDriver(driver) {
    this.driverUL = false;
    this.driver_name = driver.name;
    this.isTruckDriverSelected = false;
    this.driverSetupForm.controls['truck_driver'].setValue(driver.id ?? '');
    // this.allTruckDrivers = of([]);
  }
}
