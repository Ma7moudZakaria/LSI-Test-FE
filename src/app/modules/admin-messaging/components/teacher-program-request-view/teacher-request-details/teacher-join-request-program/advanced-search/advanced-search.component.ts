import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ITeacherAdvancedSearchModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-advanced-search-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { TeacheProgramSubscriptionStatusEnum } from 'src/app/core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';
import { DateFormatterService, DateType } from 'ngx-hijri-gregorian-datepicker';
import { BaseSelectedDateModel } from 'src/app/core/ng-model/base-selected-date-model';

@Component({
  selector: 'app-advanced-search-teacher',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchTeacherComponent implements OnInit {

  @Output() advancedSearchEvent = new EventEmitter<ITeacherAdvancedSearchModel>();
  // @Output() closeAdvancedSearch = new EventEmitter<ITeacherAdvancedSearchModel>();
  @Input() teacherFilterAdvancedSearch: ITeacherProgramSubscriptionFilterRequestModel = { statusNum: TeacheProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  ProgramsList: IprogramsModel[] = [];
  resultMessage: BaseMessageModel = {};
  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };

  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  // maxHijriDate: NgbDateStruct | undefined;
  maxGregDate = this.dateFormatterService.GetTodayGregorian()
  typeDateBinding: any
  datafromBinding: any
  dataToBinding: any

  hijri: boolean = false;
  milady: boolean = false;

  constructor(private programService: ProgramService,

    public translate: TranslateService, private dateFormatterService: DateFormatterService) { }

  ngOnInit(): void {
    this.getAllProgram()
  }

  SendDatafrom(data: any) {
    // console.log("data 777sent", data)
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // console.log("Hijri date", data.date)
    this.datafromBinding = data.selectedDateValue
    this.teacherFilterAdvancedSearch.fromDate = this.datafromBinding
    this.selectedDateType = data.selectedDateType;
    // console.log("this.selectedDateType",this.selectedDateType);
    // this.filter.fromDate?.setDate(data.selectedDateValue);

  }
  SendDataTo(data: any) {
    // console.log("data 777sent", data)
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // console.log("Hijri date", data.date)
    this.dataToBinding = data.selectedDateValue
    this.teacherFilterAdvancedSearch.toDate = this.dataToBinding
    this.selectedDateType = data.selectedDateType;
    // console.log("this.selectedDateType",this.selectedDateType);
    // this.filter.toDate?.setDate(data.selectedDateValue);

  }

  getAllProgram() {

    this.programService.getProgramAdvancedFilter(this.programsbyAdvancedFilter || {}).subscribe(res => {

      if (res.isSuccess) {
        this.ProgramsList = res.data;
        console.log('this.ProgramsList',this.ProgramsList);
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

  closeTeacherAdvancedSearch() {
    this.teacherFilterAdvancedSearch.usrName = '';
    this.teacherFilterAdvancedSearch.progId = '';
    this.teacherFilterAdvancedSearch.numberRequest = undefined
    this.teacherFilterAdvancedSearch.fromDate = undefined
    this.teacherFilterAdvancedSearch.toDate = undefined
    this.teacherFilterAdvancedSearch.skip = 0;
    this.teacherFilterAdvancedSearch.take= 9;
    this.teacherFilterAdvancedSearch.sortField='';
    this.teacherFilterAdvancedSearch.sortOrder= 1;
    this.teacherFilterAdvancedSearch.page = 1;

    // this.teacherFilterAdvancedSearch = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
    this.advancedSearchEvent.emit({ isSearch: false, teacherFilter: this.teacherFilterAdvancedSearch })
  }


  sendAdvancedSearch() {
    if (this.datafromBinding > this.dataToBinding) {
      this.resultMessage =
      {
        message: this.translate.instant('STUDENT_SUBSCRIBERS.VALIDATIONDATE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
    else {
      this.advancedSearchEvent.emit({ isSearch: true, teacherFilter: this.teacherFilterAdvancedSearch })
    }
  }

}
