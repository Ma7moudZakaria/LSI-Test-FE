import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeacherDropOutRequestStatusEnum } from 'src/app/core/enums/drop-out-request-enums/teacher-drop-out-request-status.enum';
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ITeacherDropOutRequestAdvFilterAdminViewRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-adv-filter-admin-view-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseSelectedDateModel } from 'src/app/core/ng-model/base-selected-date-model';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { TranslateService } from '@ngx-translate/core';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ITeacherDropOutRequestModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/teacher-drop-out-request-model';


@Component({
  selector: 'app-teacher-advanced-search',
  templateUrl: './teacher-advanced-search.component.html',
  styleUrls: ['./teacher-advanced-search.component.scss']
})
export class TeacherAdvancedSearchComponent implements OnInit {

  @Output() closeAdvancedSearch = new EventEmitter<ITeacherDropOutRequestAdvFilterAdminViewRequestModel>();
  @Input() filter: ITeacherDropOutRequestAdvFilterAdminViewRequestModel = { statusNum: TeacherDropOutRequestStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  advancedSearchInputs = {} as ITeacherDropOutRequestAdvFilterAdminViewRequestModel;
  resultMessage: BaseMessageModel = {};
  studProgsSubsItems: ITeacherDropOutRequestModel[] = [];
  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  ProgramsList: IprogramsModel[] = [];
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  maxGregDate = this.dateFormatterService.GetTodayGregorian();
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
  }

  SendDatafrom(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.datafromBinding = data.selectedDateValue
    this.filter.from = this.datafromBinding
    this.selectedDateType = data.selectedDateType;

  }

  SendDataTo(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.dataToBinding = data.selectedDateValue
    this.filter.to = this.dataToBinding
    this.selectedDateType = data.selectedDateType;
  }

  closeStuAdvancedSearch() {
    this.filter.name = '';
    this.filter.progId = '';
    this.filter.requestNum = undefined
    this.filter.from = undefined
    this.filter.to = undefined
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
        this.ProgramsList = res.data;
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
