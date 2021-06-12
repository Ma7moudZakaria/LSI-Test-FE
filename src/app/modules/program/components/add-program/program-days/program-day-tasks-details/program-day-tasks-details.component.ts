import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramDayTasksDetails } from 'src/app/core/enums/programs/program-day-tasks-details.enum';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramBasicInfoDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ISaveProgramDayTaskDetailsModel } from 'src/app/core/interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { IProgramDayTaskEncouragementLetter } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-encouragement-letter';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { IProgramDayTaskLinking } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-linking';
import { IProgramDayTaskMemorize } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-memorize';
import { IProgramDayTaskReadExplanation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-read-explanation';
import { IProgramDayTaskRecitation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-recitation';
import { IProgramDayTaskRecitationStudents } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-recitation-students';
import { IProgramDayTaskRepetition } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-repetition';
import { IProgramDayTaskReview } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-review';
import { IProgramDayTaskVideo } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-video';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-program-day-tasks-details',
  templateUrl: './program-day-tasks-details.component.html',
  styleUrls: ['./program-day-tasks-details.component.scss']
})
export class ProgramDayTasksDetailsComponent implements OnInit {
  @Input() taskDetails: IProgramDayTasksModel | undefined;
  @Input() progamDetails: IProgramDetails | undefined;
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
  recitationStudentsModel :IProgramBasicInfoDetails = {};
  programDayTaskDetails: ISaveProgramDayTaskDetailsModel={};
  tasmeaModel :IProgramBasicInfoDetails = {};
  resultMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;

  constructor(
    public translate: TranslateService,
    private programDayTasksService:ProgramDayTasksService,
  ) { }

  ngOnInit(): void {
    // console.log(this.testPhasedDetailsModel);
    this.getprogramDayTaskDetails();
  }
  ngOnChanges(changes: any){
    this.getprogramDayTaskDetails();
  }

  save() {
    switch (this.taskDetails?.huffazTask) {
      case this.detailsTypeEnum.taskHearing:
        this.taskDetails.detailsTask = JSON.stringify(this.hearingTaskDetailsModel);
        break;
      case this.detailsTypeEnum.TaskReadExplanation:
        this.taskDetails.detailsTask = JSON.stringify(this.readExplanationDetailsModel);
        break;
        case this.detailsTypeEnum.TaskMemorize:
          this.taskDetails.detailsTask = JSON.stringify(this.memorizeDetailsModel);
          break;
          case this.detailsTypeEnum.TaskRepetition:
            this.taskDetails.detailsTask = JSON.stringify(this.repetitionDetailsModel);
            break;
           case this.detailsTypeEnum.TaskLinking:
            this.taskDetails.detailsTask = JSON.stringify(this.linkingDetailsModel);
            break;
            case this.detailsTypeEnum.TaskEncouragementLetter:
              this.taskDetails.detailsTask = JSON.stringify(this.encouragementLetterDetailsModel);
              break;
              case this.detailsTypeEnum.TaskVideo:
                this.taskDetails.detailsTask = JSON.stringify(this.videoDetailsModel);
                break;
                case this.detailsTypeEnum.TaskReview:
                this.taskDetails.detailsTask = JSON.stringify(this.reviewDetailsModel);
                break;
                case this.detailsTypeEnum.TaskRecitation:
                  this.taskDetails.detailsTask = JSON.stringify(this.recitationDetailsModel);
                  break;
                  case this.detailsTypeEnum.TaskRecitationStudents:
                    this.taskDetails.detailsTask = JSON.stringify(this.recitationStudentsModel);
                    break;
                    case this.detailsTypeEnum.TaskTestPhased:
                    this.taskDetails.detailsTask = JSON.stringify(this.testPhasedDetailsModel);
                    break;
                    case this.detailsTypeEnum.TaskDailyTest:
                    this.taskDetails.detailsTask = JSON.stringify(this.dailyTestDetailsModel);
                    break;
      default:
        this.taskDetails!.detailsTask = JSON.stringify("{}");
        break;
    }
    this.resultMessage = {};

    this.programDayTaskDetails.programDayTask = this.taskDetails?.id
    this.programDayTaskDetails.detailsTask = this.taskDetails?.detailsTask

    this.programDayTasksService.SaveProgramDayTaskDetails(this.programDayTaskDetails).subscribe(res => {
   let response = <BaseResponseModel>res;
   if (response.isSuccess) {
     this.resultMessage = {
       message: res.message || "",
       type: BaseConstantModel.SUCCESS_TYPE
     }
   
   }
   else {
     this.resultMessage = {
       message: res.message,
       type: BaseConstantModel.DANGER_TYPE
     }
   }
 },
   error => {
     this.resultMessage = {
       message: error,
       type: BaseConstantModel.DANGER_TYPE
     }
   }
 )
  }
  getprogramDayTaskDetails(){
    switch (this.taskDetails?.huffazTask) {
      case this.detailsTypeEnum.taskHearing:
       this.hearingTaskDetailsModel= JSON.parse(this.taskDetails?.detailsTask||"{}");
        break;
      case this.detailsTypeEnum.TaskReadExplanation:
        this.readExplanationDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
        break;
        case this.detailsTypeEnum.TaskMemorize:
         this.memorizeDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
          break;
          case this.detailsTypeEnum.TaskRepetition:
           this.repetitionDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
            break;
           case this.detailsTypeEnum.TaskLinking:
            this.linkingDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
            break;
            case this.detailsTypeEnum.TaskEncouragementLetter:
              this.encouragementLetterDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
              break;
              case this.detailsTypeEnum.TaskVideo:
               this.videoDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
                break;
                case this.detailsTypeEnum.TaskReview:
               this.reviewDetailsModel=JSON.parse(this.taskDetails?.detailsTask||"{}");
                break;
                case this.detailsTypeEnum.TaskRecitation:
                  this.recitationDetailsModel=this.progamDetails?.progBaseInfo||{};
                  break;
                  case this.detailsTypeEnum.TaskRecitationStudents:
                    this.recitationStudentsModel=this.progamDetails?.progBaseInfo||{};
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
                    this.tasmeaModel=this.progamDetails?.progBaseInfo||{};
                    break;
      default:
        "";
        break;
    }
  }
}
