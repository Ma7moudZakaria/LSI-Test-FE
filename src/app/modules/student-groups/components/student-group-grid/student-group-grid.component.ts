import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IGroupExplanationsStudentViewRequest } from 'src/app/core/interfaces/calls/igroup-explanations-student-view-request';
import { IGroupExplanationsStudentViewResponse } from 'src/app/core/interfaces/calls/igroup-explanations-student-view-response';

@Component({
  selector: 'app-student-group-grid',
  templateUrl: './student-group-grid.component.html',
  styleUrls: ['./student-group-grid.component.scss']
})
export class StudentGroupGridComponent implements OnInit {
  @Input() numberPerRow: number = 4;
  @Input() totalCount: number = 0;
  @Input() groupResponseList: IGroupExplanationsStudentViewResponse[] | undefined;
  @Input() groupExplanationsStuViewRequest: IGroupExplanationsStudentViewRequest = { skip: 0, take: 9, page: 1 };
  @Output() studentFilterEvent = new EventEmitter<IGroupExplanationsStudentViewRequest>();

  langEnum = LanguageEnum;
  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  page = 1


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.groupExplanationsStuViewRequest.sortField = 'groupName';
  }

  sortStudentByName() {
    this.groupExplanationsStuViewRequest.sortField = 'groupName';
    this.groupExplanationsStuViewRequest.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;

    this.studentFilterEvent.emit(this.groupExplanationsStuViewRequest);
  }
  sortStudentByNameOrderType() {
    if ((this.groupExplanationsStuViewRequest.sortField === 'groupName') && this.groupExplanationsStuViewRequest.sortOrder == 1) { return 'asend' }
    if ((this.groupExplanationsStuViewRequest.sortField === 'groupName') && this.groupExplanationsStuViewRequest.sortOrder == -1) { return 'desend' }

    return '';
  }

  sortStudentRequestDate() {
    this.groupExplanationsStuViewRequest.sortField = 'creationdate';
    this.groupExplanationsStuViewRequest.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentFilterEvent.emit(this.groupExplanationsStuViewRequest);
  }


  sortStudentRequestDateOrderType() {
    if (this.groupExplanationsStuViewRequest.sortField === 'creationdate' && this.groupExplanationsStuViewRequest.sortOrder == 1) { return 'asend' }
    if (this.groupExplanationsStuViewRequest.sortField === 'creationdate' && this.groupExplanationsStuViewRequest.sortOrder == -1) { return 'desend' }

    return '';
  }
  onStudentPageChange() {
    // this.groupExplanationsStuViewRequest.skip = (this.groupExplanationsStuViewRequest.page - 1) * (this.groupExplanationsStuViewRequest.take || 0);
    this.studentFilterEvent.emit(this.groupExplanationsStuViewRequest);

  }


}
