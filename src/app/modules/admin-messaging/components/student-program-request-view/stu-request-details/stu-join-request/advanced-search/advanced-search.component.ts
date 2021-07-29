import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentProgramSubscriptionStatusEnum } from 'src/app/core/enums/subscriptionStatusEnum/student-program-subscription-status-enum.enum';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';
import { IStudentSubscriptionModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { IProgramFilterByNameRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Output() closeAdvancedSearch = new EventEmitter();
  @Output() AdvancedSearch = new EventEmitter<IStudentSubscriptionFilterRequestModel>();
  @Input() statusAdvancedSearch: StudentProgramSubscriptionStatusEnum | undefined
  filter: IStudentSubscriptionFilterRequestModel = { statusNum: StudentProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }
  advancedSearchInputs = {} as IStudentSubscriptionFilterRequestModel
  resultMessage: BaseMessageModel = {};
  studProgsSubsItems: IStudentSubscriptionModel[] = [];

  constructor(private progSubsService: StudentProgramSubscriptionServicesService
    , private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.getAllProgram()
    console.log('statusAdvancedSearch', this.statusAdvancedSearch)
  }
  closeStuAdvancedSearch() {
    this.closeAdvancedSearch.emit()
  }


  sendAdvancedSearch() {

    this.AdvancedSearch.emit(this.advancedSearchInputs)

    // this.progSubsService.getStudentsSubscriptionsFilter(this.advancedSearchInputs).subscribe(res => {

    //   if (res.isSuccess) {
    //     this.studProgsSubsItems = res.data;


    //   }
    //   else {

    //   }
    // }, error => {
    //   this.resultMessage = {
    //     message: error,
    //     type: BaseConstantModel.DANGER_TYPE
    //   }
    // })
  }
  model: IProgramFilterByNameRequest | undefined
  ProgramsList: IprogramsModel[] = [];

  getAllProgram() {
    this.model = {}
    this.programService.getAllPrograms(this.model).subscribe(res => {

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












