import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStudentSubscriptionFilterRequestModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import {StudentProgramSubscriptionStatusEnum} from '../../../../../core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {IStudentSubscriptionModel} from '../../../../../core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import {BaseSelectedDateModel} from '../../../../../core/ng-model/base-selected-date-model';
import {StudentProgramSubscriptionServicesService} from '../../../../../core/services/student-program-subscription-services/student-program-subscription-services.service';
import {ProgramService} from '../../../../../core/services/program-services/program.service';
import {DateFormatterService} from 'ngx-hijri-gregorian-datepicker';
import {TranslateService} from '@ngx-translate/core';
import {IProgramFilterAdvancedRequest} from '../../../../../core/interfaces/programs-interfaces/iprogram-filter-requests';
import {IprogramsModel} from '../../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseConstantModel} from '../../../../../core/ng-model/base-constant-model';
import {IRejectStudentProgramVacationModel} from '../../../../../core/interfaces/student-program-vacation-interfaces/ireject-student-program-vacation-model';
import {StudentProgramVacationServicesService} from '../../../../../core/services/student-program-vacation-services/student-program-vacation-services.service';

@Component({
  selector: 'app-add-student-program-vacation-request',
  templateUrl: './add-student-program-vacation-request.component.html',
  styleUrls: ['./add-student-program-vacation-request.component.scss']
})
export class AddStudentProgramVacationRequestComponent implements OnInit {
  @Output() closeAdvancedSearch = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  // @Output() ReqAdvancedSearch = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
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
    , public translate: TranslateService, public studentProgramVacationService : StudentProgramVacationServicesService
  ) { }

  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  ProgramsList: IprogramsModel[] = [];
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


  closeAddStudentVacation() {
    this.filter.usrName = '';
    this.filter.progId = '';
    this.filter.numberRequest = undefined
    this.filter.fromDate = undefined
    this.filter.toDate = undefined
    this.filter.skip = 0
    this.filter.take = 9
    this.filter.page = 1
    this.filter.sortField = '';
    //this.filter = { skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
    this.closeAdvancedSearch.emit(this.filter)
  }


  AddStudentVacationRequest() {
    let model: IRejectStudentProgramVacationModel = {
      batchId: this.itemStuReq.id,
      reasonReject: this.itemStuReq.rejReason
    }
    if (model.reasonReject) {
      this.studentProgramVacationService.addStudentProgramVacation(model).subscribe(res => {

        if (res.isSuccess) {
          this.closeRejectRequest();
          this.alertify.success(res.message || '');

        }
        else {
          this.alertify.error(res.message || '');
        }
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    }

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









