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
import { IProgramFilterAdvancedRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-requests';
import { ProgramDetailsComponent } from '../program-details.component';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';


@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {
  @Output() selectedProgram = new EventEmitter<IprogramsModel>();
  programsList: IprogramsModel[] = [];
  programDetails = {} as IprogramsModel;
  programsbyAdvancedFilter: IProgramFilterAdvancedRequest = { skip: 0, take: 2147483647 };
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  filterRequest: IProgramFilterAdvancedRequest = {};
  selectedIndex = 0;
  advancedSearch: boolean = false;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['PROG_TYPES'];

  constructor(private scientifcMaterialService: ScientificMaterialService,
    private programService: ProgramService,
    public translate: TranslateService,
    private router: Router,
    private lookupService: LookupService,

  ) { }

  ngOnInit(): void {
    this.getLookupByKey();

    this.loadProgramsbyAdvancedFilter();
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
  // addProgTypeToList(item: BaseLookupModel, event:any){
  //   if (event.checked){
  //     this.programTypesList?.push({progTypeId:item.id});
  //   }
  //   else{
  //     let it = this.programTypesList.filter(i => i.progTypeId === item.id)[0];
  //     const ind = this.programTypesList?.indexOf(it);
  //     if (ind > -1) {
  //       this.programTypesList?.splice(ind, 1);
  //     }
  //   }
  //   console.log(this.programTypesList);
  // }
  // progTypeChecked(item:BaseLookupModel){
  //   return this.programTypesList.some(it => it.progTypeId === item.id);
  // }


  ToggelAdvancSearch() {
    this.advancedSearch = !this.advancedSearch
  }

  medelSearch: IProgramFilterAdvancedRequest | undefined;


  submitSearch() {
    this.programsbyAdvancedFilter =
    {
      name: this.programsbyAdvancedFilter.name,
      dura: this.programsbyAdvancedFilter.dura,
      isTest: this.programsbyAdvancedFilter.isTest,
      stuNum: this.programsbyAdvancedFilter.stuNum,
      techNum: this.programsbyAdvancedFilter.techNum,
      skip: 0,
      take: 2147483647
    }
    this.loadProgramsbyAdvancedFilter()
  }
  loadProgramsbyAdvancedFilter() {
    this.programService.getProgramAdvancedFilter(this.programsbyAdvancedFilter || {}).subscribe(
      (res: BaseResponseModel) => {
        console.log("res.data", res.data)
        this.programsList = res.data as IprogramsModel[];

        console.log("Programs List : ", this.programsList);
        this.getProgramIdToProgramDetails(this.programsList[0] || null);

      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }

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
}
