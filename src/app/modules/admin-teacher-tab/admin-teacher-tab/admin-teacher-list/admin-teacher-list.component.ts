/* tslint:disable */
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';
import {  Router } from '@angular/router';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import {ProgramCategoriesService} from '../../../../core/services/program-categories-services/program-categories.service';
import {DateFormatterService} from 'ngx-hijri-gregorian-datepicker';
import {BaseSelectedDateModel} from '../../../../core/ng-model/base-selected-date-model';
import {ITeacherProgramSubscriptionFilterRequestModel} from '../../../../core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import {TeacheProgramSubscriptionStatusEnum} from '../../../../core/enums/teacher-subscription-enums/teache-program-subscription-status-enum.enum';

@Component({
  selector: 'app-admin-teacher-list',
  templateUrl: './admin-teacher-list.component.html',
  styleUrls: ['./admin-teacher-list.component.scss']
})
export class AdminTeacherListComponent implements OnInit {
  @Input() teacherFilterAdvancedSearch: ITeacherProgramSubscriptionFilterRequestModel = { statusNum: TeacheProgramSubscriptionStatusEnum.Pending, skip: 0, take: 9, sortField: '', sortOrder: 1, page: 1 }

  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  selectedIndex = 0;
  advancedSearch: boolean = true;
  maxGregDate = this.dateFormatterService.GetTodayGregorian()
  datafromBinding: any
  dataToBinding: any
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  hijri: boolean = false;
  milady: boolean = false;
  constructor(private scientifcMaterialService: ScientificMaterialService,
              private programCategoriesService: ProgramCategoriesService,
              public translate: TranslateService,
              private router: Router,
              private lookupService: LookupService,
              private alert: AlertifyService,
              private dateFormatterService: DateFormatterService
  ) { }

  ngOnInit(): void {

  }


  //  advanced search

  ToggelAdvancSearch() {
    this.advancedSearch = !this.advancedSearch
  }





  // end advanced search

  SendDatafrom(data: any) {
    //
    // // console.log("data 777sent", data)
    // this.typeDateBinding = data.selectedDateType
    // data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // // console.log("Hijri date", data.date)
    // this.datafromBinding = data.selectedDateValue
    // this.teacherFilterAdvancedSearch.fromDate = this.datafromBinding
    // this.selectedDateType = data.selectedDateType;
    // // console.log("this.selectedDateType",this.selectedDateType);
    // // this.filter.fromDate?.setDate(data.selectedDateValue);

  }
  SendDataTo(data: any) {
    // // console.log("data 777sent", data)
    // this.typeDateBinding = data.selectedDateType
    // data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // // console.log("Hijri date", data.date)
    // this.dataToBinding = data.selectedDateValue
    // this.teacherFilterAdvancedSearch.toDate = this.dataToBinding
    // this.selectedDateType = data.selectedDateType;
    // // console.log("this.selectedDateType",this.selectedDateType);
    // // this.filter.toDate?.setDate(data.selectedDateValue);

  }
}

