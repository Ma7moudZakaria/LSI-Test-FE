import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { IUserScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iuser-scientific-problem-filter';
import { SettingRoutingModule } from 'src/app/modules/setting/setting-routing.module';

@Component({
  selector: 'app-scientific-problems-grid',
  templateUrl: './scientific-problems-grid.component.html',
  styleUrls: ['./scientific-problems-grid.component.scss']
})
export class ScientificProblemsGridComponent implements OnInit {

  @Output() adminFilterEvent = new EventEmitter<IScientificProblemFilter>();
  @Output() userFilterEvent = new EventEmitter<IUserScientificProblemFilter>();
  @Output() deleteUserScProb = new EventEmitter<string>();
  @Input() userMode: ScientificProblemUsersEnum = ScientificProblemUsersEnum.Student;
  @Input() adminFilterRequestModel : IScientificProblemFilter = {skip : 0, take: 0};
  @Input() userFilterRequestModel : IUserScientificProblemFilter = {skip : 0, take: 0};
  @Input() numberPerRow: number = 3; //default is 3 for student
  @Input() items: IScientificProblem[] = []
  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  // @Output() sortEvent = new EventEmitter<>();

  scientificProblemUsers = ScientificProblemUsersEnum 
  @Input() totalCount: number= 0;
  page = 1


  constructor() { }

  ngOnInit(): void {
  }

  onAdminPageChange(){
    this.adminFilterRequestModel.skip = (this.page - 1) * this.adminFilterRequestModel.take; 
    this.adminFilterEvent.emit(this.adminFilterRequestModel);
  }

  onUserPageChange(){
    this.userFilterRequestModel.skip = (this.page - 1) * this.userFilterRequestModel.take; 
    this.userFilterEvent.emit(this.userFilterRequestModel);
  }

  sortByName(){
    this.adminFilterRequestModel.sortField = 'Name';
    this.adminFilterRequestModel.ordType = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.adminFilterEvent.emit(this.adminFilterRequestModel);
  }

  sortByCreatedOn(){
    this.adminFilterRequestModel.sortField = 'CreatedOn';
    this.adminFilterRequestModel.ordType = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.adminFilterEvent.emit(this.adminFilterRequestModel);
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

  /**user */
  userSortByCreatedOn(){
    this.userFilterRequestModel.oType = this.userOrderTypeToggel = this.userOrderTypeToggel ? false : true;
    this.userFilterEvent.emit(this.userFilterRequestModel);
  }

  userSortByCreatedOnOrderType(){
    if (this.userFilterRequestModel.oType) {return true}
    else {return false}
  }

  deleteScientificProblem(id:string){
    this.deleteUserScProb.emit(id);
  }

}
