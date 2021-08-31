/* tslint:disable */
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProgramFilterAdvancedRequest, IProgramType } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import {IPrgoramCategrory} from '../../../../core/interfaces/program-categories-interfaces/iprgoram-categrory';
import {IProgramsCategoryModel} from '../../../../core/interfaces/program-categories-interfaces/iprograms-category-model';
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

  @Output() selectedProgram = new EventEmitter<IprogramsModel>();
  categoriesList: IPrgoramCategrory[] | undefined;
  // progBasicInfoDetails: IProgramBasicInfoDetails | undefined;
  programDetails = {} as IprogramsModel;
  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  filterRequest: IProgramFilterAdvancedRequest = {};
  selectedIndex = 0;
  advancedSearch: boolean = true;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['PROG_TYPES'];
  programTypesList: IProgramType[] = [];
  currentlyOpenedItemIndex = -1;
  items1: any;
  programsList: IProgramsCategoryModel[] | undefined;
  starsSelected= 4.5;
  maxGregDate = this.dateFormatterService.GetTodayGregorian()
  typeDateBinding: any
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
    this.getLookupByKey();
    this.loadProgramsbyAdvancedFilter();
  }


  //  advanced search

  ToggelAdvancSearch() {
    this.advancedSearch = !this.advancedSearch
  }

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookup).subscribe(res => {
      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
      }
      else {
        this.resMessage =
          {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
      }
    });
  }


  submitSearch() {
    // this.programTypesList.map(value => value.progTypeId);
    this.programsbyAdvancedFilter =
      {
        programTypesFilter: this.programTypesList.map(value => value.progTypeId).join() ,
        programTypes : this.programTypesList,
        name: this.programsbyAdvancedFilter.name,
        duration: this.programsbyAdvancedFilter.duration,
        isAdmissionTest: this.programsbyAdvancedFilter.isAdmissionTest,
        stuNum: this.programsbyAdvancedFilter.stuNum,
        techNum: this.programsbyAdvancedFilter.techNum,
        isPeriodicExam : this.programsbyAdvancedFilter.isPeriodicExam,
        studentsCount : this.programsbyAdvancedFilter.studentsCount,
        teachersCount : this.programsbyAdvancedFilter.teachersCount,
        skip: 0,
        take: 2147483647
      }
    this.ToggelAdvancSearch();
    this.loadProgramsbyAdvancedFilter();
  }

  loadProgramsbyAdvancedFilter() {
    this.programCategoriesService.getProgramCatiegories().subscribe(res => {
        if (res.isSuccess) {
          this.categoriesList = res.data as IPrgoramCategrory[];
        }
        else {
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      },
      error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }

  resetSearch() {
    this.programTypesList = []
    this.programsbyAdvancedFilter = {}
    this.loadProgramsbyAdvancedFilter();
  }

  // end advanced search

  filterByNameSearchKey(searchKey: string) {
    this.programsbyAdvancedFilter.name = searchKey;
    this.loadProgramsbyAdvancedFilter();
  }

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

