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
  selectedIndex=0;
  count= [0,1,2,3,4,5,6,7,8,9];
  constructor(private scientifcMaterialService: ScientificMaterialService,public translate : TranslateService) { }

  ngOnInit(): void {


  }




}
