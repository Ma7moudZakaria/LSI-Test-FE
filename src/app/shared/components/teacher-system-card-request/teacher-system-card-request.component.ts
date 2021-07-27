import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IRejectTeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/ireject-teacher-system-subscription';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';

@Component({
  selector: 'app-teacher-system-card-request',
  templateUrl: './teacher-system-card-request.component.html',
  styleUrls: ['./teacher-system-card-request.component.scss']
})
export class TeacherSystemCardRequestComponent implements OnInit {

  @Output() rejectTeacherSystemSubscription = new EventEmitter<IRejectTeacherSystemSubscription>();
  @Output() acceptTeacherSystemSubscriptions = new EventEmitter<string[]>();

  @Input() teacherSystemSubscriptionModel: ITeacherSystemSubscription = {totalRows:0}

  teacherSystemSubscriptionIds:string[] | undefined
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  } 

  rejectTeacherSystemSubscriptionEve(teacherSubscripModel:ITeacherProgramSubscriptionModel){
    this.rejectTeacherSystemSubscription.emit(teacherSubscripModel);
  }
  
  acceptTeacherSystemSubscriptionEvent(){
    this.acceptTeacherSystemSubscriptions.emit(this.teacherSystemSubscriptionIds);
  }

  acceptTeacherSystemSubscription(id?:string){
    this.teacherSystemSubscriptionIds?.push(id || '');
    this.acceptTeacherSystemSubscriptionEvent();
  }
}
