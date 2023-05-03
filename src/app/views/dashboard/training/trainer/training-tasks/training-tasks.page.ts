/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable no-debugger */
/* eslint-disable no-var */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/JSON/state';
import { TrainingService } from './../../training.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CheckInOutService } from 'src/app/components/check-in-out/check-in-out.service';

@Component({
  selector: 'app-training-tasks',
  templateUrl: './training-tasks.page.html',
  styleUrls: ['./training-tasks.page.scss'],
})
export class TrainingTasksPage implements OnInit {
  @ViewChild('employeeInput') employeeInput: ElementRef;

  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  route;
  trainingTasksForm: FormGroup;
  states: string[];
  role;
  trainer_id;
  profileData: any;

  // behaviour subject's for loader
  public loading = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);

  //#region supervisor drop-down variables
  allEmployees: Observable<any>;
  employeesearch$ = new Subject();
  employee_name: any = '';
  employeeSearchValue: any = '';
  employeeUL: any = false;
  isEmployeeSelected: any = true;
  //#endregion

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  docPreview: string = '';
  active_check_in_id: any;
  trainer_record_id: any;
  public activeCheckInSpinner = new BehaviorSubject(false);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private dwrServices: CheckInOutService

  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.employeeInput.nativeElement) {
        this.allEmployees = of([]);
        this.employeeUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    console.log(
      'route-name:',
      this.router.getCurrentNavigation().extras.state.routeName
    );
    this.route = this.router.getCurrentNavigation().extras.state.routeName;

    this.initForm();

    // getting id & role
  this.getRoleAndID();

    // getting Trainer profile data
    this.getTrainer();



    // passing value in training type
    if (this.route === 'Company Training') {
      this.trainingTasksForm.patchValue({
        training_type: 'company-training',
      });
    } else if (this.route === 'Safety Training') {
      this.trainingTasksForm.patchValue({
        training_type: 'safety-training',
      });
    } else if (this.route === 'CDL Training') {
      this.trainingTasksForm.patchValue({
        training_type: 'cdl-training',
      });
    }

    // pasing states
    this.states = states;



    // supervisor subscription
    this.employeeSearchSubscription();
  }
  ngAfterViewInit(): void {
    this.setDefaultSupervisor();
  }
  initForm(){
    this.trainingTasksForm = this.formBuilder.group({
      trainer_id: [''],
      supervisor_id: ['f676c59d-5e39-4051-a730-b907ccce1f48'],
      city: [''],
      state: [''],
      training_type: [''],
      topic: ['', [Validators.required]],
      image_1: [''],
      image_2: [''],
      image_3: [''],
      notes: [''],
      dwr_id:['']
    });
  }
  async ionViewDidEnter() {
    this.getRoleAndID();
  }
  getRoleAndID(){
    this.role = localStorage.getItem('role');
    this.trainer_id = localStorage.getItem('employeeId');
  }
  setDefaultSupervisor(){
    // passing name in select's input to pre-fill
    this.employeeInput.nativeElement.value = 'Bill Demeray';

    // to enable submit button to pre-fill
    this.isEmployeeSelected = false;
  }

  onSelectedFiles(file, name) {
    console.log('file:', file.target.files);

    if (name === 'upload_1') {
      this.upload_1 = !this.upload_1;
      if ( file.target.files &&file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.trainingTasksForm.controls.image_1?.setValue(file.target.files[0]);
      };
      reader.readAsDataURL(file.target.files[0]);
      } else {

      }
    }
    if (name === 'upload_2') {
      this.upload_2 = !this.upload_2;
        if ( file.target.files &&file.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (_event: any) => {
            this.trainingTasksForm.controls.image_2?.setValue(file.target.files[0]);
        };
        reader.readAsDataURL(file.target.files[0]);
        } else {

        }
    }
    if (name === 'upload_3') {
      this.upload_3 = !this.upload_3;
      if ( file.target.files &&file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.trainingTasksForm.controls.image_3?.setValue(file.target.files[0]);
      };
      reader.readAsDataURL(file.target.files[0]);
      } else {

      }
    }
  }
  getTrainer() {
    this.trainingService.getTrainerById(this.trainer_id).subscribe((res) => {
      this.loading.next(true);
      this.profileData = res.summary[0];

      // patching values
      this.trainingTasksForm.patchValue({
        trainer_id: res.summary[0].trainer_id,
        city: res.summary[0].town_city != null ? res.summary[0].town_city : '',
        state: res.summary[0].state != null ? res.summary[0].state : ''
      });
      this.loading.next(false);
    });
  }
submit(){
  this.loadingSpinner.next(true);
    // getting check-in id
    this.getCheckInID();


}
  submitData() {
    // eslint-disable-next-line no-var
    // Form Data
    var formData: FormData = new FormData();
    formData.append('trainingTasksForm',JSON.stringify(this.trainingTasksForm.value));
    formData.append('image_1', this.trainingTasksForm.get('image_1').value);
    formData.append('image_2', this.trainingTasksForm.get('image_2').value);
    formData.append('image_3', this.trainingTasksForm.get('image_3').value);

    this.trainingService
      .save(formData, 'trainer')
      .subscribe(
        (res) => {
          console.log('RES:', res);
          if (res.status === 200) {

          // passing record id
          this.trainer_record_id = res.id.record_id;

          // create DWR
          this.createDWR();

          } else {
            console.log('Something happened :)');
            this.toastService.presentToast(res.mssage, 'danger');
            this.loadingSpinner.next(false);
          }
        },
        (err) => {
          console.log('ERROR::', err);
          this.toastService.presentToast(err.mssage, 'danger');
          this.loadingSpinner.next(false);
        }
      );
  }

  getCheckInID(){
    this.dwrServices.getDWR(localStorage.getItem('employeeId')).subscribe(workOrder => {
      this.activeCheckInSpinner.next(true);
      console.log('Active Check ID: ', workOrder.dwr[0].id);
      this.active_check_in_id = workOrder.dwr[0].id;
      this.activeCheckInSpinner.next(false);

      // patch
      this.trainingTasksForm.patchValue({
        dwr_id: this.active_check_in_id
      });

       // submit data
      this.submitData();
    });

  }

  createDWR(){
    let supervisor_id;
    supervisor_id = this.trainingTasksForm.get('supervisor_id').value;
    this.trainingService
     .createDWR(this.trainer_id, '','',this.trainer_record_id,'','',supervisor_id,this.active_check_in_id)
     .subscribe(
       (res) => {
         console.log('RES:', res);
         if (res.status === 200) {

          // to stop loader
          this.loadingSpinner.next(false);


           // tooltip
           this.toastService.presentToast(
            'Your details have been submitted',
            'success'
          );

          //  navigating
           this.router.navigateByUrl('/tabs/home/training/trainer');
         } else {
           console.log('Something happened :)');
           this.toastService.presentToast(res.mssage, 'danger');
          this.loadingSpinner.next(false);

         }
       },
       (err) => {
         console.log('ERROR::', err);
         this.toastService.presentToast(err.mssage, 'danger');
         this.loadingSpinner.next(false);

       }
     );
 }
  //#region Supervisor
  employeeSearchSubscription() {
    this.employeesearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.employeeSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isEmployeeSelected = true;
        }

        // calling API
        this.allEmployees = this.trainingService.getSupervisors(
          this.employeeSearchValue,
        );

        // subscribing to show/hide field UL
        this.allEmployees.subscribe((employees) => {
          console.log('Employees:', employees);

          if (employees.count === 0) {
            // hiding UL
            this.employeeUL = false;
          } else {
            this.employeeUL = true;
          }
        });
      });
  }
  inputClickedEmployee() {
    // getting the serch value to check if there's a value in input
    this.employeesearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.employeeSearchValue = v;
      });

    const value =
      this.employeeSearchValue === undefined
        ? this.employee_name
        : this.employeeSearchValue;

    // calling API
    this.allEmployees = this.trainingService.getSupervisors(
      this.employeeSearchValue,
    );

    // subscribing to show/hide field UL
    this.allEmployees.subscribe((employees) => {
      console.log('Employees:', employees);
      if (employees.count === 0) {
        // hiding UL
        this.employeeUL = false;
      } else {
        // showing UL
        this.employeeUL = true;
      }
    });
  }
  listClickedEmployee(employee) {
    console.log('Employee Object:', employee);
    // hiding UL
    this.employeeUL = false;

    // passing name in select's input
    this.employeeInput.nativeElement.value = employee.first_name + ' ' + employee.last_name;

    // passing in search
    // this.employeeSearchValue = employee.first_name + ' ' + employee.last_name;

    // to enable submit button
    this.isEmployeeSelected = false;

    // assigning values in form
    this.trainingTasksForm.patchValue({
      supervisor_id: employee.id,
    });

    // clearing array
    this.allEmployees = of([]);
  }
  //#endregion
}
