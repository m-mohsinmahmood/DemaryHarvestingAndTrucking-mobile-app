/* eslint-disable no-var */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../training.service';
import { states } from 'src/JSON/state';

@Component({
  selector: 'app-pre-trip',
  templateUrl: './pre-trip.page.html',
  styleUrls: ['./pre-trip.page.scss'],
})
export class PreTripPage implements OnInit {
  @ViewChild('traineeInput') traineeInput: ElementRef;
  @ViewChild('supervisorInput') supervisorInput: ElementRef;

  // preTripForm: FormGroup;
  preTrip: FormGroup;

  value: any = 'paper-form';

  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
  upload = true;

  // model
 isModalOpen = false;

  // Data
  data: any;
  // behaviour subject for loader
  public loading = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);


  // trainer id
  trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

  backDropValue: any = false; // Bacck-Drop Value
  showModel: any= false;
  profileData: any;
  states: string[];

  //#region trainee drop-down variables
  allTrainees: Observable<any>;
  traineeSearch$ = new Subject();
  trainee_name: any = '';
  traineeSearchValue: any = '';
  traineeUL: any = false;
  isTraineeSelected: any = true;
  //#endregion

  //#region supervisor drop-down variables
  allSupervisors: Observable<any>;
  supervisorSearch$ = new Subject();
  supervisor_name: any = '';
  supervisorSearchValue: any = '';
  supervisorUL: any = false;
  isSupervisorSelected: any = true;
  //#endregion

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private route: ActivatedRoute,

  ) {
    this.renderer.listen('window', 'click', (e) => {
      if (e.target !== this.traineeInput.nativeElement) {
        this.allTrainees = of([]);
        this.traineeUL = false; // to hide the UL
      }
      if (e.target !== this.supervisorInput.nativeElement) {
        this.allSupervisors = of([]);
        this.supervisorUL = false; // to hide the UL
      }
    });
  }

  ngOnInit() {
    // pasing states
    this.states = states;

    this.initForms();

    // getting Trainer profile data
    this.getTrainer();
  }

  initForms() {

    this.preTrip = this.formBuilder.group({
      evaluation_form: ['', [Validators.required]],
      trainer_id: [''],
      trainee_id: [''],
      supervisor_id: [''],
      is_completed_cdl_classroom: ['', [Validators.required]],
      is_completed_group_practical: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      image_1: [''],
      image_2: [''],
      image_3: [''],
    });

    // trainee subscription
    this.traineeSearchSubscription();

    // supervisor subscription
    this.traineeSearchSubscription();
  }


  onSelectedFiles(file, name) {
    if (name === 'upload_1') {
      this.upload_1 = !this.upload_1;
      if ( file.target.files &&file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.preTrip.controls.image_1?.setValue(file.target.files[0]);
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
            this.preTrip.controls.image_2?.setValue(file.target.files[0]);
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
          this.preTrip.controls.image_3?.setValue(file.target.files[0]);
      };
      reader.readAsDataURL(file.target.files[0]);
      } else {

      }
    }
  }
  uploadClick() {
    this.upload = !this.upload;
  }
  onSelect(e) {
    console.log(e.target.value);
    if (e.target.value === 'paper-form') {
      this.value = e.target.value;
    } else {
      // Digital Form
      this.upload = false;
      this.value = e.target.value;

      this.trainingService.getData('pre-trip',this.trainer_id).subscribe((res) => {
        console.log('RES::', res);
        this.data = res;
        if (res.message === 'No Records Found.') {
        // nothing
        }
        else {
          this.data = res;
        this.isModalOpen = true;
        }
      });
    }
  }

  submit() {
    console.log(this.preTrip.value);
    this.loadingSpinner.next(true);
    // Form Data
    var formData: FormData = new FormData();
    formData.append('preTrip',JSON.stringify(this.preTrip.value));
    formData.append('image_1', this.preTrip.get('image_1').value);
    formData.append('image_2', this.preTrip.get('image_2').value);
    formData.append('image_3', this.preTrip.get('image_3').value);
console.log('FormData:',formData);
    this.trainingService.save(formData, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.loadingSpinner.next(false);
          this.toastService.presentToast(
            'Your details have been submitted',
            'success'
          );
          this.router.navigateByUrl('/tabs/home/training/trainer');
        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
        }
      },
      (err) => {
        console.log('ERROR::', err);
        this.toastService.presentToast(err.mssage, 'danger');
        this.loadingSpinner.next(true);

      }
    );
  }
  continue() {
    console.log(this.preTrip.value);
        this.loadingSpinner.next(true);

         // Form Data
        var formData: FormData = new FormData();
        formData.append('preTrip',JSON.stringify(this.preTrip.value));

        // api call
       this.trainingService.save(formData, 'pre-trip').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
        this.loadingSpinner.next(false);

          this.toastService.presentToast(
            'Digital evaluation has been started',
            'success'
          );

          // navigating
          this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form'],{
            queryParams:{
              training_record_id: res.id.training_record_id
            }
          });
        } else {
          console.log('Something happened :)');
          this.toastService.presentToast(res.mssage, 'danger');
        }
      },
      (err) => {
        console.log('ERROR::', err);
        this.toastService.presentToast(err.mssage, 'danger');
        this.loadingSpinner.next(false);

      }
    );
  }

  getTrainer() {
    this.trainingService.getTrainerById(this.trainer_id).subscribe((res) => {
      this.loading.next(true);
      console.log('Res:', res);
      this.profileData = res;

      // patching values
      this.preTrip.patchValue({
        trainer_id: res[0].trainer_id,
      });
      this.loading.next(false);
    });
  }

  //#region Trainee
  traineeSearchSubscription() {
    this.traineeSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.traineeSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isTraineeSelected = true;
        }

        // calling API
        this.allTrainees = this.trainingService.getEmployees(
          this.traineeSearchValue,
          'allEmployees',
          'Trainee'
        );

        // subscribing to show/hide  UL
        this.allTrainees.subscribe((trainee) => {
          console.log('trainee:', trainee);

          if (trainee.count === 0) {
            // hiding UL
            this.traineeUL = false;
          } else {
            this.traineeUL = true;
          }
        });
      });
  }
  inputClickedTrainee() {
    // getting the serch value to check if there's a value in input
    this.traineeSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.traineeSearchValue = v;
      });

    const value =
      this.traineeSearchValue === undefined
        ? this.trainee_name
        : this.traineeSearchValue;

    // calling API
    this.allTrainees = this.trainingService.getEmployees(
      this.traineeSearchValue,
      'allEmployees',
      'Trainee'
    );

    // subscribing to show/hide field UL
    this.allTrainees.subscribe((trainee) => {
      console.log('trainee:', trainee);
      if (trainee.count === 0) {
        // hiding UL
        this.traineeUL = false;
      } else {
        // showing UL
        this.traineeUL = true;
      }
    });
  }
  listClickedTrainee(trainee) {
    console.log('Trainee Object:', trainee);
    // hiding UL
    this.traineeUL = false;

    // passing name in select's input
    this.trainee_name = trainee.first_name + ' ' + trainee.last_name;
    console.log('-',this.trainee_name);
    // to enable submit button
    this.isTraineeSelected = false;

    // assigning values in form
    this.preTrip.patchValue({
      trainee_id: trainee.id,
    });

    // clearing array
    this.allTrainees = of([]);
  }
  //#endregion

  //#region Supervisor
  supervisorSearchSubscription() {
    this.supervisorSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.supervisorSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isSupervisorSelected = true;
        }

        // calling API
        this.allSupervisors = this.trainingService.getEmployees(
          this.supervisorSearchValue,
          'allEmployees',
          'Trainee'
        );

        // subscribing to show/hide  UL
        this.allSupervisors.subscribe((supervisor) => {
          console.log('supervisor:', supervisor);

          if (supervisor.count === 0) {
            // hiding UL
            this.supervisorUL = false;
          } else {
            this.supervisorUL = true;
          }
        });
      });
  }
  inputClickedSupervisor() {
    // getting the serch value to check if there's a value in input
    this.supervisorSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.supervisorSearchValue = v;
      });

    const value =
      this.supervisorSearchValue === undefined
        ? this.supervisor_name
        : this.supervisorSearchValue;

    // calling API
    this.allSupervisors = this.trainingService.getEmployees(
      this.supervisorSearchValue,
      'allEmployees',
      'Supervisor'
    );

    // subscribing to show/hide field UL
    this.allSupervisors.subscribe((supervisor) => {
      console.log('supervisor:', supervisor);
      if (supervisor.count === 0) {
        // hiding UL
        this.supervisorUL = false;
      } else {
        // showing UL
        this.supervisorUL = true;
      }
    });
  }
  listClickedSupervisor(supervisor) {
    console.log('supervisor Object:', supervisor);
    // hiding UL
    this.supervisorUL = false;

    // passing name in select's input
    this.supervisor_name = supervisor.first_name + ' ' + supervisor.last_name;

    // to enable submit button
    this.isSupervisorSelected = false;

    // assigning values in form
    this.preTrip.patchValue({
      supervisor_id: supervisor.id,
    });

    // clearing array
    this.allSupervisors = of([]);
  }
  //#endregion

  completeEvaluation(){
// Engine/Compartment
if (
  this.data.is_digital_form_started &&
  !this.data.is_engine_compartment_started &&
  !this.data.is_in_cab_started &&
  !this.data.is_suspension_brakes_started &&
  !this.data.is_coupling_started &&
  !this.data.is_vehicle_external_started
) {
  // this.router.navigateByUrl(
  //   '/tabs/home/training/trainer/pre-trip/digital-form'
  // );
  this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form'],{
    queryParams:{
      training_record_id: this.data.id
    }
  });
}
// In Cab
else if (
  this.data.is_digital_form_started &&
  this.data.is_engine_compartment_started &&
  !this.data.is_in_cab_started &&
  !this.data.is_suspension_brakes_started &&
  !this.data.is_coupling_started &&
  !this.data.is_vehicle_external_started
) {
  // this.router.navigateByUrl(
  //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab'
  // );
  this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab'],{
    queryParams:{
      training_record_id: this.data.id
    }
  });
}
// Vehicle/External
else if (
  this.data.is_digital_form_started &&
  this.data.is_engine_compartment_started &&
  this.data.is_in_cab_started &&
  !this.data.is_suspension_brakes_started &&
  !this.data.is_coupling_started &&
  !this.data.is_vehicle_external_started
) {
  console.log('Vehicle/External');
  // this.router.navigateByUrl(
  //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external'
  // );
  this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external'],{
    queryParams:{
      training_record_id: this.data.id
    }
  });
}
// Coupling
else if (
  this.data.is_digital_form_started &&
  this.data.is_engine_compartment_started &&
  this.data.is_in_cab_started &&
  this.data.is_vehicle_external_started &&
  !this.data.is_coupling_started &&
  !this.data.is_suspension_brakes_started
) {
  // this.router.navigateByUrl(
  //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling'
  // );
  this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling'],{
    queryParams:{
      training_record_id: this.data.id
    }
  });
}
// Suspension & Brakes
else if (
  this.data.is_digital_form_started &&
  this.data.is_engine_compartment_started &&
  this.data.is_in_cab_started &&
  this.data.is_vehicle_external_started &&
  this.data.is_coupling_started &&
  !this.data.is_suspension_brakes_started
) {
  // this.router.navigateByUrl(
  //   '/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling/suspension-brakes'
  // );
  this.router.navigate(['/tabs/home/training/trainer/pre-trip/digital-form/in-cab/vehicle-external/coupling/suspension-brakes'],{
    queryParams:{
      training_record_id: this.data.id
    }
  });
}
  }
}
