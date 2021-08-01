import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { IProgramFilterAdvancedRequest, IProgramFilterByNameRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { DateFormatterService, DateType } from 'ngx-hijri-gregorian-datepicker';
import { BaseSelectedDateModel } from 'src/app/core/ng-model/base-selected-date-model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Output() closeAdvancedSearch = new EventEmitter();
  @Output() ReqAdvancedSearch = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  // @Input() filter: IStudentSubscriptionFilterRequestModel | undefined
  @Input() filter: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  advancedSearchInputs = {} as IStudentSubscriptionFilterRequestModel
  resultMessage: BaseMessageModel = {};
  studProgsSubsItems: IStudentSubscriptionModel[] = [];


  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  // maxHijriDate: NgbDateStruct | undefined;
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

  ngOnInit(): void {
    this.getAllProgram()

  }

  SendDatafrom(data: any) {
    // console.log("data 777sent", data)
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // console.log("Hijri date", data.date)
    this.datafromBinding = data.selectedDateValue
    this.filter.fromDate = this.datafromBinding
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
    this.filter.toDate = this.dataToBinding
    this.selectedDateType = data.selectedDateType;
    // console.log("this.selectedDateType",this.selectedDateType);
    // this.filter.toDate?.setDate(data.selectedDateValue);

  }


  closeStuAdvancedSearch() {
    this.closeAdvancedSearch.emit()
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
      this.ReqAdvancedSearch.emit(this.filter)

  }
  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  ProgramsList: IprogramsModel[] = [];

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












