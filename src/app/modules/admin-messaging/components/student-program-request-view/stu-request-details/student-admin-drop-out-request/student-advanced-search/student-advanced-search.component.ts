import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { StudentDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/student-drop-out-request-status.enum';
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { IStudentDropOutRequestsFilterAdminViewRequestModel } from 'src/app/core/interfaces/student-drop-out-request-interfaces/istudent-drop-out-requests-filter-admin-view-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseSelectedDateModel } from 'src/app/core/ng-model/base-selected-date-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-student-advanced-search',
  templateUrl: './student-advanced-search.component.html',
  styleUrls: ['./student-advanced-search.component.scss']
})
export class StudentAdvancedSearchComponent implements OnInit {

  @Output() closeAdvancedSearch = new EventEmitter<IStudentDropOutRequestsFilterAdminViewRequestModel>();
  @Input() filter: IStudentDropOutRequestsFilterAdminViewRequestModel = { statusNum: StudentDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  
  
  resultMessage: BaseMessageModel = {};
  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  programsList: IprogramsModel[] = [];
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  maxGregDate:any 
  typeDateBinding: any;
  datafromBinding: any;
  dataToBinding: any;
  hijri: boolean = false;
  milady: boolean = false;
  
  constructor(
    private dateFormatterService: DateFormatterService,
    private programService: ProgramService, 
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getAllProgram(); 
    this.maxGregDate = this.dateFormatterService.GetTodayGregorian();
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
    {
      this.closeAdvancedSearch.emit()
    }
  }

  getAllProgram() {
    this.programService.getProgramAdvancedFilter(this.programsbyAdvancedFilter || {}).subscribe(res => {

      if (res.isSuccess) {
        this.programsList = res.data;
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
