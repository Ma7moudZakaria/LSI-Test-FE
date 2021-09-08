import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStudentProgramVacationModel } from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-model';
import { StudentProgramVacationStatusEnum } from '../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import { IStudentProgramVacationFilterRequestModel } from '../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import { TranslateService } from '@ngx-translate/core';
import { ExportationService } from '../../../core/services/exportation-services/exportation.service';
import { IUser } from '../../../core/interfaces/auth-interfaces/iuser-model';
import { IStudentProgramVacationStudentViewModel } from '../../../core/interfaces/student-program-vacation-interfaces/istudent-program-vacation-student-view-model';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-admin-vacation-request-for-student-tab-grid',
  templateUrl: './admin-vacation-request-for-student-tab-grid.component.html',
  styleUrls: ['./admin-vacation-request-for-student-tab-grid.component.scss']
})
export class AdminVacationRequestForStudentTabGridComponent implements OnInit {

  @Input() studentVacationItems: IStudentProgramVacationModel[] = []
  @Output() studentVacationFilterEvent = new EventEmitter<IStudentProgramVacationFilterRequestModel>();
  @Input() numberPerRow: number = 3;
  @Input() totalCount: number = 0;
  @Input() studentProgramVacationFilterRequestModel: IStudentProgramVacationFilterRequestModel = { skip: 0, take: 9, page: 1 };
  orderTypeToggel = 1;
  constructor(public translate: TranslateService,
    private exportationService: ExportationService) { }

  ngOnInit(): void {
  }


  sortByStudentRequestDate() {
    this.studentProgramVacationFilterRequestModel.sortField = 'requestdate';
    this.studentProgramVacationFilterRequestModel.sortOrder = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.studentVacationFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
  }

  sortByStudentRequestDateOrderType() {
    if (this.studentProgramVacationFilterRequestModel.sortField === 'requestdate' && this.studentProgramVacationFilterRequestModel.sortOrder == 1) { return 'asend' }
    if (this.studentProgramVacationFilterRequestModel.sortField === 'requestdate' && this.studentProgramVacationFilterRequestModel.sortOrder == -1) { return 'desend' }

    return '';
  }

  onStudentPageChange() {
    this.studentProgramVacationFilterRequestModel.skip = (this.studentProgramVacationFilterRequestModel.page - 1) * (this.studentProgramVacationFilterRequestModel.take);
    this.studentVacationFilterEvent.emit(this.studentProgramVacationFilterRequestModel);
  }
  exportStudentCSV() {
    // let expItems = this.studentItems.filter(a => a.checked);
    let expItems = this.studentVacationItems;
    let headerLabels = this.translate.currentLang == 'en-US' ?
      [' program name', 'Student name', 'request date ', 'request status'] :
      ['أسم الطالب',
        'أسم البرنامج'
        , ' تاريخ الطلب ',
        'حاله الطلب']

    let data = ['progName', 'usrNameAr', 'requestDate', 'programStaNum'];
    this.exportationService.exportCSV(expItems, 'Hoffaz-Student program subscription requests ', data, headerLabels);
  }


}
