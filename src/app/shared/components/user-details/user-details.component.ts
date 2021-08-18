import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ITeacherProfile } from 'src/app/core/interfaces/teacher-interfaces/iteacher-profile';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { TeacherProfileService } from 'src/app/core/services/teacher-profile/teacher-profile.service';
import {ITeacherDropOutRequestModel} from '../../../core/interfaces/teacher-drop-out-request-interfaces/iteacher-drop-out-request-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Output() hideUserDetails = new EventEmitter<boolean>();
  @Input() resiveUserId: string | undefined;
  resMessage: BaseMessageModel = {};
  teacherProfileDetails = {} as ITeacherProfile;

  starsSelected=5;
  constructor(
    private teacherProfileService: TeacherProfileService,

  ) { }

  ngOnInit(): void {
    // console.log("resiveUserId", this.resiveUserId);
    // this.getUserDetails();
    this.getTeacherProfile()
  }
  hideUserDetailsView(){
    this.hideUserDetails.emit(false)
  }


  getTeacherProfile() {
    console.log("innnnnnnnnnnnnnnnnnnn")

    this.teacherProfileService.viewTeacherProfileDetails(this.resiveUserId|| '').subscribe(res => {
      if (res.isSuccess) {
        this.teacherProfileDetails = res.data as ITeacherProfile;
    console.log("out")

              console.log("teacherProfileDetails", this.teacherProfileDetails)

        // console.log("Teacher Profile Details =========>" , this.teacherProfileDetails)

        // if (!this.teacherProfileDetails?.proPic) {
        //   this.teacherProfileDetails.proPic = '../../../../../assets/images/Profile.svg';
        // }
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
