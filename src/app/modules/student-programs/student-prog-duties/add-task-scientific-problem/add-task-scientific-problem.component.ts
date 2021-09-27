import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseMessageModel} from '../../../../core/ng-model/base-message-model';
import {StudentProgramSubscriptionServicesService} from '../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {TranslateService} from '@ngx-translate/core';
import {IprogramsModel} from '../../../../core/interfaces/programs-interfaces/iprograms-model';
import {ActivatedRoute} from '@angular/router';
import {IProgramDayTasksModel} from '../../../../core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import {LanguageEnum} from '../../../../core/enums/language-enum.enum';
import {Iuser} from '../../../../core/interfaces/user-interfaces/iuser';
import {BaseResponseModel} from '../../../../core/ng-model/base-response-model';
import {IStudentPrograms} from '../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import {IStudentMyProgramsRequestModel} from '../../../../core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import {ScientificProblemService} from '../../../../core/services/scientific-problem-services/scientific-problem.service';
import {BaseConstantModel} from '../../../../core/ng-model/base-constant-model';
import {AlertifyService} from '../../../../core/services/alertify-services/alertify.service';
import {ICreateScientificProblem} from '../../../../core/interfaces/scientific-problrm/icreate-scientific-problem';

@Component({
  selector: 'app-add-task-scientific-problem',
  templateUrl: './add-task-scientific-problem.component.html',
  styleUrls: ['./add-task-scientific-problem.component.scss']
})
export class AddTaskScientificProblemComponent implements OnInit {
  @Output() closeAddScientificProblem = new EventEmitter<boolean>();
  resultMessage: BaseMessageModel = {};
  batchId?:string ;
  @Input() dutyDayFromParent: any ;
  @Input() dayTaskFromParent?:IProgramDayTasksModel;
  langEnum = LanguageEnum;
  programFilter: IStudentMyProgramsRequestModel = { take :2147483647 };
  ProgramsList: IprogramsModel[] = [];
  programs: IStudentPrograms[] | undefined;
  programBatch?: IStudentPrograms;
  userId?: string;
  question?: string;
  isSubmit = false;
  constructor(public translate: TranslateService
              , private route: ActivatedRoute
              , private studentProgramSubscriptionService: StudentProgramSubscriptionServicesService
              ,private  scientificProblemService: ScientificProblemService
              ,private alertify: AlertifyService
  ) {
  }

  ngOnInit(): void {
    this.batchId = this.route.snapshot.params.batch;
    this.userId = (JSON.parse(localStorage.getItem('user') || '{}') as Iuser).id
    this.loadPrograms();
  }
  loadPrograms() {
    this.programFilter.skip = 0;
    this.programFilter.take = 2147483647;
    this.programFilter.usrId = this.userId;
    this.studentProgramSubscriptionService.getStudentPrograms(this.programFilter).subscribe(
      (res: BaseResponseModel) => {
        this.programs = res.data as IStudentPrograms[];
        this.programBatch = this.programs.find(data => data.batId === this.batchId);
      })
  }


  closeScientificProblemOverLay() {
    this.closeAddScientificProblem.emit(true)
  }


  addScientificProblem() {
    this.isSubmit = true;
    let model :ICreateScientificProblem = {
      batId : this.batchId,
      usrId : this.userId,
      task : this.dayTaskFromParent?.dayTask,
      day : this.dayTaskFromParent?.dutyDay,
      question : this.question
    }
    if(model.question ==null)return;
    this.scientificProblemService.createScientificProblem(model).subscribe(res =>{
      if(res.isSuccess){
        this.alertify.success(res.message || '');
        this.closeAddScientificProblem.emit();
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        };
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      };

    })

  }

}
