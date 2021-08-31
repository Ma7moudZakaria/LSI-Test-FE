import {Component, OnInit,EventEmitter, Output} from '@angular/core';
import {IprogramsModel} from '../../../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseMessageModel} from '../../../../../../core/ng-model/base-message-model';
import {LanguageEnum} from '../../../../../../core/enums/language-enum.enum';
import {IProgramFilterByNameRequest} from '../../../../../../core/interfaces/programs-interfaces/iprogram-filter-requests';
import {ScientificMaterialService} from '../../../../../../core/services/scientific-material-services/scientific-material.service';
import {TranslateService} from '@ngx-translate/core';
import {BaseResponseModel} from '../../../../../../core/ng-model/base-response-model';
import {BaseConstantModel} from '../../../../../../core/ng-model/base-constant-model';

@Component({
  selector: 'app-admin-teacher-program-list',
  templateUrl: './admin-teacher-program-list.component.html',
  styleUrls: ['./admin-teacher-program-list.component.scss']
})
export class AdminTeacherProgramListComponent implements OnInit {
  programs: any;
  @Output() selectedProgram =  new EventEmitter<IprogramsModel>();
  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  programFilterByName: IProgramFilterByNameRequest = {};

  constructor(private scientifcMaterialService: ScientificMaterialService,public translate : TranslateService) { }

  ngOnInit(): void {
    this.loadPrograms();

  }

  loadPrograms(programName?: any) {
    if (programName != null || programName != "") { this.programFilterByName.name = programName; }
    else{this.programFilterByName.name="";}
    this.programFilterByName.skip = 0;
    this.programFilterByName.take = 2147483647;
    this.scientifcMaterialService.getProgramsLookup(this.programFilterByName).subscribe(
      (res: BaseResponseModel) => {
        this.programs = res.data as IprogramsModel[];
        console.log("programs" , this.programs);
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
