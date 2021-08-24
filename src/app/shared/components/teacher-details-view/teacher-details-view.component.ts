import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ITeacherProfile } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';
import {ITeacherDropOutRequestModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';
import {ITeacherStudentViewModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-teacher-details-view',
  templateUrl: './teacher-details-view.component.html',
  styleUrls: ['./teacher-details-view.component.scss']
})
export class TeacherDetailsViewComponent implements OnInit {
  @Output() hideUserDetails = new EventEmitter<boolean>();

  @Input() resiveUserId: ITeacherStudentViewModel | undefined;


  resMessage: BaseMessageModel = {};
  teacherProfileDetails = {} as ITeacherProfile;
  langEnum = LanguageEnum;
  starsSelected=5;
  constructor(
    private teacherProfileService: TeacherProfileService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getTeacherProfile()
  }
  hideUserDetailsView(){
    this.hideUserDetails.emit(false)
  }


  getTeacherProfile() {
      console.log('this.resiveUserId',this.resiveUserId);
    this.teacherProfileService.viewTeacherProfileDetails(this.resiveUserId?.usrId|| '').subscribe(res => {
      if (res.isSuccess) {
        this.teacherProfileDetails = res.data as ITeacherProfile;
        console.log("teacherProfileDetails", this.teacherProfileDetails)
      }
      else {
        this.resMessage =
        {
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
