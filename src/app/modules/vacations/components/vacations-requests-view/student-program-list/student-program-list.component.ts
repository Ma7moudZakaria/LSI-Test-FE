import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {BaseResponseModel} from '../../../../../core/ng-model/base-response-model';
import {IprogramsModel} from '../../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseConstantModel} from '../../../../../core/ng-model/base-constant-model';
import {LanguageEnum} from '../../../../../core/enums/language-enum.enum';
import {StudentProgramSubscriptionServicesService} from '../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {IStudentMyProgramsRequestModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import {IStudentPrograms} from '../../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import {IUser} from '../../../../../core/interfaces/auth-interfaces/iuser-model';

@Component({
  selector: 'app-student-program-list',
  templateUrl: './student-program-list.component.html',
  styleUrls: ['./student-program-list.component.scss']
})
export class StudentProgramListComponent implements OnInit {
  selectedIndex=-1;
  programs: any;
  @Output() selectedProgram =  new EventEmitter<IStudentPrograms>();
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  programFilter: IStudentMyProgramsRequestModel = {};
  currentUser: IUser | undefined;

  constructor(private studentProgramSubscriptionService: StudentProgramSubscriptionServicesService,public translate : TranslateService) { }

  ngOnInit(): void {
    this.loadPrograms();

  }

  loadPrograms() {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.programFilter.usrId = this.currentUser.id;
    // if (programName != null || programName != "") { this.programFilterByName.name = programName; }
    // else{this.programFilterByName.name="";}
    this.programFilter.skip = 0;
    this.programFilter.take = 2147483647;
    this.studentProgramSubscriptionService.getStudentPrograms(this.programFilter).subscribe(
      (res: BaseResponseModel) => {
        this.programs = res.data as IStudentPrograms[];
        console.log("programs" , this.programs);
        // this.loadProgramMaterial({})
        this.selectedIndex=-1;
      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }
  loadProgramMaterial(program?:IprogramsModel){
    this.selectedProgram?.emit(program);
  }
}
