import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseMessageModel } from '../../../core/ng-model/base-message-model';
import { ITeacherProfile } from '../../../core/interfaces/teacher-interfaces/iteacher-profile';
import { LanguageEnum } from '../../../core/enums/language-enum.enum';
import { TeacherProfileService } from '../../../core/services/teacher-profile/teacher-profile.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseConstantModel } from '../../../core/ng-model/base-constant-model';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

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
  teacherProfileDetails = {} as ITeacherProfile;
  langEnum = LanguageEnum;
  starsSelected = 5;
  constructor(
    private teacherProfileService: TeacherProfileService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getTeacherProfile()
  }
  hideUserDetailsView() {
    this.hideUserDetails.emit(false)
  }


  getTeacherProfile() {
    this.teacherProfileService.viewTeacherProfileDetails(this.resiveUserId?.usrId || '').subscribe(res => {
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
  onCheckboxChange() { }
}

