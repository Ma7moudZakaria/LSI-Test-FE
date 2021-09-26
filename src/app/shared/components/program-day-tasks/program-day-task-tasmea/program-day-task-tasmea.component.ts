import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IAvailableTeacher } from 'src/app/core/interfaces/calls/iavailable-teacher';
import { IAvailableTeacherResonse } from 'src/app/core/interfaces/calls/iavailable-teacher-resonse';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IRecitationTimes } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDayTaskTasmea } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-tasmea';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AvailableTeachersService } from 'src/app/core/services/calls/available-teachers.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-program-day-task-tasmea',
  templateUrl: './program-day-task-tasmea.component.html',
  styleUrls: ['./program-day-task-tasmea.component.scss']
})
export class ProgramDayTaskTasmeaComponent implements OnInit {
  @Input() tasmeaModel: IProgramDayTaskTasmea = {};
  @Input() isView: boolean = false;
  @Input() dutyDaysTaskViewMood: number = ProgramDutyDaysTaskViewMoodEnum.admin;
  programDutyDaysTaskViewMoodEnum = ProgramDutyDaysTaskViewMoodEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['SARD_TYPES'];
  resultMessage: BaseMessageModel = {};
  numberItemsPerRow = 2;
  progRecitationTimes: IRecitationTimes[] = [];
  filterAvailableTeacher: IAvailableTeacher = { skip: 0, take: 9, page: 1 };
  availableTeachersList: IAvailableTeacherResonse[] = [];
  totalCount = 0;
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];

  constructor(
    public translate: TranslateService,
    private lookupService: LookupService,
    private alertify: AlertifyService,
    private availableTeacher: AvailableTeachersService,
    private route: ActivatedRoute,
    private programDayTasksService: ProgramDayTasksService,
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.getAllMemorize();
    this.getAllAvailableTeacher();
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
      take: 2147483647,
      page: 1

    };
    this.availableTeacher.getAllAvailableTeacher(this.filterAvailableTeacher || {}).subscribe(
      res => {
        if (res.isSuccess) {
          this.availableTeachersList = res.data;
          this.totalCount = res.count ? res.count : 0;
        }
        else {
          this.alertify.error(res.message || '');
        }
      }, error => {

      })
  }

  availableTeachersChangePage(event: IAvailableTeacher) {
    this.filterAvailableTeacher = event;
    this.getAllAvailableTeacher();
  }
  filterByNameSearchKey(searchKey: string) {
    this.filterAvailableTeacher.techName = searchKey;
    this.getAllAvailableTeacher();
  }

  getAllMemorize(){
    this.programDayTasksService.getProgramMemorizeAtDay(this.tasmeaModel?.dutyDay || '').subscribe(
      (res: any) => {
        res.data as IProgramDayTasksModel
        Array.from(res.data).forEach((elm: any) => {
          let lstBookAttatchments = JSON.parse(elm.detailsTask).bookAttatchments
          if (lstBookAttatchments.length > 0) {
            Array.from(lstBookAttatchments).forEach((item: any) => { this.fileList?.push(item as IAttachment); })
          }
          else { this.fileList?.push(elm as IAttachment); }
        })
        this.tasmeaModel.bookAttatchments = this.fileList;
      }
      , error => {
        this.tasmeaModel.bookAttatchments = [];
      }
    );

  }
}