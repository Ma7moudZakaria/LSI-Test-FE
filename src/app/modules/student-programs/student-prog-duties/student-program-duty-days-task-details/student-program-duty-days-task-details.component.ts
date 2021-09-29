import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramDayTaskRecitationType } from 'src/app/core/enums/program-day-task-recitation-type.enum';
import { ProgramDayTasksDetails } from 'src/app/core/enums/programs/program-day-tasks-details.enum';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramBasicInfoDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ISaveProgramDayTaskDetailsModel } from 'src/app/core/interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { IProgramDayTaskEncouragementLetter } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-encouragement-letter';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { IProgramDayTaskLinking } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-linking';
import { IProgramDayTaskMemorize } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-memorize';
import { IProgramDayTaskReadExplanation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-read-explanation';
import { IProgramDayTaskRepetition } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-repetition';
import { IProgramDayTaskReview } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-review';
import { IProgramDayTaskTasmea } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-tasmea';
import { IProgramDayTaskVideo } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-video';
import { ISubmitStudentDutyDayTaskModel } from 'src/app/core/interfaces/student-program-duties-interfaces/isubmit-student-duty-day-task-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { StudentProgDutiesServiceService } from 'src/app/core/services/student-prog-duties-services/student-prog-duties-service.service';
import {RoleManagementService} from '../../../../core/services/role-management/role-management.service';
import {IStudentSubscriptionFilterRequestModel} from '../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';

@Component({
  selector: 'app-student-program-duty-days-task-details',
  templateUrl: './student-program-duty-days-task-details.component.html',
  styleUrls: ['./student-program-duty-days-task-details.component.scss']
})
export class StudentProgramDutyDaysTaskDetailsComponent implements OnInit {
  @Output() taskIsSaveEvent = new EventEmitter<boolean>();
  @Output() teacherCallPhonEvent = new EventEmitter<IProgramDayTaskTasmea>();
  @Input() taskDetails: IProgramDayTasksModel | undefined;
  detailsTypeEnum = ProgramDayTasksDetails;
  hearingTaskDetailsModel: IProgramDayTaskHearing = {};
  readExplanationDetailsModel: IProgramDayTaskReadExplanation = {};
  encouragementLetterDetailsModel: IProgramDayTaskEncouragementLetter = {};
  linkingDetailsModel: IProgramDayTaskLinking = {};
  memorizeDetailsModel: IProgramDayTaskMemorize = {};
  recitationDetailsModel: IProgramBasicInfoDetails = {};
  repetitionDetailsModel: IProgramDayTaskRepetition = {};
  reviewDetailsModel: IProgramDayTaskReview = {};
  videoDetailsModel: IProgramDayTaskVideo = {};
  testPhasedDetailsModel:IExam = { questions: [] };
  dailyTestDetailsModel: IExam = { questions: [] };
  recitationStudentsModel :IProgramDayTaskTasmea = {};
  programDayTaskDetails: ISaveProgramDayTaskDetailsModel={};
  tasmeaModel :IProgramDayTaskTasmea = {};
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  programDutyDaysTaskViewMoodEnum=ProgramDutyDaysTaskViewMoodEnum;
  resMessage: BaseMessageModel = {};
  isAnswer:boolean=true;
  isMndatory?:boolean=false;
  programDetails : IProgramDetails | undefined;
  progId?:string;
 
  
  @Output() openAddScientificProblem = new EventEmitter<boolean>();

  constructor(
    public languageService: LanguageService,
    private studentProgDutiesServiceService: StudentProgDutiesServiceService,
    public translate: TranslateService,
    private route: ActivatedRoute,
      private programService: ProgramService,
      public roleManagmentService: RoleManagementService
  ) { }

  async ngOnInit() {
    this.progId= this.route.snapshot.params.progId;
    this.resultMessage = {}
    await this.getprogramDayTaskDetails();
  }
  async ngOnChanges(changes: any){
    await this.getprogramDayTaskDetails();
    this.resultMessage = { }
  }

  async getprogramDayTaskDetails(){
    switch (this.taskDetails?.huffazTask) {
      case this.detailsTypeEnum.taskHearing:
       this.hearingTaskDetailsModel= JSON.parse(this.taskDetails?.detailsTask||"{}");
       this.isMndatory=this.hearingTaskDetailsModel.isMndatory;
        break;
      case this.detailsTypeEnum.TaskReadExplanation:
        this.readExplanationDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
        this.isMndatory=this.readExplanationDetailsModel.isMndatory;
        break;
        case this.detailsTypeEnum.TaskMemorize:
         this.memorizeDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
         this.isMndatory=this.memorizeDetailsModel.isMndatory;
          break;
          case this.detailsTypeEnum.TaskRepetition:
           this.repetitionDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
           this.isMndatory=this.repetitionDetailsModel.isMndatory;
            break;
           case this.detailsTypeEnum.TaskLinking:
            this.programDetails = await (await this.programService.getProgramDetails(this.progId || '').toPromise()).data
            this.linkingDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
            this.linkingDetailsModel.progId=this.programDetails?.progBaseInfo?.id;
            this.linkingDetailsModel.progDayOrder=this.programDetails?.progDays?.find(x=>x.id==this.taskDetails?.dutyDay)?.order;
            this.isMndatory=this.linkingDetailsModel.isMndatory;
            break;
            case this.detailsTypeEnum.TaskEncouragementLetter:
              this.encouragementLetterDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
              this.isMndatory=false;
              break;
              case this.detailsTypeEnum.TaskVideo:
               this.videoDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
               this.isMndatory=false;
                break;
                case this.detailsTypeEnum.TaskReview:
               this.reviewDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
               this.isMndatory=false;
                break;
                case this.detailsTypeEnum.TaskRecitation:
                  this.recitationDetailsModel=this.programDetails?.progBaseInfo||{};
                  break;
                  case this.detailsTypeEnum.TaskRecitationStudents:
                    this.programDetails = await (await this.programService.getProgramDetails(this.progId || '').toPromise()).data;
                    this.recitationStudentsModel.dutyDay=this.taskDetails.dutyDay;
                    this.recitationStudentsModel.prgRecitType= this.programDetails?.progBaseInfo?.prgRecitType;
                    this.recitationStudentsModel.progRecitationTimes=this.programDetails?.progBaseInfo?.prgRecitTms?
                    this.programDetails?.progBaseInfo?.prgRecitTms.filter(i => i.huffno !== ProgramDayTaskRecitationType.limited).map((item: any) => ({ progRecFrom: item.recitFrom, progRecTo: item.recitTo })) : [];
                    break;
                    case this.detailsTypeEnum.TaskTestPhased:
                    this.testPhasedDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
                    if (!this.testPhasedDetailsModel.questions)
                        this.testPhasedDetailsModel.questions = [];
                    break;
                    case this.detailsTypeEnum.TaskDailyTest:
                      this.dailyTestDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
                      if (!this.dailyTestDetailsModel.questions)
                        this.dailyTestDetailsModel.questions = [];
                      break;
                      case this.detailsTypeEnum.TaskTasmea:
                        this.programDetails = await (await this.programService.getProgramDetails(this.progId || '').toPromise()).data
                     this.tasmeaModel.dutyDay=this.taskDetails.dutyDay;
                    this.tasmeaModel.prgRecitType= this.programDetails?.progBaseInfo?.prgRecitType;
                    this.tasmeaModel.progRecitationTimes=this.programDetails?.progBaseInfo?.prgRecitTms?
                    this.programDetails?.progBaseInfo?.prgRecitTms.filter(i => i.huffno !== ProgramDayTaskRecitationType.limited).map((item: any) => ({ progRecFrom: item.recitFrom, progRecTo: item.recitTo })) : [];
                    break;
      default:
        "";
        break;
    }
  }

yes(){
  this.isAnswer=true;
  this.save();
}

no(){
  this.isAnswer=false;
  this.save();
}

  save(){
    this.resultMessage = {};
    let model : ISubmitStudentDutyDayTaskModel  = {
      progtaskId:this.taskDetails?.id,
      studId :this.route.snapshot.params.id,
      isAnsw:this.isAnswer,
      questionsExam:[],
      examScore:0,
    }
    if(this.detailsTypeEnum.TaskTestPhased===this.taskDetails?.huffazTask ){
      model.questionsExam=this.testPhasedDetailsModel.questions;
      model.examScore =this.testPhasedDetailsModel.scorePass
    }
    if(this.detailsTypeEnum.TaskDailyTest===this.taskDetails?.huffazTask)
    {model.questionsExam=this.dailyTestDetailsModel.questions;
      model.examScore =this.dailyTestDetailsModel.scorePass
    }

    this.studentProgDutiesServiceService.submitStudentTaskAnswer(model).subscribe(res => {
      if (res.isSuccess) {
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }  
        this.taskIsSave();    
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
    });
  }
  
  taskIsSave(){
     this.taskIsSaveEvent.emit()
    }

    teacherCallPhon(){
      this.teacherCallPhonEvent.emit(this.tasmeaModel)
    }
    newScientificProblem() {
        this.openAddScientificProblem.emit(true);
    }
}
