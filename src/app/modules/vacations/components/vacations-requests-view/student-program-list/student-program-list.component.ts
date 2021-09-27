import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {BaseResponseModel} from '../../../../../core/ng-model/base-response-model';
import {BaseConstantModel} from '../../../../../core/ng-model/base-constant-model';
import {LanguageEnum} from '../../../../../core/enums/language-enum.enum';
import {StudentProgramSubscriptionServicesService} from '../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {IStudentMyProgramsRequestModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import {IStudentPrograms} from '../../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import {IUser} from '../../../../../core/interfaces/auth-interfaces/iuser-model';
import {IProgramDutyDays} from '../../../../../core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-student-program-list',
  templateUrl: './student-program-list.component.html',
  styleUrls: ['./student-program-list.component.scss']
})
export class StudentProgramListComponent implements OnInit {
  selectedIndex=0;
  programs: any;
  @Output() selectedProgram =  new EventEmitter<IStudentPrograms>();
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  programFilter: IStudentMyProgramsRequestModel = { take :2147483647 };
  currentUser: IUser | undefined;

  constructor(private studentProgramSubscriptionService: StudentProgramSubscriptionServicesService,
              public translate : TranslateService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.programFilter.usrId = this.currentUser.id;
    this.loadPrograms();

  }

  loadPrograms() {
    this.programFilter.skip = 0;
    this.programFilter.take = 2147483647;
    this.studentProgramSubscriptionService.getStudentPrograms(this.programFilter).subscribe(
      (res: BaseResponseModel) => {
        this.programs = res.data as IStudentPrograms[];
      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }
  loadStudentPrograms(program?:IStudentPrograms){
    this.selectedProgram?.emit(program);
  }
}
