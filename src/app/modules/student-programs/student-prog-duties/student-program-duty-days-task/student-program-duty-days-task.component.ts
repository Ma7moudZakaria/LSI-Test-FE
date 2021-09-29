import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { IDayTasksProgramDutyDayRequestModel } from 'src/app/core/interfaces/student-program-duties-interfaces/iday-tasks-program-duty-day-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';
import { StudentProgDutiesServiceService } from 'src/app/core/services/student-prog-duties-services/student-prog-duties-service.service';

@Component({
  selector: 'app-student-program-duty-days-task',
  templateUrl: './student-program-duty-days-task.component.html',
  styleUrls: ['./student-program-duty-days-task.component.scss']
})
export class StudentProgramDutyDaysTaskComponent implements OnInit {

  @Output() taskDetailsEvent = new EventEmitter<IProgramDayTasksModel>();
  @Output()  taskIsEndEvent= new EventEmitter<boolean>();
  @Input() programDutyDay: IProgramDutyDays | undefined;
  programDayTasksLists = [] as Array<IProgramDayTasksModel>;
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  defaultSelectedDay:number = 0;
  isAnsweredIndex:number=0;

  constructor(
    public languageService: LanguageService,
    private studentProgDutiesServiceService: StudentProgDutiesServiceService,
    public translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProgramDutyDays();
  }

  getProgramDutyDays() {
    let model : IDayTasksProgramDutyDayRequestModel  = {
      stuId:this.route.snapshot.params.id,
      progDayId:this.programDutyDay?.id 
    }

    this.studentProgDutiesServiceService.getDayTasksProgramToStudent(model).subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksLists = res.data as Array<IProgramDayTasksModel>;
        this.isAnsweredIndex=this.programDayTasksLists.findIndex(x=>x.answered===false);
        if(this.isAnsweredIndex>=0)
       {
         this.setProgrmeDayTask(this.programDayTasksLists[this.isAnsweredIndex]); this.defaultSelectedDay=this.isAnsweredIndex;
        }
       else{
          this.setProgrmeDayTask(this.programDayTasksLists[0]);  this.defaultSelectedDay=0;
          this.isAnsweredIndex=this.programDayTasksLists.length;
        } 
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

  setProgrmeDayTask(item: IProgramDayTasksModel) {
    this.taskDetailsEvent.emit(item);
  }

  onTaskChange(){
    if (this.programDayTasksLists && this.isAnsweredIndex + 1 < this.programDayTasksLists.length){
      this.setProgrmeDayTask(this.programDayTasksLists[this.isAnsweredIndex + 1]); this.defaultSelectedDay=this.isAnsweredIndex + 1;
      this.isAnsweredIndex=this.isAnsweredIndex + 1;
      this.taskIsEnd(false);
    }
    else{
      this.taskIsEnd(true)
    }
  }
  taskIsEnd($event:boolean){ this.taskIsEndEvent.emit($event)}
}
