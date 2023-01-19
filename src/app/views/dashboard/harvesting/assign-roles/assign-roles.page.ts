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
import { Observable, of, Subject } from 'rxjs';
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
  value = 'combine-operator';

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
        // console.log('Combine');
        this.allCombineOperators = of([]);
        this.combineUL = false; // to hide the UL
      }
      if (e.target !== this.cartInput.nativeElement) {
        // console.log('Cart');
        this.allCartOperators = of([]);
        this.cartUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    // this.assignForm = this.formBuilder.group({
    //   crew_chief_id: [localStorage.getItem('employeeId')],
    //   combine_operator_id: [''],
    //   cart_operator_id: [''],
    // });
    this.assignFormCombine = this.formBuilder.group({
      crew_chief_id: [localStorage.getItem('employeeId')],
      combine_operator_id: [''],
    });
    this.assignFormKart = this.formBuilder.group({
      crew_chief_id: [localStorage.getItem('employeeId')],
      cart_operator_id: [''],
    });

    this.combineSearchSubscription();
  }
  goBack() {
    this.location.back();
  }

  addCombine() {

    console.log(this.assignFormCombine.value);
    this.harvestingService.createJob(this.assignFormCombine.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            this.toastService.presentToast(res.message, 'success');

            console.log(res.message);
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          // this.handleError(err);
        },
      );
  }
  addKart() {

    console.log(this.assignFormKart.value);
    this.harvestingService.createJob(this.assignFormKart.value)
      .subscribe(
        (res: any) => {
          console.log('Response:', res);
          if (res.status === 200) {
            this.toastService.presentToast(res.message, 'success');

            console.log(res.message);
          } else {
            console.log('Something happened :)');
          }
        },
        (err) => {
          console.log('Error:', err);
          // this.handleError(err);
        },
      );
  }
  //#region comnine
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
        this.allCombineOperators = this.harvestingService.getEmployees(
          this.combineSearchValue,
          'allEmployees',
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
    this.allCombineOperators = this.harvestingService.getEmployees(
      this.combineSearchValue,
      'allEmployees',
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
    console.log('Combine Object:', combine);
    // hiding UL
    this.combineUL = false;

    // passing name in select's input
    this.combine_name = combine.first_name + ' ' + combine.last_name;

    // to enable submit button
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
        this.allCartOperators = this.harvestingService.getEmployees(
          this.cartSearchValue,
          'allEmployees',
          'Kart Operator'
        );

        // subscribing to show/hide field UL
        this.allCartOperators.subscribe((cartOperators) => {
          console.log('Cart:', cartOperators);

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
    this.allCartOperators = this.harvestingService.getEmployees(
      this.cartSearchValue,
      'allEmployees',
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
    this.cart_name = cart.first_name + ' ' + cart.last_name;

    // to enable submit button
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
    if (val === 'combine-operator') {
      this.value = 'combine-operator';
    } else {
      this.value = 'cart-operator';
    }
  }
}
