/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { states } from 'src/JSON/state';
import { MaintenanceRepairService } from './../maintenance-repair.services';

@Component({
  selector: 'app-report-equip-issue',
  templateUrl: './report-equip-issue.page.html',
  styleUrls: ['./report-equip-issue.page.scss'],
})
export class ReportEquipIssuePage implements OnInit {
  @ViewChild('machineryInput') machineryInput: ElementRef;

  reportNewEquipIssue: FormGroup;
//#region  machinery
allMachinery: Observable<any>;
machine_search$ = new Subject();
machine_name: any = '';
machineSearchValue: any = '';
machineUL: any = false;
isMachineSelected: any = true;
//#endregion

states: string[];
add_location_overlay = true;
profileData: any;

// behaviour subject for loader
public loading = new BehaviorSubject(true);

private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private maintenanceRepairService: MaintenanceRepairService,
    private toastService: ToastService

    ) {
      this.renderer.listen('window', 'click', (e) => {
        if (e.target !== this.machineryInput.nativeElement) {
          this.allMachinery = of([]);
          this.machineUL = false; // to hide the UL
        }
      });

  }

  ngOnInit() {
    this.initForms();

    this.states = states;

     // subscription
     this.machineSearchSubscription();

     // getting Employee profile data
    this.getEmployee();

  }
  initForms(){
    this.reportNewEquipIssue = this.formBuilder.group({
      empId: [''],
      equipmentId: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      ticketType: ['', Validators.required],
      repairTicketId: ['12345'],
      issueCategory: ['', Validators.required],
      severityType: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  getEmployee(){
    this.maintenanceRepairService.getEmployeeById(localStorage.getItem('employeeId'))
    .subscribe((res)=>{
      this.loading.next(true);
      console.log('Res:',res);
      this.profileData = res[0];

      // patching values
      this.reportNewEquipIssue.patchValue({
        empId: res[0].employee_id,
      });
      this.loading.next(false);
    });
  }

  submit() {
    console.log(this.reportNewEquipIssue.value);
    this.maintenanceRepairService.save(this.reportNewEquipIssue.value,'report-issue')
    .subscribe((res)=>{
      console.log('RES:',res);
      if(res.status === 200){
        // this.router.navigateByUrl('/tabs/home/training/trainer');
        this.toastService.presentToast('Issue has been reported','success');
      }else{
        console.log('Something happened :)');
        this.toastService.presentToast(res.mssage,'danger');
      }
    },(err)=>{
console.log('ERROR::',err);
this.toastService.presentToast(err.mssage,'danger');

    });
  }

    //#region Machinery
  machineSearchSubscription() {
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((value: string) => {
        // passing for renderer2
        this.machineSearchValue = value;
        // for asterik to look required
        if (value === '') {
          this.isMachineSelected = true;
        }

        // calling API
        // this.allFields = this.harvestingService.getFields(
        //   value,
        //   'customerFields',
        //   this.customerID,
        //   this.farmID
        // );
        this.allMachinery = this.maintenanceRepairService.getMachinery(
          value,
          'allMachinery'
        );

        // subscribing to show/hide machine UL
        this.allMachinery.subscribe((machine) => {
          if (machine.count === 0) {
            // hiding UL
            this.machineUL = false;
            this.isMachineSelected = true;
          } else {
            this.machineUL = true;
          }
        });
      });
  }
  inputClickedMachinery() {
    // getting the serch value to check if there's a value in input
    this.machine_search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((v) => {
        this.machineSearchValue = v;
      });

    const value =
      this.machineSearchValue === undefined
        ? this.machine_name
        : this.machineSearchValue;

    // calling API
    this.allMachinery = this.maintenanceRepairService.getMachinery(
      value,
      'allMachinery'
    );

    // subscribing to show/hide field UL
    this.allMachinery.subscribe((machinery) => {
      console.log('--',machinery);
      if (machinery.count === 0) {
        // hiding UL
        this.machineUL = false;
      } else {
        // showing UL
        this.machineUL = true;
      }
    });
  }
  listClickedMachiney(machinery) {
    console.log('Machinery Object:', machinery);
    // hiding UL
    this.machineUL = false;

    // passing name in select's input
    this.machine_name = machinery.name;

    // to enable submit button
    this.isMachineSelected = false;

    // assigning values in form
      this.reportNewEquipIssue.patchValue({
        equipmentId: machinery.id
      });

    // clearing array
    this.allMachinery = of([]);
  }
      //#endregion

}
