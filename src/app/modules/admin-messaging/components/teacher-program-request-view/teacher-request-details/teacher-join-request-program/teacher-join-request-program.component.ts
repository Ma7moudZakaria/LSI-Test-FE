import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { TeacherJionProgramTabRequestComponent } from './teacher-join-program-tab-request/teacher-join-program-tab-request.component';
import { ITeacherAdvancedSearchModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-advanced-search-model';

@Component({
  selector: 'app-teacher-join-request-program',
  templateUrl: './teacher-join-request-program.component.html',
  styleUrls: ['./teacher-join-request-program.component.scss']
})
export class TeacherJoinRequestProgramComponent implements OnInit {

  @ViewChild(TeacherJionProgramTabRequestComponent) loadTeatcherProg: TeacherJionProgramTabRequestComponent | undefined;

  @Output() rejectTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();

  showTap: string = 'Pending';
  itemTeacherReq: ITeacherProgramSubscriptionModel = {totalRows:0};
  openStuRejectOverlay: boolean = false
  openTeacherAdvancedSearch: boolean = false
 teacherFilterAdvancedSearch: ITeacherProgramSubscriptionFilterRequestModel ={skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };

  constructor() { }

  ngOnInit(): void {
  }

  openRejectRequest(event: ITeacherProgramSubscriptionModel) {
    this.itemTeacherReq = event;
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
  }

  closeRejectedRequest() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadTeatcherProg?.getTeachersProgramsSubscriptions();
  }

  closeOverlay() {
    this.openStuRejectOverlay = !this.openStuRejectOverlay;
    this.loadTeatcherProg?.getTeachersProgramsSubscriptions();

  }

  openTeacherAdvancedSearchPopup(event:ITeacherProgramSubscriptionFilterRequestModel) {
    this.openTeacherAdvancedSearch = !this.openTeacherAdvancedSearch;
    this.teacherFilterAdvancedSearch=event;
  }

  TeacherAdvancedSearch(event:ITeacherAdvancedSearchModel){
  if( event.isSearch==true) {this.loadTeatcherProg?.advancedSearch(event.teacherFilter ||undefined);}
  this.openTeacherAdvancedSearch = !this.openTeacherAdvancedSearch;
  }

}
