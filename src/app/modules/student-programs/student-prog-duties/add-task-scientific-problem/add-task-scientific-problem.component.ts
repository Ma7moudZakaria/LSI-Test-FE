import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentSubscriptionFilterRequestModel} from '../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import {StudentProgramSubscriptionStatusEnum} from '../../../../core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import {BaseMessageModel} from '../../../../core/ng-model/base-message-model';
import {IStudentSubscriptionModel} from '../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import {StudentProgramSubscriptionServicesService} from '../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {ProgramService} from '../../../../core/services/program-services/program.service';
import {TranslateService} from '@ngx-translate/core';
import {IProgramFilterAdvancedRequest} from '../../../../core/interfaces/programs-interfaces/iprogram-filter-requests';
import {IprogramsModel} from '../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseConstantModel} from '../../../../core/ng-model/base-constant-model';
import {IStudentProgramDutiesResponse} from '../../../../core/interfaces/student-program-duties-interfaces/istudent-program-duties-response';
import {ActivatedRoute} from '@angular/router';
import {IStudentProgramDutiesRequest} from '../../../../core/interfaces/student-program-duties-interfaces/istudent-program-duties-request';
import {StudentProgDutiesServiceService} from '../../../../core/services/student-prog-duties-services/student-prog-duties-service.service';
import {IProgramDutyDays} from '../../../../core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-add-task-scientific-problem',
  templateUrl: './add-task-scientific-problem.component.html',
  styleUrls: ['./add-task-scientific-problem.component.scss']
})
export class AddTaskScientificProblemComponent implements OnInit {
  @Output() closeAddScientificProblem = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  @Input() filter: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  advancedSearchInputs = {} as IStudentSubscriptionFilterRequestModel
  resultMessage: BaseMessageModel = {};
  studProgsSubsItems: IStudentSubscriptionModel[] = [];




  studentId: string = "";
  batchId:string ='';
  studentProgramDutiesList?:IStudentProgramDutiesResponse[] | undefined;
  isCurrindex:number=0;
  defaultSelectedDay:number = 0;
  @Output() progDutyDayEvent = new EventEmitter<IProgramDutyDays>();


  constructor(private progSubsService: StudentProgramSubscriptionServicesService
    , private programService: ProgramService
    , public translate: TranslateService
              , private route: ActivatedRoute,private studProgDutServic: StudentProgDutiesServiceService
  ) {
  }

  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  ProgramsList: IprogramsModel[] = [];
  ngOnInit(): void {
    this.getAllProgram()
    this.studentId = this.route.snapshot.params.id;
    this.batchId = this.route.snapshot.params.batch;
    this.getStudentProgDuties();
    if (this.studentProgramDutiesList) {
      this.onDayClick(this.studentProgramDutiesList[0]);
    }
  }

  getStudentProgDuties() {
    let model : IStudentProgramDutiesRequest  = {
      batId:this.batchId,
      studId:this.studentId
    }
    this.studProgDutServic.getStudentProgDuties(model).subscribe(
      res => {
        if (res.isSuccess) {
          this.studentProgramDutiesList = res.data.programDutyDaysModel as IStudentProgramDutiesResponse[];
          this.isCurrindex=this.studentProgramDutiesList.findIndex(x=>x.isCurr===true);
          if(this.isCurrindex>=0)
          {this.onDayClick(this.studentProgramDutiesList[this.isCurrindex]); this.defaultSelectedDay=this.isCurrindex;}
          else{this.isCurrindex=this.studentProgramDutiesList.findIndex(x=>x.isNex===true) -1;
            this.onDayClick(this.studentProgramDutiesList[0]); this.defaultSelectedDay=0;}
        }
        else {
          this.resultMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
  }
  onDayClick(event: IProgramDutyDays) {
    this.progDutyDayEvent.emit(event);
  }
  closeStuAdvancedSearch() {
    this.filter.usrName = '';
    this.filter.progId = '';
    this.filter.numberRequest = undefined
    this.filter.fromDate = undefined
    this.filter.toDate = undefined
    this.filter.skip = 0
    this.filter.take = 9
    this.filter.page = 1
    this.filter.sortField = '';
    this.closeAddScientificProblem.emit(this.filter)
  }


  sendAdvancedSearch() {

      this.closeAddScientificProblem.emit()

  }


  getAllProgram() {
    this.programService.getProgramAdvancedFilter(this.programsbyAdvancedFilter || {}).subscribe(res => {

      if (res.isSuccess) {
        this.ProgramsList = res.data;
        console.log(this.ProgramsList)

      }
      else {

      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

}
