import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { IStudentProgramDutiesRequest } from 'src/app/core/interfaces/student-program-duties-interfaces/istudent-program-duties-request';
import { IStudentProgramDutiesResponse } from 'src/app/core/interfaces/student-program-duties-interfaces/istudent-program-duties-response';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { StudentProgDutiesServiceService } from 'src/app/core/services/student-prog-duties-services/student-prog-duties-service.service';

@Component({
  selector: 'app-student-program-duty-days',
  templateUrl: './student-program-duty-days.component.html',
  styleUrls: ['./student-program-duty-days.component.scss']
})
export class StudentProgramDutyDaysComponent implements OnInit {

  @Output() progDutyDayEvent = new EventEmitter<IProgramDutyDays>();
  studentId: string = "";
  batchId:string ='';
  studentProgramDutiesList?:IStudentProgramDutiesResponse[] | undefined;
  errorMessage?: string;
  resMessage: BaseMessageModel = {};
  defaultSelectedDay:number = 0;
  isCurrindex:number=0;
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    private studProgDutServic: StudentProgDutiesServiceService,
     private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
      })
  }

  onDayChange(){
    if (this.studentProgramDutiesList && this.studentProgramDutiesList[this.isCurrindex + 1].isCurr && this.isCurrindex + 1 < this.studentProgramDutiesList.length){
      this.onDayClick(this.studentProgramDutiesList[this.isCurrindex + 1]); this.defaultSelectedDay=this.isCurrindex + 1;
      this.isCurrindex=this.isCurrindex+1
    }
    else{ if (this.studentProgramDutiesList)this.onDayClick(this.studentProgramDutiesList[0]); this.defaultSelectedDay=0;}
  }

  onDayClick(event: IProgramDutyDays) {
    this.progDutyDayEvent.emit(event);
  }

}
