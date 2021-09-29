import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IGroupExplanationsStudentViewRequest } from 'src/app/core/interfaces/calls/igroup-explanations-student-view-request';
import { IGroupExplanationsStudentViewResponse } from 'src/app/core/interfaces/calls/igroup-explanations-student-view-response';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { CallsService } from 'src/app/core/services/calls-services/calls.service';

@Component({
  selector: 'app-student-groups-view',
  templateUrl: './student-groups-view.component.html',
  styleUrls: ['./student-groups-view.component.scss']
})
export class StudentGroupsViewComponent implements OnInit {

  groupExplanationsStuViewRequest: IGroupExplanationsStudentViewRequest = { skip: 0, take: 9, page: 1 };
  responseList: IGroupExplanationsStudentViewResponse[] = [];
  resultMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  langEnum = LanguageEnum;
  totalCount = 0;
  numberPerRow: number = 4;
  constructor(
    private groupExplanationServices: CallsService,
    public translate: TranslateService,
  ) { }
  ngOnInit(): void {
    this.groupExplanationsStuViewRequest.sortField = 'groupName';
    this.getStudentViewtGroupExplanation()
  }
  getStudentViewtGroupExplanation() {

    this.groupExplanationServices.getStudentViewtGroupExplanation(this.groupExplanationsStuViewRequest).subscribe(res => {
      if (res.isSuccess) {
        this.responseList = res.data;
        this.totalCount = res.count ? res.count : 0;
        console.log("responseList", this.responseList)
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {


    })
  }

  filterRequestStudent(event: IGroupExplanationsStudentViewRequest) {
    this.groupExplanationsStuViewRequest = event;
    this.getStudentViewtGroupExplanation();
  }
  filterByText(searchKey: string) {
    this.groupExplanationsStuViewRequest.techName = searchKey;
    this.getStudentViewtGroupExplanation();
  }

  reLoadPage() {
    this.getStudentViewtGroupExplanation();
  }
}
