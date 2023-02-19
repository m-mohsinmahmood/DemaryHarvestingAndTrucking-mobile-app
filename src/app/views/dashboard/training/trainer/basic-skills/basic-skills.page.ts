/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TrainingService } from '../../training.service';
import { states } from 'src/JSON/state';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-basic-skills',
  templateUrl: './basic-skills.page.html',
  styleUrls: ['./basic-skills.page.scss'],
})
export class BasicSkillsPage implements OnInit {
  @ViewChild('traineeInput') traineeInput: ElementRef;
  @ViewChild('supervisorInput') supervisorInput: ElementRef;
  @ViewChild('truckInput') truckInput: ElementRef;

  value = 'paper-form';
  buffer = 1;
  progress = 0;
  text=0;

  basicSkillForm: FormGroup;
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
 upload = true;

 // states
 states: string[];

 profileData: any;

 // Data
 data: any;

 // trainer id
 trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

 // model
 isModalOpen = false;

  // behaviour subject's for loader
  public loading = new BehaviorSubject(true);
  public loadingSpinner = new BehaviorSubject(false);

  training_record_id: any;

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

     //#region truck drop-down variables
     allTrucks: Observable<any>;
     truckSearch$ = new Subject();
     truck_name: any = '';
     truckSearchValue: any = '';
     truckUL: any = false;
     isTruckSelected: any = true;
     //#endregion


    private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private route: ActivatedRoute
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
        if (e.target !== this.truckInput.nativeElement) {
          this.allTrucks = of([]);
          this.truckUL = false; // to hide the UL
        }
      });
     }

  ngOnInit() {
    // this.value = 'straight-line';
    this.value = 'paper-form';
    // this.upload = true;

    this.basicSkillForm = this.formBuilder.group({
      evaluation_form: ['',[Validators.required]],
      trainer_id: [''],
      trainee_id: [''],
      clp: [''], //<-
      supervisor_id: [''],
      truckId: [''],
      odometerStartingMiles: ['',[Validators.required]],
      odometerEndingMiles: ['',[Validators.required]],
      is_completed_cdl_classroom: ['',[Validators.required]],
      is_completed_group_practical: ['',[Validators.required]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      image_1: [''],
      image_2: [''],
      image_3: [''],
    });

     // pasing states
     this.states = states;

    // getting Trainer profile data
    this.getTrainer();

     // trainee subscription
     this.traineeSearchSubscription();

     // supervisor subscription
     this.traineeSearchSubscription();

     // truck subscription
     this.truckSearchSubscription();
  };

  onSelectedFiles(file, name) {
    if (name === 'upload_1') {
      this.upload_1 = !this.upload_1;
      if ( file.target.files &&file.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (_event: any) => {
          this.basicSkillForm.controls.image_1?.setValue(file.target.files[0]);
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
            this.basicSkillForm.controls.image_2?.setValue(file.target.files[0]);
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
          this.basicSkillForm.controls.image_3?.setValue(file.target.files[0]);
      };
      reader.readAsDataURL(file.target.files[0]);
      } else {

      }
    }
  }
  uploadClick(){
     this.upload = !this.upload;
  }
  onSelect(e){
    console.log(e.target.value);
    if(e.target.value === 'paper-form'){
      this.value = e.target.value;
    }else {
      // Digital Form
      this.upload = false;
      this.value = e.target.value;
      this.trainingService.getData('basic-skills',this.trainer_id).subscribe((res) => {
        console.log('RES::', res);
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
    console.log(this.basicSkillForm.value);
    this.loadingSpinner.next(true);

    // Form Data
    var formData: FormData = new FormData();
    formData.append('basicSkillForm',JSON.stringify(this.basicSkillForm.value));
    formData.append('image_1', this.basicSkillForm.get('image_1').value);
    formData.append('image_2', this.basicSkillForm.get('image_2').value);
    formData.append('image_3', this.basicSkillForm.get('image_3').value);


    this.trainingService.save(formData, 'basic-skills').subscribe(
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
      }
    );
  }
  continue(){

    this.loadingSpinner.next(true);

    // Form Data
    var formData: FormData = new FormData();
    formData.append('preTrip',JSON.stringify(this.basicSkillForm.value));

    // api call
    this.trainingService.save(formData, 'basic-skills').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.loadingSpinner.next(false);

          this.toastService.presentToast(
            'Basic Skills evaluation has been started',
            'success'
          );

          // navigating
          this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation'],{
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
        this.loadingSpinner.next(false);
        this.toastService.presentToast(err.mssage, 'danger');
      }
    );
  }
  getTrainer() {
    this.trainingService.getTrainerById(this.trainer_id).subscribe((res) => {
      this.loading.next(true);
      console.log('Res:', res);
      this.profileData = res;

      // patching values
      this.basicSkillForm.patchValue({
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

    // to enable submit button
    this.isTraineeSelected = false;

    // assigning values in form
    this.basicSkillForm.patchValue({
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
    this.basicSkillForm.patchValue({
      supervisor_id: supervisor.id,
    });

    // clearing array
    this.allSupervisors = of([]);
  }
  //#endregion

  //#region Truck
  truckSearchSubscription() {
    this.truckSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.truckSearchValue = value;

        // for asterik to look required
        if (value === '') {
          this.isTruckSelected = true;
        }

        // calling API
        this.allTrucks = this.trainingService.getMachinery(
          this.truckSearchValue,
          'allMotorizedVehicles'
        );

        // subscribing to show/hide  UL
        this.allTrucks.subscribe((truck) => {
          console.log('truck:', truck);

          if (truck.count === 0) {
            // hiding UL
            this.truckUL = false;
          } else {
            this.truckUL = true;
          }
        });
      });
  }
  inputClickedTruck() {
    // getting the serch value to check if there's a value in input
    this.truckSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.truckSearchValue = v;
      });

    const value =
      this.truckSearchValue === undefined
        ? this.truck_name
        : this.truckSearchValue;

    // calling API
    this.allTrucks = this.trainingService.getMachinery(
      this.truckSearchValue,
      'allMotorizedVehicles'
    );

    // subscribing to show/hide field UL
    this.allTrucks.subscribe((truck) => {
      console.log('truck:', truck);
      if (truck.count === 0) {
        // hiding UL
        this.truckUL = false;
      } else {
        // showing UL
        this.truckUL = true;
      }
    });
  }
  listClickedTruck(truck) {
    console.log('truck Object:', truck);
    // hiding UL
    this.truckUL = false;

    // passing name in select's input
    this.truck_name = truck.id;

    // to enable submit button
    this.isTruckSelected = false;

    // assigning values in form
    this.basicSkillForm.patchValue({
      truckId: truck.id,
    });

    // clearing array
    this.allTrucks = of([]);
  }
  //#endregion

  completeEvaluation(){
    // Straight Line Baccking
    if (
      this.data.is_digital_form_started &&
      !this.data.is_straight_line_backing_started &&
      !this.data.is_alley_backing_started &&
      !this.data.is_off_set_backing_started &&
      !this.data.is_parking_blind_started &&
      !this.data.is_parking_sight_started &&
      !this.data.is_coup_uncoup_started
    ) {
      this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation'],{
        queryParams:{
          training_record_id: this.data.id
        }
      });
    }
    // Alley Docking
    else if (
      this.data.is_digital_form_started &&
      this.data.is_straight_line_backing_started &&
      !this.data.is_alley_backing_started &&
      !this.data.is_off_set_backing_started &&
      !this.data.is_parking_blind_started &&
      !this.data.is_parking_sight_started &&
      !this.data.is_coup_uncoup_started
    ) {
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking');
      this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking'],{
        queryParams:{
          training_record_id: this.data.id
        }
      });
    }
    // Off Set Backing
    else if (
      this.data.is_digital_form_started &&
      this.data.is_straight_line_backing_started &&
      this.data.is_alley_backing_started &&
      !this.data.is_off_set_backing_started &&
      !this.data.is_parking_blind_started &&
      !this.data.is_parking_sight_started &&
      !this.data.is_coup_uncoup_started
    ) {
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing');
      this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing'],{
        queryParams:{
          training_record_id: this.data.id
        }
      });
    }
    // Parallel Parking - Blind
    else if (
      this.data.is_digital_form_started &&
      this.data.is_straight_line_backing_started &&
      this.data.is_alley_backing_started &&
      this.data.is_off_set_backing_started &&
      !this.data.is_parking_blind_started &&
      !this.data.is_parking_sight_started &&
      !this.data.is_coup_uncoup_started
    ) {
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind');
      this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind'],{
        queryParams:{
          training_record_id: this.data.id
        }
      });
    }
     // Parallel Parking - Sight
    else if (
      this.data.is_digital_form_started &&
      this.data.is_straight_line_backing_started &&
      this.data.is_alley_backing_started &&
      this.data.is_off_set_backing_started &&
      this.data.is_parking_blind_started &&
      !this.data.is_parking_sight_started &&
      !this.data.is_coup_uncoup_started
    ) {
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight');
      this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight'],{
        queryParams:{
          training_record_id: this.data.id
        }
      });
    }
    //Coupling & Uncoupling
    else if (
      this.data.is_digital_form_started &&
      this.data.is_straight_line_backing_started &&
      this.data.is_alley_backing_started &&
      this.data.is_off_set_backing_started &&
      this.data.is_parking_blind_started &&
      this.data.is_parking_sight_started &&
      !this.data.is_coup_uncoup_started
    ) {
      // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup');
      this.router.navigate(['/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup'],{
        queryParams:{
          training_record_id: this.data.id
        }
      });
    }
  }
}
