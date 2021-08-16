/* tslint:disable */
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { IProgramFilterAdvancedRequest, IProgramType } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { ProgramDetailsComponent } from '../program-details.component';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
// import { IProgramType } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import {parseJson} from "@angular/cli/utilities/json-file";
import {ProgramCategoriesService} from '../../../../../core/services/program-categories-services/program-categories.service';
import {IPrgoramCategrory} from '../../../../../core/interfaces/program-categories-interfaces/iprgoram-categrory';
import {IProgramsCategoryModel} from '../../../../../core/interfaces/program-categories-interfaces/iprograms-category-model';


@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {
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


  constructor(private scientifcMaterialService: ScientificMaterialService,
    private programCategoriesService: ProgramCategoriesService,
    public translate: TranslateService,
    private router: Router,
    private lookupService: LookupService,
    private alert: AlertifyService,

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

  addProgTypeToList(item: BaseLookupModel, event: any) {
    if (event.checked) {
      this.programTypesList?.push({ progTypeId: item.id });
    }
    else {
      let it = this.programTypesList.filter(i => i.progTypeId === item.id)[0];
      const ind = this.programTypesList?.indexOf(it);
      if (ind > -1) {
        this.programTypesList?.splice(ind, 1);
      }
    }
    console.log("programTypesList", this.programTypesList);

  }

  progTypeChecked(item: BaseLookupModel) {
    return this.programTypesList.some(it => it.progTypeId === item.id);
  }

  selectTypes(type: IProgramType) {
    var item = this.collectionOfLookup.PROG_TYPES?.filter(i => i.id == type.progTypeId)[0];
    return this.translate.currentLang == LanguageEnum.ar ? item?.nameAr : item?.nameEn;
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
        // console.log("this.categoriesList",this.categoriesList)
        // this.getProgramIdToProgramDetails(this.categoriesList[0] || null);
        // this.alert.success(res.message || '');
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

  getProgramIdToProgramDetails(item: IprogramsModel) {
    this.selectedProgram.emit(item);
  }

  addPrgramPage() {
    this.router.navigateByUrl('/program/add-program)');
  }

  filterByNameSearchKey(searchKey: string) {
    this.programsbyAdvancedFilter.name = searchKey;
    this.loadProgramsbyAdvancedFilter();
  }

  clearNameFilter() {
    this.programsbyAdvancedFilter.name = '';
    this.loadProgramsbyAdvancedFilter();
  }
  clearProgTypeFilter(item: IProgramType) {
    let it = this.programTypesList.filter(i => i.progTypeId === item.progTypeId)[0];
    const ind = this.programTypesList?.indexOf(it);
    if (ind > -1) {
      this.programTypesList?.splice(ind, 1);
      this.programsbyAdvancedFilter.programTypesFilter = this.programTypesList.map(value => value.progTypeId).join() ;
      this.loadProgramsbyAdvancedFilter();
    }

  }

  clearPeriodicExamFilter() {
    this.programsbyAdvancedFilter.isPeriodicExam = undefined;
    this.loadProgramsbyAdvancedFilter();
  }
  clearTestFilter() {
    this.programsbyAdvancedFilter.isAdmissionTest = undefined;
    this.loadProgramsbyAdvancedFilter();
  }
  clearTechNum() {
    this.programsbyAdvancedFilter.teachersCount = undefined;
    this.loadProgramsbyAdvancedFilter();
  }
  clearStuNum() {
    this.programsbyAdvancedFilter.studentsCount = undefined;
    this.loadProgramsbyAdvancedFilter();
  }
  clearDura() {
    this.programsbyAdvancedFilter.duration = undefined;
    this.loadProgramsbyAdvancedFilter();
  }

  setOpened(itemIndex: number) {
    this.currentlyOpenedItemIndex = itemIndex;
  }
  setClosed(itemIndex: Number) {
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

  loadProgramsCategory(id: any) {
    this.programCategoriesService.GetProgramsCategoryByProgramId(id).subscribe(res => {
        if (res.isSuccess) {
          this.programsList = res.data as IProgramsCategoryModel[];
           // this.getProgramIdToProgramDetails(this.programsList[0] || null);

          console.log("this.programsList",this.programsList)

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
}
