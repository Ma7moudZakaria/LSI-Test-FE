import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IAddProgramCategory } from 'src/app/core/interfaces/program-categories-interfaces/iadd-program-category';
import { IPrgoramCategrory } from 'src/app/core/interfaces/program-categories-interfaces/iprgoram-categrory';
import { ViewProgramCategoriesComponent } from './view-program-categories/view-program-categories.component';

@Component({
  selector: 'app-program-categories',
  templateUrl: './program-categories.component.html',
  styleUrls: ['./program-categories.component.scss']
})
export class ProgramCategoriesComponent implements OnInit {
  showAddForm = false;
  @ViewChild(ViewProgramCategoriesComponent) viewProgramCategories: ViewProgramCategoriesComponent | undefined;

  modelEdit = {} as IPrgoramCategrory;
  // @Output() addEditCoidition = new EventEmitter<IprogramPredefinedCustomConditionsModel>();
  constructor() { }

  ngOnInit(): void {

  }
  addEditProgramCategories(event: IPrgoramCategrory) {

    this.showAddForm = true;
    this.modelEdit = event
  }
  // sendProgramCategories() {

  //   this.viewProgramCategories?.getAllCategories()
  //   this.showAddForm = false
  // }
  closeForm() {
    this.showAddForm = false
    this.viewProgramCategories?.getAllCategories()
  }
}
