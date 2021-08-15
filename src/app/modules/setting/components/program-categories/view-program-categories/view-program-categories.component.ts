import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-program-categories',
  templateUrl: './view-program-categories.component.html',
  styleUrls: ['./view-program-categories.component.scss']
})
export class ViewProgramCategoriesComponent implements OnInit {
  @Output() addProgramCategoresEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  AddCategories() {
    this.addProgramCategoresEvent.emit()

  }
}
