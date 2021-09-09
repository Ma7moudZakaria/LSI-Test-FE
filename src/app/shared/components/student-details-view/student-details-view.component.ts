import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseMessageModel } from '../../../core/ng-model/base-message-model';
import { ITeacherProfile } from '../../../core/interfaces/teacher-interfaces/iteacher-profile';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TeacherProfileService } from '../../../core/services/teacher-profile/teacher-profile.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseConstantModel } from '../../../core/ng-model/base-constant-model';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-student-details-view',
  templateUrl: './student-details-view.component.html',
  styleUrls: ['./student-details-view.component.scss']
})
export class StudentDetailsViewComponent implements OnInit {

  @Output() hideUserDetails = new EventEmitter<boolean>();
  @Input() resiveUserId: ITeacherStudentViewModel | undefined;
  @Input() adminView: boolean = false;
  toggel: boolean | undefined;
  resMessage: BaseMessageModel = {};
  studentProfileDetails = {} as IUserProfile;
  langEnum = LanguageEnum;
  starsSelected = 5;

  constructor(
    private studentProfileService: UserService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getStudentProfile()
  }
  hideUserDetailsView() {
    this.hideUserDetails.emit(false)
  }


  getStudentProfile() {
    // console.log("resiveUserId", this.resiveUserId?.usrId)
    this.studentProfileService.viewUserProfileDetails(this.resiveUserId?.usrId || '').subscribe(res => {
      if (res.isSuccess) {
        this.studentProfileDetails = res.data as IUserProfile;
        console.log("studentProfileDetails", this.studentProfileDetails)
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
  onCheckboxChange() { }
}

