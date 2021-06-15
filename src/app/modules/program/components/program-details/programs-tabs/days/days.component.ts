import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramDayTasksDetails } from 'src/app/core/enums/programs/program-day-tasks-details.enum';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramBasicInfoDetails, IProgramDetails, IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ISaveProgramDayTaskDetailsModel } from 'src/app/core/interfaces/programs-interfaces/isave-program-day-task-Details-model';
import { IProgramDayTaskEncouragementLetter } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-encouragement-letter';
import { IProgramDayTaskHearing } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-hearing';
import { IProgramDayTaskLinking } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-linking';
import { IProgramDayTaskMemorize } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-memorize';
import { IProgramDayTaskReadExplanation } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-read-explanation';
import { IProgramDayTaskRepetition } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-repetition';
import { IProgramDayTaskReview } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-review';
import { IProgramDayTaskVideo } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-video';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {

  @Input() progs: IProgramDetails | undefined;
  @Input() progDays: Array<IProgramDutyDays> | undefined;

  programDayTasksDetails: Array<IProgramDayTasksModel> | undefined;
  dayTasksDetails: IProgramDayTasksModel | undefined;
  resMessage: BaseMessageModel = {};
  langEnum = LanguageEnum;
  selectedIndex?: Number;
  selectedIndexTasks?: Number;
  bookAttach = [1, 2, 3];
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
  testPhasedDetailsModel: IExam = { questions: [] };
  dailyTestDetailsModel: IExam = { questions: [] };
  recitationStudentsModel: IProgramBasicInfoDetails = {};
  programDayTaskDetails: ISaveProgramDayTaskDetailsModel = {};
  tasmeaModel: IProgramBasicInfoDetails = {};
  isView: boolean = false;

  constructor(private programDayTasksService: ProgramDayTasksService, public translate: TranslateService) { }

  ngOnInit(): void {
    // var DayTasksData = this.progDays == null ? [] : this.progDays;
    var DayTasksData = this.progs?.progDays == null ? [] : this.progs.progDays;

    this.getDayTasks(DayTasksData[0].id || '');
    this.selectedIndex = 0;
    this.selectedIndexTasks = 0;

  }

  getDayTasks(progDutyDaysId?: string) {
    this.programDayTasksService.getProgramDayTasks(progDutyDaysId || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksDetails = res.data as Array<IProgramDayTasksModel>;

        console.log("programDayTasksDetails ===========>", this.programDayTasksDetails);
      }
      else {
        this.resMessage = {
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

  getDayTasksDetails(dayTasksDetailsParameter: IProgramDayTasksModel) {
    this.dayTasksDetails = dayTasksDetailsParameter;
    switch (this.dayTasksDetails?.huffazTask) {
      case this.detailsTypeEnum.taskHearing:
        this.hearingTaskDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskReadExplanation:
        this.readExplanationDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskMemorize:
        this.memorizeDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskRepetition:
        this.repetitionDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskLinking:
        this.linkingDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        this.linkingDetailsModel.progId = this.progs?.progBaseInfo?.id;
        this.linkingDetailsModel.progDayOrder = this.progs?.progDays?.find(x => x.id == this.dayTasksDetails?.dutyDay)?.order;
        break;
      case this.detailsTypeEnum.TaskEncouragementLetter:
        this.encouragementLetterDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskVideo:
        this.videoDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskReview:
        this.reviewDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskRecitation:
        this.recitationDetailsModel = this.progs?.progBaseInfo || {};
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskRecitationStudents:
        this.recitationStudentsModel = this.progs?.progBaseInfo || {};
        this.isView = true;
        break;
      case this.detailsTypeEnum.TaskTestPhased:
        this.testPhasedDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        if (!this.testPhasedDetailsModel.questions)
          this.testPhasedDetailsModel.questions = [];
        break;
      case this.detailsTypeEnum.TaskDailyTest:
        this.dailyTestDetailsModel = JSON.parse(this.dayTasksDetails?.detailsTask || "{}");
        this.isView = true;
        if (!this.dailyTestDetailsModel.questions)
          this.dailyTestDetailsModel.questions = [];
        break;
      case this.detailsTypeEnum.TaskTasmea:
        this.tasmeaModel = this.progs?.progBaseInfo || {};
        this.isView = true;
        break;
      default:
        "";
        break;
    }
  }
}
