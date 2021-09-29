import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAddGroupExplanationModel } from 'src/app/core/interfaces/calls/iadd-group-explanation-model';
import { IAddStudentInGroupExplanationModel } from 'src/app/core/interfaces/calls/iadd-student-in-group-explanation-model';
import { IDetailsGroupExplanation } from 'src/app/core/interfaces/calls/idetails-group-explanation';
import { IUsersInBatchResponse } from 'src/app/core/interfaces/calls/iusers-in-batch-response';
import { IUsersInBatctRequest } from 'src/app/core/interfaces/calls/iusers-in-batct-request';
import { SearchItem } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { CallsService } from 'src/app/core/services/calls-services/calls.service';

@Component({
  selector: 'app-add-new-student-in-group',
  templateUrl: './add-new-student-in-group.component.html',
  styleUrls: ['./add-new-student-in-group.component.scss']
})
export class AddNewStudentInGroupComponent implements OnInit {
  @Output() hideform = new EventEmitter<boolean>();
  @Input() sendBatchDetails: IDetailsGroupExplanation | undefined;

  listSelectedUser: any = []
  resultMessage: BaseMessageModel = {};
  SearchItemList: SearchItem[] = [];
  langEnum = LanguageEnum;
  listSelectedStudent: SearchItem[] = []


  constructor(private groupExplanationServices: CallsService,
    private _alertify: AlertifyService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    console.log("sendBatchId", this.sendBatchDetails)
    this.getStudentList()
  }
  saveData() { }


  getStudentList() {
    let model: IUsersInBatctRequest =
    {
      batId: this.sendBatchDetails?.batId,
      studName: '',
      skip: 0,
      take: 2147483647
    }
    this.groupExplanationServices.getAllUsersInBatct(model).subscribe(res => {
      if (res.isSuccess) {
        let userslist = res.data as IUsersInBatchResponse[];
        this.SearchItemList = userslist.map(item => {
          let temp: SearchItem = {
            enUsrName: item?.studNameEn || '',//element.usrFullNameEn,
            arUsrName: item.studNameAr || '',
            usrAvatarUrl: item.avr || '',
            usrEmail: '',
            usrId: item.usrId || '',
            createdOn: ''
          };
          return temp;
        })



      }
      else {
      }
    },
      error => {
        console.log(error);
      });
  }

  checkNameSpace(str: string) {
    let reg = new RegExp(/^ *$/);
    return str.match(reg) === null;
  }


  addStudentSearch(event: SearchItem) {
    this.listSelectedStudent.push(event);

  }

  deleteStudentSearch(event: SearchItem) {

    let ind = this.listSelectedStudent.indexOf(event);
    this.listSelectedStudent.splice(ind, 1)
    this.SearchItemList.push(event)

  }


  sumbitAddStudent() {

    let model: IAddStudentInGroupExplanationModel =
    {
      batId: this.sendBatchDetails?.batId,
      groupExplanationId: this.sendBatchDetails?.groupId,
      groupMembers: this.listSelectedStudent.map(item => ({ studId: item.usrId })),
    }

    if (model.groupMembers) {
      this.groupExplanationServices.addStudentInGroupExplanation(model).subscribe((res) => {
        if (res.isSuccess) {
          this.backList();
          this._alertify.success(res.message || "");

        }
        else {
          this._alertify.error(res.message || "");
        }
      }, error => {

      });
    }
    else {
      this.resultMessage = {
        message: this.translate.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.FILDES_REQUIRED') : this.translate.instant('GENERAL.FILDES_REQUIRED'),// this.translate.currentLang === LanguageEnum.en ? "Please complete the missing information" : "برجاء اكمال البيانات",
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }
  backList() {
    this.hideform?.emit(false);
  }
}
