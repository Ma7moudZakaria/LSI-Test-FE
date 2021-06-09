import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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



@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {

  programsList :IprogramsModel[]=[];
  programsbyAdvancedFilter :IProgramFilterAdvancedRequest= {};

  @Output() selectedProgram = new EventEmitter<IprogramsModel>();
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  filterRequest: IProgramFilterAdvancedRequest = {};

  constructor(private scientifcMaterialService: ScientificMaterialService,
    private programService: ProgramService,
    public translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.loadPrograms();
    this.programsbyAdvancedFilter = {
      // name:null,
      // dura:0,
      // typeList: ["","",""],
      // isTest: false,
      // PageNumber: 0,
      // PageSize: 7199254740992,
    }

    this.loadProgramsbyAdvancedFilter( this.programsbyAdvancedFilter ) ;
  }

  loadProgramsbyAdvancedFilter(ProgramsbyAdvancedFilter: IProgramFilterAdvancedRequest) {
    // if (filterRequest != null || filterRequest != "" || filterRequest != {})
    //   this.programService.getProgramAdvancedFilter(filterRequest.name);

    this.programService.getProgramAdvancedFilter(ProgramsbyAdvancedFilter).subscribe(
      (res: BaseResponseModel) => {
        this.programsList = res.data as IprogramsModel [];
      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }

  // loadPrograms(programName?: any) {
  //   this.scientifcMaterialService.getProgramsLookup(programName).subscribe(
  //     (res: BaseResponseModel) => {
  //       this.programsList = res.data as IprogramsModel[];
  //       this.selectedIndex = -1;
  //     }, error => {
  //       this.resMessage = {
  //         message: error,
  //         type: BaseConstantModel.DANGER_TYPE
  //       }
  //     }
  //   );
  // }

  selectedIndex = -1;

  addPrgramPage() {
    this.router.navigateByUrl('/program/add-program)');
  }
}
