import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {
  programs: any;
   @Output() selectedProgram =  new EventEmitter<IprogramsModel>();
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};

  constructor(private scientifcMaterialService: ScientificMaterialService,public translate : TranslateService) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(programName?:any) {
    this.scientifcMaterialService.getProgramsLookup(programName).subscribe(
      (res: BaseResponseModel) => {
        this.programs = res.data as IprogramsModel[];
      this.loadProgramMaterial({})
     this.selectedIndex=-1;
      }, error => {        
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    );
  }
  selectedIndex=-1;
  loadProgramMaterial(program?:IprogramsModel){
    this.selectedProgram?.emit(program);
  } 
}
