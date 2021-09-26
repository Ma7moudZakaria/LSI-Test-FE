import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { CallsService } from 'src/app/core/services/calls-services/calls.service';
import { IGroupExplanationsJoinRequest } from 'src/app/core/interfaces/calls/igroup-explanations-join-request';
import { IGroupExplanationsJoinResponse } from 'src/app/core/interfaces/calls/igroup-explanations-join-response';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { IDetailsGroupExplanation } from 'src/app/core/interfaces/calls/idetails-group-explanation';
@Component({
  selector: 'app-teacher-recitation-group-selected',
  templateUrl: './teacher-recitation-group-selected.component.html',
  styleUrls: ['./teacher-recitation-group-selected.component.scss']
})
export class TeacherRecitationGroupSelectedComponent implements OnInit {
  @Output() rejectedRequestId = new EventEmitter<string>();
  @Output() addStudentRequest = new EventEmitter<boolean>();


  groupExplanationsJoinRequest: IGroupExplanationsJoinRequest = { skip: 0, take: 2147483647 }
  detailsGroupExplanation: IDetailsGroupExplanation | undefined;
  responseList: IGroupExplanationsJoinResponse[] = [];
  resultMessage: BaseMessageModel = {};

  currentUser: IUser | undefined;
  langEnum = LanguageEnum;

  ids?: string[] = [];
  constructor
    (
      private groupExplanationServices: CallsService,
      public translate: TranslateService,
      private alertify: AlertifyService
    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
  }

  // getListJoinRequestes() {
  //   this.groupExplanationsJoinRequest = {
  //     techId: this.currentUser?.id,
  //     status: '',
  //     skip: 0,
  //     take: 2147483647
  //   }
  //   this.groupExplanationServices.getJoinRequestGroupExplanation(this.groupExplanationsJoinRequest).subscribe(res => {
  //     if (res.isSuccess) {
  //       this.responseList = res.data;
  //       console.log("responseList", this.responseList)
  //     }
  //     else {
  //       this.resultMessage = {
  //         message: res.message,
  //         type: BaseConstantModel.DANGER_TYPE
  //       }
  //     }
  //   }, error => {


  //   })
  // }
  removeStudentGroupExplanation(Id: any) {
    this.groupExplanationServices.removeStudentGroupExplanation(Id).subscribe(res => {
      if (res.isSuccess) {
        this.alertify.success(res.message || '');
        this.getDetailsGroupExplanation(this.detailsGroupExplanation?.groupId || '');
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

  acceptGroupRequest(Id: any) {
    this.ids = [];
    this.ids?.push(Id || '');
    this.groupExplanationServices.acceptGroupRequest(this.ids || []).subscribe(res => {
      if (res.isSuccess) {
        this.alertify.success(res.message || '');
        this.getDetailsGroupExplanation(this.detailsGroupExplanation?.groupId || '');
      }
      else {
        this.alertify.error(res.message || '');
      }
    }, error => {


    })
  }
  rejectedGroupRequest(Id: any) {
    this.rejectedRequestId.emit(Id)
  }

  getDetailsGroupExplanation(Id: string) {
    // not data 
    if (!Id) {
      this.detailsGroupExplanation = undefined;
      return;
    }

    this.groupExplanationServices.getGroupExplanationDetails(Id).subscribe(res => {
      if (res.isSuccess) {
        this.detailsGroupExplanation = res.data as IDetailsGroupExplanation;
        console.log("detailsGroupExplanation", this.detailsGroupExplanation)
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


  addNewStudent() {
    this.addStudentRequest.emit(true)
  }












}
