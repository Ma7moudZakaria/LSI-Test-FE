import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { TeacherSystemSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum';
import { IRejectTeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/ireject-teacher-system-subscription';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-system-card-request',
  templateUrl: './teacher-system-card-request.component.html',
  styleUrls: ['./teacher-system-card-request.component.scss']
})
export class TeacherSystemCardRequestComponent implements OnInit {

  @Output() rejectTeacherSystemSubscription = new EventEmitter<ITeacherSystemSubscription>();
  @Output() acceptTeacherSystemSubscription = new EventEmitter<ITeacherSystemSubscription>();
  @Output() updateAllItemsChecked = new EventEmitter<boolean>();

  @Input() teacherSystemSubscriptionModel: ITeacherSystemSubscription = { totalRows : 0} ;

  @Input() typeEnum: TeacherSystemSubscriptionStatusEnum = TeacherSystemSubscriptionStatusEnum.Pending;
  typeTeacheEnum = TeacherSystemSubscriptionStatusEnum;

  teacherSystemSubscriptionIds:string[] | undefined;
  langEnum = LanguageEnum;
  requestDate:string | undefined;
  @Output() teacherJoinInput = new EventEmitter<ITeacherStudentViewModel>();
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    console.log("teacherSystemSubscriptionModel : ", this.teacherSystemSubscriptionModel)
    if (this.teacherSystemSubscriptionModel?.requestDate) {
      let requestDateValue = new Date(this.teacherSystemSubscriptionModel.requestDate || '');

      this.requestDate = new Date(requestDateValue.setDate(requestDateValue.getDate() + 1)).toISOString().slice(0, 10);
    }

    if (!this.teacherSystemSubscriptionModel?.avatarLink) {
      this.teacherSystemSubscriptionModel.avatarLink = '../../../../../assets/images/Profile.svg';
    }
  }

  openDetails(id:string,JoinprogName: string){
    let UserModel:ITeacherStudentViewModel ={progName : JoinprogName,usrId:id};
    this.teacherJoinInput.emit(UserModel)
  }
  rejectTeacherSystemSubscriptionEvent(teacherSubscripModel:ITeacherSystemSubscription){
    this.rejectTeacherSystemSubscription.emit(teacherSubscripModel);
  }
  
  acceptTeacherSystemSubscriptionEvent(){
    this.acceptTeacherSystemSubscription.emit(this.teacherSystemSubscriptionModel);
  }
  updateAllItemsCheckedCall(){
    this.updateAllItemsChecked.emit();
  }
}
