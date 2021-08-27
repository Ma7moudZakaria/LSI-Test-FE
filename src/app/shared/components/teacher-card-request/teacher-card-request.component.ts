import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-card-request',
  templateUrl: './teacher-card-request.component.html',
  styleUrls: ['./teacher-card-request.component.scss']
})
export class TeacherCardRequestComponent implements OnInit {

  @Output() rejectTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();
  @Output() acceptTeacherProgramSubscription = new EventEmitter<ITeacherProgramSubscriptionModel>();
  @Output() teacherProgSubOutput = new EventEmitter<ITeacherStudentViewModel>();
  @Output() updateAllItemsChecked = new EventEmitter<boolean>();

  @Input() teacherSubscripModel: ITeacherProgramSubscriptionModel = {totalRows:0}
  @Input() typeEnum: TeacheProgramSubscriptionStatusEnum = TeacheProgramSubscriptionStatusEnum.Pending;

  tabTypeSelected = TeacheProgramSubscriptionStatusEnum;
  langEnum = LanguageEnum;
  requestDate:string | undefined;

  constructor(public translate : TranslateService) { }

  ngOnInit(): void {
    console.log("teacherSubscripModel", this.teacherSubscripModel)
    if (this.teacherSubscripModel?.requestDate) {
      let requestDateValue = new Date(this.teacherSubscripModel.requestDate || '');

      this.requestDate = new Date(requestDateValue.setDate(requestDateValue.getDate() + 1)).toISOString().slice(0, 10);
    }
  }
  showDetails(id?:string,JoinedProgName?:string){
    let UserModel:ITeacherStudentViewModel ={progName : JoinedProgName,usrId:id};
    this.teacherProgSubOutput.emit(UserModel)
  }
  rejectTeacherProgramSubscriptionEvent(){
    this.rejectTeacherProgramSubscription.emit(this.teacherSubscripModel);
  }

  acceptTeacherProgramSubscriptionEvent(){
    this.acceptTeacherProgramSubscription.emit(this.teacherSubscripModel);
  }
  updateAllItemsCheckedCall(){
    this.updateAllItemsChecked.emit();
  }
}
