/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HarvestingService } from '../../harvesting.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {
  @ViewChild('jobInput') jobInput: ElementRef;
  detailsForm: FormGroup;

  // job variables
  allJobs: Observable<any>;
  job_search$ = new Subject();
  job_name: any = '';
  jobSearchValue: any = '';
  jobUL: any = false;
  isJobSelected: any = true;
  active_check_in_id;
  role;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private harvestingService: HarvestingService,

  ) {
    this.renderer.listen('window', 'click', (e) => {
       if (e.target !== this.jobInput.nativeElement) {
        this.allJobs = of([]);
        this.jobUL = false; // to hide the UL
      }
    });

  }

  ngOnInit() {
    this.role = localStorage.getItem('role');

    // job subscription
    this.jobSearchSubscription();
  }

  //#region job
  jobSearchSubscription() {
    this.job_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {

        // passing for renderer2
        this.jobSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isJobSelected = true;
        }

        // calling API
        this.allJobs = this.harvestingService.getInvoicedJobs(
          'getInvoicedJobs',
          this.role,
          localStorage.getItem('employeeId')
        );

        // subscribing to show/hide machine UL
        this.allJobs.subscribe((job) => {
          if (job.count === 0) {

            this.jobUL = false; // hiding UL
            this.isJobSelected = true; // for asterik to look required
          } else {
            this.jobUL = true; // hiding UL
          }
        });
      });
  }
  inputClickedJob() {
    // getting the serch value to check if there's a value in input
    this.job_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.jobSearchValue = v;
      });

    const value =
      this.jobSearchValue === undefined
        ? this.job_name
        : this.jobSearchValue;

    // calling API
    this.allJobs = this.harvestingService.getInvoicedJobs(
      'getInvoicedJobs',
      this.role,
      localStorage.getItem('employeeId')
    );

    // subscribing to show/hide field UL
    this.allJobs.subscribe((job) => {
      console.log(job);
      if (job.count === 0) {
        // hiding UL
        this.jobUL = false;
      } else {
        // showing UL
        this.jobUL = true;
      }
    });
  }
  listClickedJob(job) {
    console.log(job);
    // hiding UL
    this.jobUL = false;

    // patching for Cart Operator
    // else if (localStorage.getItem('role').includes('Truck Driver')) {
      // this.startJobFormTruck.patchValue({
      //   jobId: job.job_id,
      //   crop_id: job.crop_id,
      //   customer_id: job.customer_id,
      //   farm_id: job.farm_id,
      //   state: job.state,
      //   crew_chief_id: job.crew_chief_id,
      //   workOrderId: job.job_id
      // });
    // }

    // this.customerName = job.customer_name;
    // this.state = job.state;
    // this.farm = job.farm_name;
    // this.crop = job.crop_name;
    // this.date = job.created_at;
    // this.crewChiefName = job.crew_chief_name;

    // passing name in select's input
    this.jobInput.nativeElement.value = job.job_id;

    // passing name in job-search-value in Rendered2 for checks
    this.jobSearchValue = job.customer_name;

    // to enable submit button
    this.isJobSelected = false;

  }
  //#endregion

}
