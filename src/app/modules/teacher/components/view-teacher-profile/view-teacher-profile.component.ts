import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ITeacherProfile } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';

@Component({
  selector: 'app-view-teacher-profile',
  templateUrl: './view-teacher-profile.component.html',
  styleUrls: ['./view-teacher-profile.component.scss']
})
export class ViewTeacherProfileComponent implements OnInit {
  listbadges = [1, 2]
  RouteParams = {} as string;
  teacherProfileDetails = {} as ITeacherProfile;
  currentUser: IUser | undefined;
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  birthdate: string | undefined;
  lang = LanguageEnum;
  constructor(
    private router: Router,
    public translate: TranslateService,
    private teacherProfileService: TeacherProfileService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.RouteParams = this.router.url;
    this.getTeacherProfile(this.currentUser.id);
  }

  getTeacherProfile(id: any) {
    this.teacherProfileService.viewTeacherProfileDetails(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.teacherProfileDetails = res.data as ITeacherProfile;

        let birthdate = new Date(this.teacherProfileDetails?.hijriBirthDate || '');
        if (!isNaN(birthdate.getTime())) {
          this.teacherProfileDetails.hijriBirthDate = new Date(birthdate.setDate(birthdate.getDate() + 1)).toISOString().slice(0, 10);
        }
        
        console.log("Teacher Profile Details =========>" , this.teacherProfileDetails)
        
        if (!this.teacherProfileDetails?.proPic) {
          this.teacherProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
        }
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

  navEditProf() {
    this.router.navigateByUrl('/teacher/update-teacher-profile');
  }
}
