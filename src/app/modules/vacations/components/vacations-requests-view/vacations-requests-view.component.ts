import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IStudentPrograms} from '../../../../core/interfaces/student-program-vacation-interfaces/istudent-programs';
import {StudentProgramVacationRequestsComponent} from './student-program-vacation-requests/student-program-vacation-requests.component';
import {IStudentProgramVacationRequestModel} from '../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-request-model';
import {IAddNewStudentVacationRequest} from '../../../../core/interfaces/student-program-vacation-interfaces/iadd-new-student-vacation-request';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { TranslateService } from '@ngx-translate/core';
import {IProgramDutyDays} from '../../../../core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-vacations-requests-view',
  templateUrl: './vacations-requests-view.component.html',
  styleUrls: ['./vacations-requests-view.component.scss']
})
export class VacationsRequestsViewComponent implements OnInit {
  programModel : IStudentPrograms | undefined;
  @ViewChild(StudentProgramVacationRequestsComponent) studentProgramVacationRequests:StudentProgramVacationRequestsComponent | undefined;
 @Input() studentProgramVacationFilterRequestModel: IStudentProgramVacationRequestModel = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };
  openStudentProgramVacation: boolean = false
  filter: IAddNewStudentVacationRequest = { }
  @ViewChild(StudentProgramVacationRequestsComponent) studentVacationRequests: StudentProgramVacationRequestsComponent | undefined;

  constructor(private languageService: LanguageService ,private translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.setCurrentLang();
  }

  selectedProgramCallBack(event:IStudentPrograms){
    this.programModel = event;
    if ( this.studentProgramVacationRequests
      && this.studentProgramVacationRequests.studentProgramVacationFilterRequestModel
      && this.studentProgramVacationRequests.studentProgramVacationFilterRequestModel.progId ) {
      this.studentProgramVacationRequests.studentProgramVacationFilterRequestModel.progId = this.programModel?.id;
      this.studentProgramVacationRequests.studentProgramVacationFilterRequestModel.batId = this.programModel?.batId;


      this.studentProgramVacationRequests?.getStudentProgramVacationRequestsStudentView()
    }
  }

  closeAddStudentVacationRequest(event: IAddNewStudentVacationRequest) {
    this.openStudentProgramVacation = false;
    this.filter = event
    this.studentVacationRequests?.getStudentProgramVacationRequestsStudentView();
  }

  openStudentProgramVacationAddPopup(event: IAddNewStudentVacationRequest) {
    this.openStudentProgramVacation = true;
    this.filter = event

  }

  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('SIDENAVBAR.VACATION'));
  }

}
