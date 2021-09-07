import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
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
import { IProgramDayTaskVideo } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-video';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';

@Component({
  selector: 'app-student-program-duty-days-task-details',
  templateUrl: './student-program-duty-days-task-details.component.html',
  styleUrls: ['./student-program-duty-days-task-details.component.scss']
})
export class StudentProgramDutyDaysTaskDetailsComponent implements OnInit {

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
  programDutyDaysTaskViewMoodEnum=ProgramDutyDaysTaskViewMoodEnum;
  
  constructor(
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getprogramDayTaskDetails();
    this.resultMessage = {
    }
  }
  ngOnChanges(changes: any){
    this.getprogramDayTaskDetails();
    this.resultMessage = {
    }
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
            this.linkingDetailsModel.progId=this.progamDetails?.progBaseInfo?.id;
            this.linkingDetailsModel.progDayOrder=this.progamDetails?.progDays?.find(x=>x.id==this.taskDetails?.dutyDay)?.order;
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

  save(){
    
  }

}
