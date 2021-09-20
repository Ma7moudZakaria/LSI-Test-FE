import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDayTaskRecitationType } from 'src/app/core/enums/program-day-task-recitation-type.enum';
import { ProgramDutyDaysTaskViewMoodEnum } from 'src/app/core/enums/programs/program-duty-days-task-view-mood-enum.enum';
import { IAvailableTeacher } from 'src/app/core/interfaces/calls/iavailable-teacher';
import { IAvailableTeacherResonse } from 'src/app/core/interfaces/calls/iavailable-teacher-resonse';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IRecitationTimes } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { AvailableTeachersService } from 'src/app/core/services/calls/available-teachers.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { StudentProgramVacationServicesService } from 'src/app/core/services/student-program-vacation-services/student-program-vacation-services.service';

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
  numberItemsPerRow = 2;
  progRecitationTimes: IRecitationTimes[] = [];

  filterAvailableTeacher: IAvailableTeacher = { skip: 0, take: 9, page: 1 };
  availableTeachersList: IAvailableTeacherResonse[] = [];
  totalCount = 0;


  constructor(
    public translate: TranslateService,
    private lookupService: LookupService,
    private alertify: AlertifyService,
    private availableTeacher: AvailableTeachersService,
    private route: ActivatedRoute,
    private programVacationServicesService: StudentProgramVacationServicesService
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.progRecitationTimes = this.tasmeaModel?.prgRecitTms ?
      this.tasmeaModel?.prgRecitTms.filter(i => i.huffno !== ProgramDayTaskRecitationType.limited).map((item: any) => ({ progRecFrom: item.recitFrom, progRecTo: item.recitTo })) : [];
    // this.getStudentProgramVacationRequestsStudentView()
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

  // availableTeachersListTest: IAvailableTeacherResonse[] = [
  //   { "techId": "3ef77604-4d16-48bb-b143-e07189c132d8", "usrId": "2e249860-f4ab-422e-9303-a9f3f8b8e7e2", "avr": 'null', "techNameAr": "نرمين  زكريا السيد", "techNameEn": "  ", "rte": 0 },
  //   { "techId": "3ef77604-4d16-48bb-b143-e07189c132d8", "usrId": "2e249860-f4ab-422e-9303-a9f3f8b8e7e2", "avr": 'null', "techNameAr": "نرمين  زكريا السيد", "techNameEn": "  ", "rte": 0 },
  //   { "techId": "3ef77604-4d16-48bb-b143-e07189c132d8", "usrId": "2e249860-f4ab-422e-9303-a9f3f8b8e7e2", "avr": 'null', "techNameAr": "نرمين  زكريا السيد", "techNameEn": "  ", "rte": 0 }

  // ]

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
}