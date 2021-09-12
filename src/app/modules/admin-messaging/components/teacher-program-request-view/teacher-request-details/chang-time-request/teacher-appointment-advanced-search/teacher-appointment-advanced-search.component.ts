import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StudentProgramVacationStatusEnum} from '../../../../../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';
import {BaseMessageModel} from '../../../../../../../core/ng-model/base-message-model';
import {BaseSelectedDateModel} from '../../../../../../../core/ng-model/base-selected-date-model';
import {ProgramService} from '../../../../../../../core/services/program-services/program.service';
import {DateFormatterService} from 'ngx-hijri-gregorian-datepicker';
import {TranslateService} from '@ngx-translate/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {BaseConstantModel} from '../../../../../../../core/ng-model/base-constant-model';
import {ITeacherAppointmentFilterRequestModel} from '../../../../../../../core/interfaces/teacher-appointment-requests-interfaces/iteacher-appointment-filter-request-model';

@Component({
  selector: 'app-teacher-appointment-advanced-search',
  templateUrl: './teacher-appointment-advanced-search.component.html',
  styleUrls: ['./teacher-appointment-advanced-search.component.scss']
})
export class TeacherAppointmentAdvancedSearchComponent implements OnInit {
  @Output() closeAdvancedSearch = new EventEmitter<ITeacherAppointmentFilterRequestModel>();
  @Input() filter: ITeacherAppointmentFilterRequestModel  = {page: 1, skip: 0, take:  2147483647, statusNum : StudentProgramVacationStatusEnum.Pending }
  resultMessage: BaseMessageModel = {};
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  typeDateBinding: any;
  datafromBinding: any;
  dataToBinding: any;

  hijri: boolean = false;
  milady: boolean = false;
  constructor(private programService: ProgramService,
              private dateFormatterService: DateFormatterService,
              public translate: TranslateService,
  ) { }
  maxGregDate: NgbDateStruct | undefined;
  ngOnInit(): void {
    this.maxGregDate = this.dateFormatterService.GetTodayGregorian()

  }

  SendDatafrom(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.datafromBinding = data.selectedDateValue
    this.filter?this.filter.fromDate = this.datafromBinding : null;
    this.selectedDateType = data.selectedDateType;
  }
  SendDataTo(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.dataToBinding = data.selectedDateValue
    this.filter?.toDate? this.filter.toDate = this.dataToBinding : null;
    this.selectedDateType = data.selectedDateType;
  }


  closeStuAdvancedSearch() {
    if (this.filter){
      this.filter.usrName = '';
      this.filter.numberRequest = undefined
      this.filter.fromDate = undefined
      this.filter.toDate = undefined
      this.filter.skip = 0
      this.filter.take = 9
      this.filter.page = 1
      this.filter.sortField = '';
    }

    this.closeAdvancedSearch.emit(this.filter)
  }


  sendAdvancedSearch() {
    if (this.datafromBinding > this.dataToBinding) {
      this.resultMessage =
        {
          message: this.translate.instant('STUDENT_SUBSCRIBERS.VALIDATIONDATE'),
          type: BaseConstantModel.DANGER_TYPE
        }
    }
    else
      this.closeAdvancedSearch.emit()

  }



}

