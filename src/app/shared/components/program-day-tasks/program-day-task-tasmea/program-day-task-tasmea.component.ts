import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDayTaskRecitationType } from 'src/app/core/enums/program-day-task-recitation-type.enum';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IAvailableTeacher } from 'src/app/core/interfaces/calls/iavailable-teacher';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IRecitationTimes } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AvailableTeachersService } from 'src/app/core/services/calls/available-teachers.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-program-day-task-tasmea',
  templateUrl: './program-day-task-tasmea.component.html',
  styleUrls: ['./program-day-task-tasmea.component.scss']
})
export class ProgramDayTaskTasmeaComponent implements OnInit {

  @Input() tasmeaModel: IProgramBasicInfoDetails = {};
  @Input() isView: boolean = false;
  @Input() dutyDaysTaskViewMood: number = ProgramDutyDaysTaskViewMoodEnum.admin;
  programDutyDaysTaskViewMoodEnum = ProgramDutyDaysTaskViewMoodEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['SARD_TYPES'];
  resultMessage: BaseMessageModel = {};

  progRecitationTimes: IRecitationTimes[] = [];

  filterAvailableTeacher: IAvailableTeacher = { skip: 0, take: 9 };
  availableTeacherList: IAvailableTeacher[] = [];
  constructor(
    public translate: TranslateService,
    private lookupService: LookupService,
    private alertify: AlertifyService,
    private availableTeacher: AvailableTeachersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.progRecitationTimes = this.tasmeaModel?.prgRecitTms ?
      this.tasmeaModel?.prgRecitTms.filter(i => i.huffno !== ProgramDayTaskRecitationType.limited).map((item: any) => ({ progRecFrom: item.recitFrom, progRecTo: item.recitTo })) : [];
    this.getAllAvailableTeacher()
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

  getAllAvailableTeacher() {
    this.filterAvailableTeacher = {
      batId: this.route.snapshot.params.batch,
      techName: "",
      skip: 0,
      take: 2147483647

    };
    this.availableTeacher.getAllAvailableTeacher(this.filterAvailableTeacher || {}).subscribe(
      res => {

        if (res.isSuccess) {
          this.availableTeacherList = res.data;
        }
        else {
          this.alertify.error(res.message || '');
        }
      }, error => {

      })
  }


}
