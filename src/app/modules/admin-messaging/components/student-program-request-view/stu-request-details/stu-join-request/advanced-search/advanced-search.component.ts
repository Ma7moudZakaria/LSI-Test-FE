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
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';

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


  milady: boolean = false;
  maxGregDate: NgbDateStruct | undefined;
  hijriBirthDateInputParam: NgbDateStruct = { year: 0, day: 0, month: 0 };
  hijriBinding: any;
  MiladyPinding: any;

  hijri: boolean = false;
  selectedDateType: any;

  constructor(private progSubsService: StudentProgramSubscriptionServicesService
    , private programService: ProgramService, private dateFormatterService: DateFormatterService
  ) { }

  ngOnInit(): void {
    this.getAllProgram()
    // this.setGreg()
    // console.log('filter', this.filter)
  }
  // setGreg() {
  //   let toDayGreDate = this.dateFormatterService.GetTodayGregorian()
  //   toDayGreDate.day = toDayGreDate.day - 1;
  //   this.maxGregDate = toDayGreDate;
  //   console.log("maxGregDate", this.maxGregDate);
  // }

  MiladyFrom(date: any) {

    date = date.year + '/' + date.month + '/' + date.day;
    this.MiladyPinding = date
    this.filter.fromDate?.setDate(date);
  }
  MiladyTo(data: any) {
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.MiladyPinding = data.selectedDateValue
    this.filter.toDate?.setDate(data.selectedDateValue);
  }

  closeStuAdvancedSearch() {
    this.closeAdvancedSearch.emit()
  }


  sendAdvancedSearch() {
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












