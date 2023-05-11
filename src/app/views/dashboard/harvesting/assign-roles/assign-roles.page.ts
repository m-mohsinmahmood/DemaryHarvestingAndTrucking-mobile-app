/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HarvestingService } from './../harvesting.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.page.html',
  styleUrls: ['./assign-roles.page.scss'],
})
export class AssignRolesPage implements OnInit {
  @ViewChild('combineInput') combineInput: ElementRef;
  @ViewChild('cartInput') cartInput: ElementRef;

  assignFormCombine: FormGroup;
  assignFormKart: FormGroup;

  // observables
  allCombineOperators: Observable<any>;
  allCartOperators: Observable<any>;

  // subjects
  combine_search$ = new Subject();
  cart_search$ = new Subject();

  // input values
  combine_name: any = '';
  cart_name: any = '';

  // input's search values
  combineSearchValue: any;
  cartSearchValue: any;

  // to show UL's
  combineUL: any = false;
  cartUL: any = false;

  // for invalid
  isCombineSelected: any = true;
  isCartSelected: any = true;

  // for selected
  value = 'Combine Operator';

  // data
  data: any;
  activeJobs: 0;
  sub;
  deleteId;

  public loadingSpinner = new BehaviorSubject(false);
  public loadingSpinner2 = new BehaviorSubject(false);
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
      if (e.target !== this.combineInput.nativeElement) {
        this.allCombineOperators = of([]);
        this.combineUL = false; // to hide the UL
      }

      if (e.target !== this.cartInput.nativeElement) {
        this.allCartOperators = of([]);
        this.cartUL = false; // to hide the UL
      }
    });
  }

  ngOnDestroy(): void {
    this.DataDestroy();
  }

  async ionViewDidLeave() {
    // this.DataDestroy();
  }

  DataDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // this.sub.unsubscribe();
  }

  ngOnInit() {

    this.assignFormCombine = this.formBuilder.group({
      crew_chief_id: [localStorage.getItem('employeeId')],
      combine_operator_id: [''],
    });

    this.assignFormKart = this.formBuilder.group({
      crew_chief_id: [localStorage.getItem('employeeId')],
      cart_operator_id: [''],
    });

    // combine & cart subscription
    this.combineSearchSubscription();

    //api call

    // this.harvestingService.getJobSetup('Crew Chief', localStorage.getItem('employeeId'), '');
    // this.sub = this.harvestingService.customerJobSetup$.subscribe((res) => {
    //   console.log(res);

    //   this.activeJobData = res;
    //   console.log(this.activeJobData?.customer_job.length);
    // });

    this.harvestingService.getRoles(111, 111, localStorage.getItem('employeeId'))
      .subscribe(
        (res: any) => {
          if (res.status === 200) {
            console.log('RESPONSE:', res);
            this.data = res;
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          this.toastService.presentToast(err, 'danger');
        },
      );
  }
  goBack() {
    this.location.back();
  }

  addCombine() {

    // this.assignFormCombine.value.job_id = this.activeJobData?.customer_job[0].id;
    this.assignFormCombine.value.employee_id = this.assignFormCombine.get('combine_operator_id').value;

    console.log(this.assignFormCombine.value);
    this.loadingSpinner.next(true);

    this.harvestingService.createJob(this.assignFormCombine.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            // clearing combine input
            this.combineInput.nativeElement.value = '';

            // to look asterik
            this.isCombineSelected = true;


            // toast
            this.toastService.presentToast(res.message, 'success');

            // stop loader
            this.loadingSpinner.next(false);


            console.log(res.message);
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          // this.handleError(err);
        },
        () => {
          this.getCombineOperators();
        }
      );
  }

  addKart() {

    // this.assignFormKart.value.job_id = this.activeJobData?.customer_job[0].id;
    this.assignFormKart.value.employee_id = this.assignFormKart.get('cart_operator_id').value;

    console.log(this.assignFormKart.value);
    this.loadingSpinner2.next(true);
    this.harvestingService.createJob(this.assignFormKart.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {

            // clearing cart input
            this.cartInput.nativeElement.value = '';

            // to look asterik
            this.isCartSelected = true;

            // toast
            this.toastService.presentToast(res.message, 'success');

            // stop loader
            this.loadingSpinner2.next(false);
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          // this.handleError(err);
        },
        () => {
          this.getKartOPerators();
        }
      );
  }
  //#region comnine

  removeCrewMember(id) {
    this.deleteId = id;
    const data = {
      id,
      operation: 'removeAssignedRole'
    };
    // start loader
    this.deleteSpinner.next(true);

    this.harvestingService.removeAssignedRole(data)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            this.toastService.presentToast(res.message, 'success');

            this.harvestingService.getRoles(111, 111, localStorage.getItem('employeeId'))
              .subscribe(
                (res: any) => {
                  if (res.status === 200) {
                    console.log('RESPONSE:', res);
                    this.data = res;

                    // stop loader
                 this.deleteSpinner.next(false);

                  } else {
                    console.log('Something happened :)');
                  }
                },
                (err) => {
                  console.log('Error:', err);
                  this.toastService.presentToast(err, 'danger');
                },
              );

          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          // this.handleError(err);
        },
        () => {
          this.getKartOPerators();
        }
      );
  }

  combineSearchSubscription() {
    this.combine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.combineSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isCombineSelected = true;
        }

        // calling API
        this.allCombineOperators = this.harvestingService.getCombineCartOperator(
          this.combineSearchValue,
          'getCombineCartOperator',
          'Combine Operator'
        );

        // subscribing to show/hide field UL
        this.allCombineOperators.subscribe((combineOperators) => {
          console.log('Combines:', combineOperators);

          if (combineOperators.count === 0) {
            // hiding UL
            this.combineUL = false;
          } else {
            this.combineUL = true;
          }
        });
      });
  }

  inputClickedCombine() {
    // getting the serch value to check if there's a value in input
    this.combine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.combineSearchValue = v;
      });

    const value =
      this.combineSearchValue === undefined
        ? this.combine_name
        : this.combineSearchValue;

    // calling API
    this.allCombineOperators = this.harvestingService.getCombineCartOperator(
      this.combineSearchValue,
      'getCombineCartOperator',
      'Combine Operator'
    );

    // subscribing to show/hide field UL
    this.allCombineOperators.subscribe((combineOperators) => {
      if (combineOperators.count === 0) {
        // hiding UL
        this.combineUL = false;
      } else {
        // showing UL
        this.combineUL = true;
      }
    });
  }

  listClickedCombine(combine) {

    // hiding UL
    this.combineUL = false;

    // passing name in select's input
    this.combineInput.nativeElement.value = combine.first_name + ' ' + combine.last_name;

    // to enable submit button
    // if (this.activeJobData?.customer_job.length > 0) { this.isCombineSelected = false; }

    this.isCombineSelected = false;

    // assigning values in form
    this.assignFormCombine.patchValue({
      combine_operator_id: combine.id,
    });

    // clearing array
    this.allCombineOperators = of([]);

  }
  //#endregion

  //#region Cart
  cartSearchSubscription() {
    this.cart_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.cartSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isCartSelected = true;
        }

        // calling API

        this.allCartOperators = this.harvestingService.getCombineCartOperator(
          this.cartSearchValue,
          'getCombineCartOperator',
          'Kart Operator'
        );

        // subscribing to show/hide field UL
        this.allCartOperators.subscribe((cartOperators) => {
          if (cartOperators.count === 0) {
            // hiding UL
            this.cartUL = false;
          } else {
            this.cartUL = true;
          }
        });
      });
  }

  inputClickedCart() {
    // getting the serch value to check if there's a value in input
    this.cart_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.cartSearchValue = v;
      });

    const value =
      this.cartSearchValue === undefined
        ? this.cart_name
        : this.cartSearchValue;

    // calling API
    this.allCartOperators = this.harvestingService.getCombineCartOperator(
      this.cartSearchValue,
      'getCombineCartOperator',
      'Kart Operator'
      );

    // subscribing to show/hide field UL
    this.allCartOperators.subscribe((cartOperators) => {
      console.log('Cart:', cartOperators);
      if (cartOperators.count === 0) {
        // hiding UL
        this.cartUL = false;
      } else {
        // showing UL
        this.cartUL = true;
      }
    });
  }

  listClickedCart(cart) {
    console.log('Cart Object:', cart);
    // hiding UL
    this.cartUL = false;

    // passing name in select's input
    this.cartInput.nativeElement.value = cart.first_name + ' ' + cart.last_name;

    // to enable submit button
    // if (this.activeJobData?.customer_job.length > 0) { this.isCartSelected = false; }

    this.isCartSelected = false;

    // assigning values in form
    this.assignFormKart.patchValue({
      cart_operator_id: cart.id,
    });
    // clearing array
    this.allCartOperators = of([]);
  }
  //#endregion

  onClick(val: any) {
    if (val === 'Combine Operator') {
      this.value = 'Combine Operator';
      this.getCombineOperators();
    } else {
      this.value = 'cart-operator';
      this.getKartOPerators();
    }
  }

  getCombineOperators() {
    this.harvestingService.getRoles(111, 111, localStorage.getItem('employeeId'))
      .subscribe(
        (res: any) => {
          if (res.status === 200) {
            console.log('Combine Operators:', res);
            this.data = res;

          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          this.toastService.presentToast(err, 'danger');
        },
      );
  }

  getKartOPerators() {
    this.harvestingService.getRoles(111, 111, localStorage.getItem('employeeId'))
      .subscribe(
        (res: any) => {
          console.log('Kart Operators:', res);
          if (res.status === 200) {
            // this.toastService.presentToast('', 'success');
            // console.log(res.message);
            console.log('Kart Operators:', res);
            this.data = res;

          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          this.toastService.presentToast(err, 'danger');

          // this.handleError(err);
        },
      );
  }
}
