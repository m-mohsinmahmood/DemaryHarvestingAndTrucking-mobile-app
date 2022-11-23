import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-engine-check',
  templateUrl: './engine-check.page.html',
  styleUrls: ['./engine-check.page.scss'],
})
export class EngineCheckPage implements OnInit {

  buffer = 1;
  progress = 0.6;

  indexArray: any[] = [0.2, 0.4, 0.6, 0.8, 1];
  engineCheckForm: FormGroup;

  checkItems = [
    {
      itemName: "air-compressor-engine",
      itemStatus: "",
      itemNotes: ""
    },
    {
      itemName: "beltsHoses",
      itemStatus: "",
      itemNotes: ""
    },
    {
      itemName: "radiator",
      itemStatus: "",
      itemNotes: ""
    }, {
      itemName: "steering",
      itemStatus: "",
      itemNotes: ""
    },
    {
      itemName: "oil",
      itemStatus: "",
      itemNotes: ""
    },
    {
      itemName: "fluid",
      itemStatus: "",
      itemNotes: ""
    },
    {
      itemName: "clutch",
      itemStatus: "",
      itemNotes: ""
    }
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.engineCheckForm = this.formBuilder.group({
      airCompressorSatisfactory: ['', [Validators.required]],
      airCompressorUnSatisfactory: ['', [Validators.required]],
      airCompressorNotes: ['', [Validators.required]],
      beltsHosesSatisfactory: ['', [Validators.required]],
      beltsHosesUnSatisfactory: ['', [Validators.required]],
      beltsHosesNotes: ['', [Validators.required]],
    });
  }

  isChecked(event) {
    for (let i = 0; i < this.checkItems.length; i++) {
      if (this.checkItems[i].itemName === event.target.name) {
        if (event.target.value === "unsatisfactory")
          this.checkItems[i].itemStatus = "unsatisfactory"
        else
          this.checkItems[i].itemStatus = "satisfactory"
      }
    }
  }

  addNotes(event) {
    for (let i = 0; i < this.checkItems.length; i++) {
      if (this.checkItems[i].itemName === event.target.name && this.checkItems[i].itemStatus === 'unsatisfactory') {
        this.checkItems[i].itemNotes = event.target.value
      }
    }
  }

  submitForm() {
    console.log(this.checkItems);
  }

}
