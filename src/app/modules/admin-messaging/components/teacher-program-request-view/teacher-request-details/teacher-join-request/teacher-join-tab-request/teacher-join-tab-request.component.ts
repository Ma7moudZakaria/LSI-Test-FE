import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITeacherSystemSubscriptionFilterRequest } from 'src/app/core/interfaces/teacher-interfaces/iteacher-system-subscription-filter-request';
import { ITeacherSystemSubscription } from 'src/app/core/interfaces/teacher-interfaces/iteacher-systems-subscription';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';
import { TeacherSystemCardRequestComponent } from 'src/app/shared/components/teacher-system-card-request/teacher-system-card-request.component';

@Component({
  selector: 'app-teacher-join-tab-request',
  templateUrl: './teacher-join-tab-request.component.html',
  styleUrls: ['./teacher-join-tab-request.component.scss']
})
export class TeacherJionTabRequestComponent implements OnInit {
 
  resMessage: BaseMessageModel = {};
  listOfIds: string[] | undefined;
  teacherSystemFilter:ITeacherSystemSubscriptionFilterRequest | undefined;
  teacherSystemSubscription:Array<ITeacherSystemSubscription> | undefined;

  constructor(private lookupService: LookupService,
    private teacherService: TeacherProfileService,
    public translate: TranslateService,
    public languageService: LanguageService) { }

  ngOnInit(): void {
    this.setCurrentLang();
    this.getTeacherSystemSubscription();
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle() {
    this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
  }

  getTeacherSystemSubscription() {
    this.teacherSystemFilter = {};
    this.teacherService.getTeacherSystemSubscriptionAdvancedFilter(this.teacherSystemFilter).subscribe(res => {
      if (res.isSuccess) {
        this.teacherSystemSubscription = res.data as Array<ITeacherSystemSubscription>; 

       ;

        console.log("Teacher System Subscription :",this.teacherSystemSubscription);   
      }
      else {
        this.resMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }
}
