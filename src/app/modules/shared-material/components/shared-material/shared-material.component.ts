import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-shared-material',
  templateUrl: './shared-material.component.html',
  styleUrls: ['./shared-material.component.scss']
})
export class SharedMaterialComponent implements OnInit {
  checked: boolean = false;
  indeterminate: boolean = false;
  // labelPosition: 'before' | 'after' = 'after';
  disabled: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
