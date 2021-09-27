import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProgramDayTaskTasmea } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-tasmea';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-student-recitation-call',
  templateUrl: './student-recitation-call.component.html',
  styleUrls: ['./student-recitation-call.component.scss']
})
export class StudentRecitationCallComponent implements OnInit {
  @Input() tasmeaModel :IProgramDayTaskTasmea={};
  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['SARD_TYPES'];
  resultMessage: BaseMessageModel = {};
  
  constructor(
    public translate: TranslateService,
    private lookupService: LookupService,
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
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
