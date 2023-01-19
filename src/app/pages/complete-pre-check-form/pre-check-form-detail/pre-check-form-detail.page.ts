/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripCheckService } from './../trip-check-form.service';

@Component({
  selector: 'app-pre-check-form-detail',
  templateUrl: './pre-check-form-detail.page.html',
  styleUrls: ['./pre-check-form-detail.page.scss'],
})
export class PreCheckFormDetailPage implements OnInit {

  data;
  ticket;
  dataLoaded = false;

  items = [
    { value: 'Air Compressor Engine', status: '', description: '' },
    { value: 'Belts & Hoses', status: '', description: '' },
    { value: 'Radiator', status: '', description: '' },
    { value: 'Steering', status: '', description: '' },
    { value: 'Oil Level', status: '', description: '' },
    { value: 'Fluid Level', status: '', description: '' },
    { value: 'Clutch Condition', status: '', description: '' },
    { value: 'Safety Equipment', status: '', description: '' },
    { value: 'Starter', status: '', description: '' },
    { value: 'Gauges (Dashboard)', status: '', description: '' },
    { value: 'Oil Pressure', status: '', description: '' },
    { value: 'Wipers/Wash', status: '', description: '' },
    { value: 'Defroster/Heater', status: '', description: '' },
    { value: 'Windows', status: '', description: '' },
    { value: 'Horns', status: '', description: '' },
    { value: 'Parking Brakes', status: '', description: '' },
    { value: 'Service Brakes', status: '', description: '' },
    { value: 'Leak Test', status: '', description: '' },
    { value: 'Lights', status: '', description: '' },
    { value: 'Lights and Reflectors', status: '', description: '' },
    { value: 'Fuel Tank', status: '', description: '' },
    { value: 'Frame and Assembly', status: '', description: '' },
    { value: 'Drive Line', status: '', description: '' },
    { value: 'Lug Nuts (3)', status: '', description: '' },
    { value: 'Wheels/Rims (5)', status: '', description: '' },
    { value: 'Tires/Chains (5)', status: '', description: '' },
    { value: 'Exhaust', status: '', description: '' },
    { value: 'Battery Box', status: '', description: '' },
    { value: 'Mirros', status: '', description: '' },
    { value: 'Air Line', status: '', description: '' },
    { value: 'Brake Accessories', status: '', description: '' },
    { value: 'Coupling Devices', status: '', description: '' },
    { value: 'Fifth Wheel', status: '', description: '' },
    { value: 'Rear-End', status: '', description: '' },
    { value: 'Muffler', status: '', description: '' },
    { value: 'Front Axle', status: '', description: '' },
    { value: 'Suspension System', status: '', description: '' },
    { value: 'Transmission', status: '', description: '' },
    { value: 'Brake Connections', status: '', description: '' },
    { value: 'Brakes', status: '', description: '' },
    { value: 'Coupling Devices', status: '', description: '' },
    { value: 'Coupling (King) Pin', status: '', description: '' },
    { value: 'Doors', status: '', description: '' },
    { value: 'Hitch', status: '', description: '' },
    { value: 'Landing Gear', status: '', description: '' },
    { value: 'Lights All', status: '', description: '' },
    { value: 'Reflectors/Reflect. Tape', status: '', description: '' },
    { value: 'Roof', status: '', description: '' },
    { value: 'Suspension System', status: '', description: '' },
    { value: 'Tarpaulin', status: '', description: '' },
    { value: 'Tires', status: '', description: '' },
  ];

  constructor(private tripCheckFormService: TripCheckService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(ticket => {
      this.data = ticket;
    })
  }

  ngOnInit() {
    if (this.data) {
      this.ticket = this.tripCheckFormService.getActivePreCheckTicket('getTicketById', localStorage.getItem('employeeId'), this.data?.id);

      this.ticket.subscribe((ticket) => {
        this.ticket = ticket.ticket[0];
        console.log(this.ticket);
        this.dataLoaded = true;

        this.items.forEach(element => {
          if (element.value === 'Air Compressor Engine') {
            let status = this.replaceStatus(this.ticket.airCompressorEngine)
            this.dataSummary(element, status, this.ticket.airCompressorEngineNotes)
          }
          else if (element.value === 'Belts & Hoses') {
            let status = this.replaceStatus(this.ticket.beltsHoses)
            this.dataSummary(element, status, this.ticket.beltsHosesNotes)
          }
          else if (element.value === 'Radiator') {
            let status = this.replaceStatus(this.ticket.radiator)
            this.dataSummary(element, status, this.ticket.radiatorNotes)
          }
          else if (element.value === 'Steering') {
            let status = this.replaceStatus(this.ticket.steering)
            this.dataSummary(element, status, this.ticket.steeringNotes)
          }
          else if (element.value === 'Oil Level') {
            let status = this.replaceStatus(this.ticket.oilLvl)
            this.dataSummary(element, status, this.ticket.oilLvlNotes)
          }
          else if (element.value === 'Fluid Level') {
            let status = this.replaceStatus(this.ticket.fluidLvl)
            this.dataSummary(element, status, this.ticket.fluidLvlNotes)
          }
          else if (element.value === 'Clutch Condition') {
            let status = this.replaceStatus(this.ticket.clutchCondition)
            this.dataSummary(element, status, this.ticket.clutchConditionNotes)
          }
          else if (element.value === 'Safety Equipment') {
            let status = this.replaceStatus(this.ticket.safetyEquip)
            this.dataSummary(element, status, this.ticket.safetyEquipNotes)
          }
          else if (element.value === 'Starter') {
            let status = this.replaceStatus(this.ticket.starter)
            this.dataSummary(element, status, this.ticket.starterNotes)
          }
          else if (element.value === 'Gauges (Dashboard)') {
            let status = this.replaceStatus(this.ticket.gauges)
            this.dataSummary(element, status, this.ticket.gaugesNotes)
          }
          else if (element.value === 'Oil Pressure') {
            let status = this.replaceStatus(this.ticket.oilPressure)
            this.dataSummary(element, status, this.ticket.oilPressureNotes)
          }
          else if (element.value === 'Wipers/Wash') {
            let status = this.replaceStatus(this.ticket.wipers)
            this.dataSummary(element, status, this.ticket.wipersNotes)
          }
          else if (element.value === 'Defroster/Heater') {
            let status = this.replaceStatus(this.ticket.heater)
            this.dataSummary(element, status, this.ticket.heaterNotes)
          }
          else if (element.value === 'Windows') {
            let status = this.replaceStatus(this.ticket.windows)
            this.dataSummary(element, status, this.ticket.windowsNotes)
          }
          else if (element.value === 'Horns') {
            let status = this.replaceStatus(this.ticket.horns)
            this.dataSummary(element, status, this.ticket.hornsNotes)
          }
          else if (element.value === 'Parking Brakes') {
            let status = this.replaceStatus(this.ticket.pBrakes)
            this.dataSummary(element, status, this.ticket.pBrakesNotes)
          }
          else if (element.value === 'Service Brakes') {
            let status = this.replaceStatus(this.ticket.sBrakes)
            this.dataSummary(element, status, this.ticket.sBrakesNotes)
          }
          else if (element.value === 'Leak Test') {
            let status = this.replaceStatus(this.ticket.leakTest)
            this.dataSummary(element, status, this.ticket.leakTestNotes)
          }
          else if (element.value === 'Lights') {
            let status = this.replaceStatus(this.ticket.lightsCab)
            this.dataSummary(element, status, this.ticket.lightsCabNotes)
          }
          else if (element.value === 'Lights and Reflectors') {
            let status = this.replaceStatus(this.ticket.lightsReflectors)
            this.dataSummary(element, status, this.ticket.lightsReflectorsNotes)
          }
          else if (element.value === 'Fuel Tank') {
            let status = this.replaceStatus(this.ticket.fuelTank)
            this.dataSummary(element, status, this.ticket.fuelTankNotes)
          }
          else if (element.value === 'Frame and Assembly') {
            let status = this.replaceStatus(this.ticket.frameAssembly)
            this.dataSummary(element, status, this.ticket.frameAssemblyNotes)
          }
          else if (element.value === 'Drive Line') {
            let status = this.replaceStatus(this.ticket.driveLine)
            this.dataSummary(element, status, this.ticket.driveLineNotes)
          }
          else if (element.value === 'Lug Nuts (3)') {
            let status = this.replaceStatus(this.ticket.lugNuts)
            this.dataSummary(element, status, this.ticket.lugNutsNotes)
          }
          else if (element.value === 'Wheels/Rims (5)') {
            let status = this.replaceStatus(this.ticket.wheelsRims)
            this.dataSummary(element, status, this.ticket.wheelsRimsNotes)
          }
          else if (element.value === 'Tires/Chains (5)') {
            let status = this.replaceStatus(this.ticket.tiresChains)
            this.dataSummary(element, status, this.ticket.tiresChainsNotes)
          }
          else if (element.value === 'Exhaust') {
            let status = this.replaceStatus(this.ticket.exhaust)
            this.dataSummary(element, status, this.ticket.exhaustNotes)
          }
          else if (element.value === 'Battery Box') {
            let status = this.replaceStatus(this.ticket.batteryBox)
            this.dataSummary(element, status, this.ticket.batteryBoxNotes)
          }
          else if (element.value === 'Mirros') {
            let status = this.replaceStatus(this.ticket.mirrors)
            this.dataSummary(element, status, this.ticket.mirrorsNotes)
          }
          else if (element.value === 'Air Line') {
            let status = this.replaceStatus(this.ticket.airLine)
            this.dataSummary(element, status, this.ticket.airLineNotes)
          }
          else if (element.value === 'Brake Accessories') {
            let status = this.replaceStatus(this.ticket.brakeAccessories)
            this.dataSummary(element, status, this.ticket.brakeAccessoriesNotes)
          }
          else if (element.value === 'Coupling Devices') {
            let status = this.replaceStatus(this.ticket.couplingDevices)
            this.dataSummary(element, status, this.ticket.couplingDevicesNotes)
          }
          else if (element.value === 'Fifth Wheel') {
            let status = this.replaceStatus(this.ticket.fifthWheel)
            this.dataSummary(element, status, this.ticket.fifthWheelNotes)
          }
          else if (element.value === 'Rear-End') {
            let status = this.replaceStatus(this.ticket.rearEnd)
            this.dataSummary(element, status, this.ticket.rearEndNotes)
          }
          else if (element.value === 'Muffler') {
            let status = this.replaceStatus(this.ticket.muffler)
            this.dataSummary(element, status, this.ticket.mufflerNotes)
          }
          else if (element.value === 'Front Axle') {
            let status = this.replaceStatus(this.ticket.frontAxle)
            this.dataSummary(element, status, this.ticket.frontAxleNotes)
          }
          else if (element.value === 'Suspension System') {
            let status = this.replaceStatus(this.ticket.suspensionSystem)
            this.dataSummary(element, status, this.ticket.suspensionSystemNotes)
          }
          else if (element.value === 'Transmission') {
            let status = this.replaceStatus(this.ticket.transmission)
            this.dataSummary(element, status, this.ticket.transmissionNotes)
          }
          else if (element.value === 'Brake Connections') {
            let status = this.replaceStatus(this.ticket.brakeConnections)
            this.dataSummary(element, status, this.ticket.brakeConnectionsNotes)
          }
          else if (element.value === 'Brakes') {
            let status = this.replaceStatus(this.ticket.brakes)
            this.dataSummary(element, status, this.ticket.brakesNotes)
          }
          else if (element.value === 'Coupling Devices') {
            let status = this.replaceStatus(this.ticket.coupling)
            this.dataSummary(element, status, this.ticket.couplingNotes)
          }
          else if (element.value === 'Coupling (King) Pin') {
            let status = this.replaceStatus(this.ticket.couplingDevicesTrailer)
            this.dataSummary(element, status, this.ticket.couplingDevicesNotesTrailer)
          }
          else if (element.value === 'Doors') {
            let status = this.replaceStatus(this.ticket.doors)
            this.dataSummary(element, status, this.ticket.doorsNotes)
          }
          else if (element.value === 'Hitch') {
            let status = this.replaceStatus(this.ticket.hitch)
            this.dataSummary(element, status, this.ticket.hitchNotes)
          }
          else if (element.value === 'Landing Gear') {
            let status = this.replaceStatus(this.ticket.landingGear)
            this.dataSummary(element, status, this.ticket.landingGearNotes)
          }
          else if (element.value === 'Lights All') {
            let status = this.replaceStatus(this.ticket.lights)
            this.dataSummary(element, status, this.ticket.lightsNotes)
          }
          else if (element.value === 'Reflectors/Reflect. Tape') {
            let status = this.replaceStatus(this.ticket.reflectors)
            this.dataSummary(element, status, this.ticket.reflectorsNotes)
          }
          else if (element.value === 'Roof') {
            let status = this.replaceStatus(this.ticket.roof)
            this.dataSummary(element, status, this.ticket.roofNotes)
          }
          else if (element.value === 'Suspension System') {
            let status = this.replaceStatus(this.ticket.suspension)
            this.dataSummary(element, status, this.ticket.suspensionNotes)
          }
          else if (element.value === 'Tarpaulin') {
            let status = this.replaceStatus(this.ticket.tarpaulin)
            this.dataSummary(element, status, this.ticket.tarpaulinNotes)
          }
          else if (element.value === 'Tires') {
            let status = this.replaceStatus(this.ticket.tires)
            this.dataSummary(element, status, this.ticket.tiresNotes)
          }
        });
      });
    }
  }

  replaceStatus(replace) {
    console.log(replace);

    if (replace == true)
      return 'Satisfactory';
    else
      return 'Unsatisfactory';
  }

  dataSummary(element: any, status: string, description: string) {
    element.status = status;
    element.description = description;
  }
}
