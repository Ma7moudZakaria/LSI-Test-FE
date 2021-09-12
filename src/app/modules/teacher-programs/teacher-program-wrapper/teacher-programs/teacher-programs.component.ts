import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ITeacherMyProgramsListModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-my-programs-list-model';
import { ITeacherMyProgramsRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-my-programs-request-model';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';

@Component({
  selector: 'app-teacher-programs',
  templateUrl: './teacher-programs.component.html',
  styleUrls: ['./teacher-programs.component.scss']
})
export class TeacherProgramsComponent implements OnInit {
  programFilter: ITeacherMyProgramsRequestModel= { take :2147483647 };
  programs:  ITeacherMyProgramsListModel[] | undefined;
  langEnum = LanguageEnum;
  isShowAddStuDutyDaysToProgram:boolean=false;
  day?:number;
  counter: number = 0
  countlength: number = 0;
  countDown: Subscription | undefined;
  counterTimer: number = 5
  tick = 1000;
  constructor(
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
    public translate : TranslateService,private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programFilter.skip = 0;
    this.programFilter.take = 2147483647;
    this.programFilter.teacherId =(JSON.parse(localStorage.getItem('user') || '{}') as Iuser).id  ;
    this.teacherProgramSubscriptionServicesService.getTeacherPrograms(this.programFilter || {}).subscribe(
      (res: BaseResponseModel) => {
         this.programs = res.data  as ITeacherMyProgramsListModel[] ;
 
      }, error => {
        this.alertify.error(error)
      }
    );
  }

}
