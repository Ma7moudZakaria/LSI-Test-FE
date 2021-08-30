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

  toggel : boolean | undefined;
  resMessage: BaseMessageModel = {};
  teacherProfileDetails = {} as ITeacherProfile;
  langEnum = LanguageEnum;
  starsSelected=5;
  adminView :boolean = false;
  constructor(
    private teacherProfileService: TeacherProfileService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getTeacherProfile()
    this.toggel = true;
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
  onCheckboxChange(){

    // this.progDetails!.progBaseInfo!.prgIsConExa = !this.progDetails?.progBaseInfo?.prgIsConExa;
    //
    // if (!this.progDetails?.progBaseInfo?.prgIsConExa){
    //   this.loadExams('');
    //   this.examFormsAddedToProgramList = [];
    //   this.getExamForms();
    // }
    // else if(this.progDetails?.progJoiExa && this.progDetails?.progJoiExa.length > 0){
    //   this.mapProgExams();
    //   this.getExamForms();
    // }
    //
    // this.programService.updateProgramExamToggle(this.progDetails?.progBaseInfo?.id || '').subscribe(res => {
    //     if (res.isSuccess) {
    //       this._alertify.success(res.message||"");
    //       this.progDetailsEvent.emit();
    //     }
    //     else {
    //       this._alertify.error(res.message || '');
    //     }
    //
    //   },
    //   error => {
    //     this._alertify.error(error || '');
    //   })

  }
}
