/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  value = 'paper-form';
  buffer = 1;
  progress = 0;
  selectAray: any[] = [
    'straight-line',
    'alley-docking',
    'offset',
    'parking-blind',
    'parking-sight',
    'coup-uncoup'
  ];
  // indexArray: any[] = [0.1666666666666667, 0.3333333333333334, 0.5000000000000001, 0.6666666666666668, 0.8333333333333335,1];
  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  text=0;

  increment = 0;
  increment1 = 0;
  basicSkillForm: FormGroup;
  upload_1 = false;
  upload_2 = false;
  upload_3 = false;
 upload = false;

 // states
 states: string[];

 profileData: any;

 // Data
 data: any;

 // trainer id
 trainer_id = '4b84234b-0b74-49a2-b3c7-d3884f5f6013';

 // model
 isModalOpen = false;

  // behaviour subject for loader
  public loading = new BehaviorSubject(true);

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

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private trainingService: TrainingService,
    private renderer: Renderer2,
    private toastService: ToastService) {
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
    // this.value = 'straight-line';
    this.value = '1';

    this.basicSkillForm = this.formBuilder.group({
      evaluation_form: ['',[Validators.required]],
      trainer_id: [''],
      trainee_id: [''],
      clp: [''], //<-
      supervisor_id: [''],
      truckId: ['',[Validators.required]],
      odometerStartingMiles: ['',[Validators.required]],
      odometerEndingMiles: ['',[Validators.required]],
      is_completed_cdl_classroom: ['',[Validators.required]],
      is_completed_group_practical: ['',[Validators.required]],
      city: ['',[Validators.required]],
      state: ['',[Validators.required]],
      uploadDocs1: [''],
      uploadDocs2: [''],
      uploadDocs3: [''],
    });

     // pasing states
     this.states = states;

    // getting Trainer profile data
    this.getTrainer();

     // trainee subscription
     this.traineeSearchSubscription();

     // supervisor subscription
     this.traineeSearchSubscription();
  };
  // navigate() {
  //   console.log(this.basicSkillForm.value);
  //   this.increment1 = this.increment1 +1;
  //   // console.log(this.increment1)
  //   this.value = this.selectAray[this.increment1];
  //   console.log(this.value);

  //   // passing index to get progress
  //   this.progress = this.indexArray[this.increment];

  //   this.increment = this.increment +1;
  //   console.log(this.increment);
  //   this.text = this.increment;
  // }
  onSelectedFiles(file,name){
    console.log('file:',file);

    if(name === 'upload_1'){
      this.upload_1 = !this.upload_1;
    }
    if(name === 'upload_2'){
      this.upload_2 = !this.upload_2;
    }if(name === 'upload_3'){
      this.upload_3 = !this.upload_3;
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
      this.trainingService.getData('basic-skills').subscribe((res) => {
        console.log('RES::', res);
        // this.data = res;

        //  this.navigateToForms();
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
    this.trainingService.save(this.basicSkillForm.value, 'basic-skills').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Your details have been submitted',
            'success'
          );
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
    // console.log(this.preTrip.value);
    // this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation');

    this.trainingService.save(this.basicSkillForm.value, 'basic-skills').subscribe(
      (res) => {
        console.log('RES:', res);
        if (res.status === 200) {
          this.toastService.presentToast(
            'Basic Skills evaluation started',
            'success'
          );

          // navigating
          this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation');

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
      this.traineeSearchValue,
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
      this.router.navigateByUrl(
        '/tabs/home/training/trainer/basic-skills/digital-evaluation'
      );
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
      this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking');

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
      console.log('PARKING BLIND!')

      this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing');

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
      console.log('PARKING BLIND')
      this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind');
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
      this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight');
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
      this.router.navigateByUrl('/tabs/home/training/trainer/basic-skills/digital-evaluation/alley-docking/off-set-backing/parking-blind/parking-sight/coup-uncoup');
    }
  }
}
