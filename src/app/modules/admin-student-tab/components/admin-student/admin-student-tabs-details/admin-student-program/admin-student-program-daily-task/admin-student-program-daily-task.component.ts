import { Component,EventEmitter, Input, OnInit,Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentProgramBatchDaysRequestModel } from 'src/app/core/interfaces/student-management-tab-interfaces/istudent-program-batch-days-request-model';
import { IStudentProgramBatchDaysResponseModel } from 'src/app/core/interfaces/student-management-tab-interfaces/Istudent-program-batch-days-response-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminStudentTabService } from 'src/app/core/services/admin-student-tab-services/admin-student-tab.service';

@Component({
  selector: 'app-admin-student-program-daily-task',
  templateUrl: './admin-student-program-daily-task.component.html',
  styleUrls: ['./admin-student-program-daily-task.component.scss']
})
export class AdminStudentProgramDailyTaskComponent implements OnInit {
  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;
  @Output() userDayTaskModel = new EventEmitter<ITeacherStudentViewModel>();

  programDays :IStudentProgramBatchDaysResponseModel[] | undefined =[];
  selectedIndex = 0;
  studentProgramListFilterRequestModel: IStudentProgramBatchDaysRequestModel ={batId:"",studId:""} ;
  studentAndProgramModel :ITeacherStudentViewModel | undefined;
  langEnum = LanguageEnum;

  constructor(private adminStudentTabService: AdminStudentTabService,public translate: TranslateService) { }

  ngOnInit(): void {
  }

  filterByNameSearchKey(searchKey:string)
  {
    if(this.studentProgramListFilterRequestModel)
    {
    this.studentProgramListFilterRequestModel.dayNum = parseInt(searchKey);
    this.getAllStudentProgramDays();
    }
  }
  getAllStudentProgramDays() {
    this.studentAndProgramModel = this.studentIdOutput;
    if(this.studentProgramListFilterRequestModel )
    {
      this.studentProgramListFilterRequestModel.studId= this.studentAndProgramModel?.usrId;
      this.studentProgramListFilterRequestModel.batId = this.studentAndProgramModel?.batchId;

    this.adminStudentTabService.getStudentProgramDays(this.studentProgramListFilterRequestModel || {}).subscribe(res => {

      if (res.isSuccess) {
       this.programDays = res.data;
       if(this.studentAndProgramModel && this.programDays)
       {
       this.studentAndProgramModel.dayId=this.programDays[0].dayId;
       this.userDayTaskModel.emit(this.studentAndProgramModel);
       }
      }
      else {
      }
    },
      error => {
        console.log(error);
      });
    }
  }
  loadDayDetails(dayId: string) {
    
    if(this.studentAndProgramModel)
    {
    this.studentAndProgramModel.dayId=dayId;
    this.userDayTaskModel.emit(this.studentAndProgramModel);
    }
  }

}
