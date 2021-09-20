import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseMessageModel} from '../../../../../core/ng-model/base-message-model';
import {BaseSelectedDateModel} from '../../../../../core/ng-model/base-selected-date-model';
import {ProgramService} from '../../../../../core/services/program-services/program.service';
import {DateFormatterService} from 'ngx-hijri-gregorian-datepicker';
import {TranslateService} from '@ngx-translate/core';
import {IProgramFilterAdvancedRequest} from '../../../../../core/interfaces/programs-interfaces/iprogram-filter-requests';
import {IprogramsModel} from '../../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseConstantModel} from '../../../../../core/ng-model/base-constant-model';
import {IScientificProblemFilter} from '../../../../../core/interfaces/scientific-problrm/iscientific-problem-filter';

@Component({
  selector: 'app-scientific-problem-advanced-search',
  templateUrl: './scientific-problem-advanced-search.component.html',
  styleUrls: ['./scientific-problem-advanced-search.component.scss']
})
export class ScientificProblemAdvancedSearchComponent implements OnInit {
  @Output() closeAdvancedSearch = new EventEmitter<IScientificProblemFilter>();
  @Input() filter: IScientificProblemFilter = {skip : 0, take : 12, sorField : '', ordType: 1, page : 1};
  resultMessage: BaseMessageModel = {};


  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  maxGregDate = this.dateFormatterService.GetTodayGregorian()
  typeDateBinding: any
  datafromBinding: any
  dataToBinding: any

  hijri: boolean = false;
  milady: boolean = false;
  constructor(private programService: ProgramService,
              private dateFormatterService: DateFormatterService,
              public translate: TranslateService,) { }

  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  ProgramsList: IprogramsModel[] = [];
  ngOnInit(): void {
    this.getAllProgram()

  }

  SendDatafrom(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.datafromBinding = data.selectedDateValue
    this.filter.scFrom = this.datafromBinding
    this.selectedDateType = data.selectedDateType;
  }
  SendDataTo(data: any) {
    this.typeDateBinding = data.selectedDateType
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.dataToBinding = data.selectedDateValue
    this.filter.scTo = this.dataToBinding
    this.selectedDateType = data.selectedDateType;
  }


  closeScientificAdvancedSearch() {
    this.filter.filterText = '';
    this.filter.progId = '';
    this.filter.scFrom = undefined
    this.filter.scTo = undefined
    this.filter.skip = 0
    this.filter.take = 9
    this.filter.page = 1
    this.filter.scNo= undefined;
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


