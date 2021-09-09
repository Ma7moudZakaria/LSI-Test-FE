import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentProgramBatchDayTasksRequestModel } from 'src/app/core/interfaces/student-management-tab-interfaces/istudent-program-batch-day-tasks-request-model';
import { IStudentProgramBatchDayTasksResponseModel } from 'src/app/core/interfaces/student-management-tab-interfaces/Istudent-program-batch-day-tasks-response-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminStudentTabService } from 'src/app/core/services/admin-student-tab-services/admin-student-tab.service';

@Component({
  selector: 'app-admin-student-program-task',
  templateUrl: './admin-student-program-task.component.html',
  styleUrls: ['./admin-student-program-task.component.scss']
})
export class AdminStudentProgramTaskComponent implements OnInit {
  @Input() studentDayIdOutput: ITeacherStudentViewModel | undefined;

  programDayTasks :IStudentProgramBatchDayTasksResponseModel[] | undefined;
  selectedIndex = 0;
  studentProgramListFilterRequestModel: IStudentProgramBatchDayTasksRequestModel ={batId:"",studId:"",dayId:""} ;
  studentAndProgramModel :ITeacherStudentViewModel | undefined;
  langEnum = LanguageEnum;

  constructor(private adminStudentTabService: AdminStudentTabService,public translate: TranslateService) { }

  ngOnInit(): void {
  }

 
  getAllStudentProgramDayTasks() {
    this.studentAndProgramModel = this.studentDayIdOutput;
    if(this.studentProgramListFilterRequestModel )
    {
      this.studentProgramListFilterRequestModel.studId= this.studentAndProgramModel?.usrId;
      this.studentProgramListFilterRequestModel.batId = this.studentAndProgramModel?.batchId;
      this.studentProgramListFilterRequestModel.dayId = this.studentAndProgramModel?.dayId;

    this.adminStudentTabService.getStudentProgramDayTasks(this.studentProgramListFilterRequestModel || {}).subscribe(res => {

      if (res.isSuccess) {
       this.programDayTasks = res.data;
      
      }
      else {
      }
    },
      error => {
        console.log(error);
      });
    }
  }
  

}
