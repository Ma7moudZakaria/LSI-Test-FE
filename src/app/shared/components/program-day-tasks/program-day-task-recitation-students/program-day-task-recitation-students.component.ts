import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDayTaskRecitationType } from 'src/app/core/enums/program-day-task-recitation-type.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IRecitationTimes } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-program-day-task-recitation-students',
  templateUrl: './program-day-task-recitation-students.component.html',
  styleUrls: ['./program-day-task-recitation-students.component.scss']
})
export class ProgramDayTaskRecitationStudentsComponent implements OnInit {
  @Input() recitationStudentsModel: IProgramBasicInfoDetails = {};
  @Input() isView: boolean = false;

  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['SARD_TYPES'];
  resultMessage: BaseMessageModel = {};
  progRecitationTimes: IRecitationTimes[] = [];
  constructor(
    public translate: TranslateService,
    private lookupService: LookupService) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.progRecitationTimes = this.recitationStudentsModel?.prgRecitTms ?
      this.recitationStudentsModel?.prgRecitTms.filter(i => i.huffno !== ProgramDayTaskRecitationType.limited).map((item: any) => ({ progRecFrom: item.recitFrom, progRecTo: item.recitTo })) : [];

  }
  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookup).subscribe(res => {
      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
      }
      else {
        this.resultMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    });
  }

}
