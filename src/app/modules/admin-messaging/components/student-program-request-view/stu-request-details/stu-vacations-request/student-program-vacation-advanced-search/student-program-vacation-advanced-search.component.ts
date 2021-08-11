import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseMessageModel} from '../../../../../../../core/ng-model/base-message-model';
import {BaseSelectedDateModel} from '../../../../../../../core/ng-model/base-selected-date-model';
import {StudentProgramSubscriptionServicesService} from '../../../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {ProgramService} from '../../../../../../../core/services/program-services/program.service';
import {DateFormatterService} from 'ngx-hijri-gregorian-datepicker';
import {TranslateService} from '@ngx-translate/core';
import {IProgramFilterAdvancedRequest} from '../../../../../../../core/interfaces/programs-interfaces/iprogram-filter-requests';
import {IprogramsModel} from '../../../../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseConstantModel} from '../../../../../../../core/ng-model/base-constant-model';
import {IStudentProgramVacationFilterRequestModel} from '../../../../../../../core/interfaces/student-program-vacation-interfaces/i-student-program-vacation-filter-request-model';
import {StudentProgramVacationStatusEnum} from '../../../../../../../core/enums/StudentProgramVacationStatus/student-program-vacation-status.enum';

@Component({
  selector: 'app-student-program-vacation-advanced-search',
  templateUrl: './student-program-vacation-advanced-search.component.html',
  styleUrls: ['./student-program-vacation-advanced-search.component.scss']
})
export class StudentProgramVacationAdvancedSearchComponent implements OnInit {
  @Output() closeAdvancedSearch = new EventEmitter<IStudentProgramVacationFilterRequestModel>();
  @Input() filter: IStudentProgramVacationFilterRequestModel = { statusNum: StudentProgramVacationStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  resultMessage: BaseMessageModel = {};
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  maxGregDate = this.dateFormatterService.GetTodayGregorian()
  typeDateBinding: any
  datafromBinding: any
  dataToBinding: any

  hijri: boolean = false;
  milady: boolean = false;
  constructor(private progSubsService: StudentProgramSubscriptionServicesService
    , private programService: ProgramService, private dateFormatterService: DateFormatterService
    , public translate: TranslateService,
  ) { }

  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  ProgramsList: IprogramsModel[] = [];
  ngOnInit(): void {
    this.getAllProgram()

  }

  SendDatafrom(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.datafromBinding = data.selectedDateValue
    this.filter.fromDate = this.datafromBinding
    this.selectedDateType = data.selectedDateType;
  }
  SendDataTo(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.dataToBinding = data.selectedDateValue
    this.filter.toDate = this.dataToBinding
    this.selectedDateType = data.selectedDateType;
  }


  closeStuAdvancedSearch() {
    this.filter.usrName = '';
    this.filter.progId = '';
    this.filter.numberRequest = undefined
    this.filter.fromDate = undefined
    this.filter.toDate = undefined
    this.filter.skip = 0
    this.filter.take = 9
    this.filter.page = 1
    this.filter.sortField = '';
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


  getAllProgram() {
    this.programService.getProgramAdvancedFilter(this.programsbyAdvancedFilter || {}).subscribe(res => {

      if (res.isSuccess) {
        this.ProgramsList = res.data;
        console.log(this.ProgramsList)

      }
      else {

      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

}







