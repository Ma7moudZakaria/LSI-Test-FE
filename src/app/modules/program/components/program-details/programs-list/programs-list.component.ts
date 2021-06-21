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



@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {

  programsList :IprogramsModel[]=[];
  programDetails = {} as IprogramsModel;
  programsbyAdvancedFilter :IProgramFilterAdvancedRequest= {skip:0, take:2147483647};
 
  @Output() selectedProgram = new EventEmitter<IprogramsModel>();
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  filterRequest: IProgramFilterAdvancedRequest = {};
  selectedIndex = 0;

  constructor(private scientifcMaterialService: ScientificMaterialService,
    private programService: ProgramService,
    public translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.loadProgramsbyAdvancedFilter() ;
  }

  loadProgramsbyAdvancedFilter() {
    this.programService.getProgramAdvancedFilter(this.programsbyAdvancedFilter).subscribe(
      (res: BaseResponseModel) => {
        this.programsList = res.data as IprogramsModel [];

        console.log("Programs List : " , this.programsList);
        this.getProgramIdToProgramDetails(this.programsList[0] || null);

      }, error => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }

  getProgramIdToProgramDetails(item:IprogramsModel) {
    this.selectedProgram.emit(item);
  }

  addPrgramPage() {
    this.router.navigateByUrl('/program/add-program)');
  }

  filterByNameSearchKey(searchKey:string){
    this.programsbyAdvancedFilter.name = searchKey;
    this.loadProgramsbyAdvancedFilter();
  }
}
