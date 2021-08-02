import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { ITeacherAdvancedSearchModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-advanced-search-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-advanced-search-teacher',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchTeacherComponent implements OnInit {

  @Output() advancedSearchEvent = new EventEmitter<ITeacherAdvancedSearchModel>();
  @Input() teacherFilterAdvancedSearch: ITeacherProgramSubscriptionFilterRequestModel ={skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 };

  ProgramsList: IprogramsModel[] = [];
  resultMessage: BaseMessageModel = {};

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getAllProgram()
  }

  getAllProgram() {
    this.programService.getAllPrograms({}).subscribe(res => {

      if (res.isSuccess) {
        this.ProgramsList = res.data;
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }

  closeTeacherAdvancedSearch() {
    this.advancedSearchEvent.emit({isSearch:false})
  }


  sendAdvancedSearch() {
    this.advancedSearchEvent.emit({isSearch:true,teacherFilter:this.teacherFilterAdvancedSearch})
  }
  
}
