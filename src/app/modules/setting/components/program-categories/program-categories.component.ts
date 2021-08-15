import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-program-categories',
  templateUrl: './program-categories.component.html',
  styleUrls: ['./program-categories.component.scss']
})
export class ProgramCategoriesComponent implements OnInit {
  showAddForm = false;
  // @Output() addEditCoidition = new EventEmitter<IprogramPredefinedCustomConditionsModel>();
  constructor() { }

  ngOnInit(): void {

  }
  addProgramCategoresEvent() {
    this.showAddForm = true
  }


}
