import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IAvailableStudentRequest } from 'src/app/core/interfaces/calls/iavailable-student-request';
import { IAvailableStudentResponse } from 'src/app/core/interfaces/calls/iavailable-student-response';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AvailableStudentService } from 'src/app/core/services/calls/available-student.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IProgramDayTaskTasmea } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-tasmea';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';

@Component({
  selector: 'app-program-day-task-recitation-students',
  templateUrl: './program-day-task-recitation-students.component.html',
  styleUrls: ['./program-day-task-recitation-students.component.scss']
})
export class ProgramDayTaskRecitationStudentsComponent implements OnInit {
  @Input() recitationStudentsModel: IProgramDayTaskTasmea = {};
  @Input() isView: boolean = false;
  @Input() dutyDaysTaskViewMood: number = ProgramDutyDaysTaskViewMoodEnum.admin;
  programDutyDaysTaskViewMoodEnum = ProgramDutyDaysTaskViewMoodEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['SARD_TYPES'];
  resultMessage: BaseMessageModel = {};
  filterAvailableStudent: IAvailableStudentRequest = { skip: 0, take: 9, page: 1 };
  availableStudentResponseList: IAvailableStudentResponse[] = [];
  totalCount = 0;
  numberItemsPerRow = 3;
  fileUploadModel: IFileUpload[] = [];
  fileList?: IAttachment[] = [];

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private availableStudent: AvailableStudentService,
    private alertify: AlertifyService,
    private lookupService: LookupService,
    private programDayTasksService: ProgramDayTasksService,) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.getAllMemorize();
    this.getAllAvailableStudent();
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

  getAllAvailableStudent() {
    this.filterAvailableStudent = {
      batId: this.route.snapshot.params.batch,
      studName: "",
      skip: 0,
      take: 2147483647,
      page: 1

    };
    this.availableStudent.getAllAvailableStudent(this.filterAvailableStudent || {}).subscribe(
      res => {
        if (res.isSuccess) {
          this.availableStudentResponseList = res.data as IAvailableStudentResponse[];
          this.totalCount = res.count ? res.count : 0;
        }
        else {
          this.alertify.error(res.message || '');
        }
      }, error => {

      })
  }

  availableStudentChangePage(event: IAvailableStudentRequest) {
    this.filterAvailableStudent = event;
    this.getAllAvailableStudent();
  }
  filterByNameSearchKey(searchKey: string) {
    this.filterAvailableStudent.studName = searchKey;
    this.getAllAvailableStudent();
  }

  getAllMemorize(){
    this.recitationStudentsModel.bookAttatchments = [];
    this.programDayTasksService.getProgramMemorizeAtDay(this.recitationStudentsModel?.dutyDay || '').subscribe(
      (res: any) => {
        res.data as IProgramDayTasksModel
        Array.from(res.data).forEach((elm: any) => {
          let lstBookAttatchments = JSON.parse(elm.detailsTask).bookAttatchments
          if (lstBookAttatchments.length > 0) {
            Array.from(lstBookAttatchments).forEach((item: any) => { this.fileList?.push(item as IAttachment); })
          }
          else { this.fileList?.push(elm as IAttachment); }
        })
        this.recitationStudentsModel.bookAttatchments = this.fileList;
      }
      , error => {
        this.recitationStudentsModel.bookAttatchments = [];
      }
    );

  }


}
