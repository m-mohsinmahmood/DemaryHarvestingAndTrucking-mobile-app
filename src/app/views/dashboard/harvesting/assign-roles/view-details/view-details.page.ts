/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
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
  value = 'Combine Operator';
  jobId;
  data;
  combineOperatorCount = 0;
  cartOperatorCount = 0;

  public loadingSpinner = new BehaviorSubject(false);

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

    // passing JOB ID
    this.jobId = job.job_id;

    // passing name in select's input
    this.jobInput.nativeElement.value = job.job_id;

    this.getDetails();

  }
  //#endregion
  onClick(val: any) {
    if (val === 'Combine Operator') {
      this.value = 'Combine Operator';
      // this.getCombineOperators();
    } else {
      this.value = 'cart-operator';
      // this.getKartOPerators();
    }
  }

  getDetails() {
    this.loadingSpinner.next(true);
    this.harvestingService.getDetails(localStorage.getItem('employeeId'),this.jobId)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          // if (res.status === 200) {
            this.data = res.employees;

            this.combineOperatorCount = 0;
            this.cartOperatorCount = 0;

            // Iterate over employees
            res.employees.forEach((employee) => {
              if (employee.role === 'Combine Operator') {
                this.combineOperatorCount++;
              } else if (employee.role === 'Cart Operator') {
                this.cartOperatorCount++;
              }
            });

            // stop loader
            this.loadingSpinner.next(false);
        },
        (err) => {
          console.log('Error:', err);
          this.loadingSpinner.next(false);
        },
      );
  }
}
