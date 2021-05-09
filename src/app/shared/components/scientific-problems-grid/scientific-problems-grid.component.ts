import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';

@Component({
  selector: 'app-scientific-problems-grid',
  templateUrl: './scientific-problems-grid.component.html',
  styleUrls: ['./scientific-problems-grid.component.scss']
})
export class ScientificProblemsGridComponent implements OnInit {

  @Input() items: IScientificProblem[] = []
  @Input() numberPerRow: number = 3; //default is 3 for student
  @Input() userMode: ScientificProblemUsersEnum = ScientificProblemUsersEnum.Student;
  @Output() filterEvent = new EventEmitter<IScientificProblemFilter>();
  @Input() adminFilterRequestModel : IScientificProblemFilter = {};
  orderTypeToggel = 1;
  // @Output() sortEvent = new EventEmitter<>();

  ScientificProblemUsers = ScientificProblemUsersEnum 
  @Input() totalCount: number= 0;
  page = 1
  take = 1;


  constructor() { }

  ngOnInit(): void {
  }

  onAdminPageChange(){
    this.adminFilterRequestModel.skip = (this.page - 1) * this.take; 
    this.filterEvent.emit(this.adminFilterRequestModel);
  }

  sortByName(){
    this.adminFilterRequestModel.sortField = 'Name';
    this.adminFilterRequestModel.ordType = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.filterEvent.emit(this.adminFilterRequestModel);
  }

  sortByCreatedOn(){
    this.adminFilterRequestModel.sortField = 'CreatedOn';
    this.adminFilterRequestModel.ordType = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.filterEvent.emit(this.adminFilterRequestModel);
  }

  sortByNameOrderType(){
    if (this.adminFilterRequestModel.sortField === "Name" && this.adminFilterRequestModel.ordType == 1) {return 'asend'}
    if (this.adminFilterRequestModel.sortField === "Name" && this.adminFilterRequestModel.ordType == -1) {return 'desend'}

    return '';
  }

  sortByCreatedOnOrderType(){
    if (this.adminFilterRequestModel.sortField === "CreatedOn" && this.adminFilterRequestModel.ordType == 1) {return 'asend'}
    if (this.adminFilterRequestModel.sortField === "CreatedOn" && this.adminFilterRequestModel.ordType == -1) {return 'desend'}

    return '';
  }
}
