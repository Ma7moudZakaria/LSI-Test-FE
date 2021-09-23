import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IGroupExplanationsTeacherViewRequest } from 'src/app/core/interfaces/calls/igroup-explanations-teacher-view-request';
import { IGroupExplanationsTeacherViewResponse } from 'src/app/core/interfaces/calls/igroup-explanations-teacher-view-response';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { CallsService } from 'src/app/core/services/calls-services/calls.service';

@Component({
  selector: 'app-teacher-recitation-groups',
  templateUrl: './teacher-recitation-groups.component.html',
  styleUrls: ['./teacher-recitation-groups.component.scss']
})
export class TeacherRecitationGroupsComponent implements OnInit {
  @Output() showAddGroup = new EventEmitter<boolean>();
  @Output() sendGroupId = new EventEmitter<string>();

  groupExplanationsTeacherViewRequest: IGroupExplanationsTeacherViewRequest = { skip: 0, take: 2147483647 }
  responseList: IGroupExplanationsTeacherViewResponse[] = [];
  resultMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  langEnum = LanguageEnum;
  constructor(
    private groupExplanationServices: CallsService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getTeacherViewtGroupExplanation()
  }



  addNewGroup() {
    this.showAddGroup.emit(true)
  }

  getTeacherViewtGroupExplanation() {
    this.groupExplanationsTeacherViewRequest.techId = this.currentUser?.id

    this.groupExplanationServices.getTeacherViewtGroupExplanation(this.groupExplanationsTeacherViewRequest).subscribe(res => {
      if (res.isSuccess) {
        this.responseList = res.data;
        this.sendIdForDetailsGroupExplanation(this.responseList[0].id)

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
  filterByText(searchKey: string) {
    this.groupExplanationsTeacherViewRequest.name = searchKey;
    this.getTeacherViewtGroupExplanation();
  }

  sendIdForDetailsGroupExplanation(Id: any) {
    this.sendGroupId.emit(Id)

  }









}

