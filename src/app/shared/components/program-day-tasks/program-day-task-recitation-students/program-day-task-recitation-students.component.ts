import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDayTaskRecitationType } from 'src/app/core/enums/program-day-task-recitation-type.enum';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IAvailableStudentRequest } from 'src/app/core/interfaces/calls/iavailable-student-request';
import { IAvailableStudentResponse } from 'src/app/core/interfaces/calls/iavailable-student-response';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IRecitationTimes } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AvailableStudentService } from 'src/app/core/services/calls/available-student.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-program-day-task-recitation-students',
  templateUrl: './program-day-task-recitation-students.component.html',
  styleUrls: ['./program-day-task-recitation-students.component.scss']
})
export class ProgramDayTaskRecitationStudentsComponent implements OnInit {
  @Input() recitationStudentsModel: IProgramBasicInfoDetails = {};
  @Input() isView: boolean = false;
  @Input() dutyDaysTaskViewMood: number = ProgramDutyDaysTaskViewMoodEnum.admin;
  programDutyDaysTaskViewMoodEnum = ProgramDutyDaysTaskViewMoodEnum;
  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['SARD_TYPES'];
  resultMessage: BaseMessageModel = {};
  progRecitationTimes: IRecitationTimes[] = [];
  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private availableStudent: AvailableStudentService,
    private alertify: AlertifyService,
    private lookupService: LookupService) { }

  filterAvailableStudent: IAvailableStudentRequest = { skip: 0, take: 9, page: 1 };
  availableStudentResponseList: IAvailableStudentResponse[] = [];
  totalCount = 0;
  numberItemsPerRow = 3;

  ngOnInit(): void {
    this.getLookupByKey();
    this.progRecitationTimes = this.recitationStudentsModel?.prgRecitTms ?
      this.recitationStudentsModel?.prgRecitTms.filter(i => i.huffno !== ProgramDayTaskRecitationType.limited).map((item: any) => ({ progRecFrom: item.recitFrom, progRecTo: item.recitTo })) : [];
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










}
