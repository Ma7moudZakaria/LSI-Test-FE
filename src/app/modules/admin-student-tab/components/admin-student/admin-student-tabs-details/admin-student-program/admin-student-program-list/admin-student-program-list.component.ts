import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentMyProgramsListModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-my-programs-list-model';
import { IStudentMyProgramsRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminStudentTabService } from 'src/app/core/services/admin-student-tab-services/admin-student-tab.service';

@Component({
  selector: 'app-admin-student-program-list',
  templateUrl: './admin-student-program-list.component.html',
  styleUrls: ['./admin-student-program-list.component.scss']
})
export class AdminStudentProgramListComponent implements OnInit {
  @Output() showAddProgram = new EventEmitter<boolean>();
  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;
  @Output() userbatchModel = new EventEmitter<ITeacherStudentViewModel>();

  programs :IStudentMyProgramsListModel[] | undefined;
  selectedIndex = 0;
  studentProgramListFilterRequestModel: IStudentMyProgramsRequestModel ={};
  // studentAndProgramModel :ITeacherStudentViewModel | undefined;
  langEnum = LanguageEnum;

  constructor(private adminStudentTabService: AdminStudentTabService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.getAllStudentPrograms();
  }

  showOverlay() {
    this.showAddProgram.emit(true);
  }
  filterByNameSearchKey(searchKey:string)
  {
    this.studentProgramListFilterRequestModel.progName = searchKey;
    this.getAllStudentPrograms();
  }
  getAllStudentPrograms() {
    // this.studentAndProgramModel = this.studentIdOutput;
    this.studentProgramListFilterRequestModel.usrId = this.studentIdOutput?.usrId;
    this.adminStudentTabService.getStudentPrograms(this.studentProgramListFilterRequestModel || {}).subscribe(res => {

      if (res.isSuccess) {
       this.programs = res.data;
       if(this.studentIdOutput && this.programs)
       {
       this.studentIdOutput.batchId=this.programs[0].batId;
       this.userbatchModel.emit(this.studentIdOutput);
       }
      }
      else {
      }
    },
      error => {
        console.log(error);
      });
  }
  loadProgramDetails(batId?: string) {
    if(this.studentIdOutput)
       {
       this.studentIdOutput.batchId=batId;
       this.userbatchModel.emit(this.studentIdOutput);
       }

  }
}
