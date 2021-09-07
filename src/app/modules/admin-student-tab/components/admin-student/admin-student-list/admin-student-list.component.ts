import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAdminStudentTabFilterRequest } from 'src/app/core/interfaces/student-interfaces/iadmin-student-tab-filter-request';
import { IAdminStudentTabFilterResponse } from 'src/app/core/interfaces/student-interfaces/iadmin-student-tab-filter-response';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { BaseSelectedDateModel } from 'src/app/core/ng-model/base-selected-date-model';
import { AdminStudentTabService } from 'src/app/core/services/admin-student-tab-services/admin-student-tab.service';

@Component({
  selector: 'app-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss']
})
export class AdminStudentListComponent implements OnInit {
  @Output() userId = new EventEmitter<ITeacherStudentViewModel>();

  advancedSearch: boolean = false;
  starsSelected = 4.5;
  maxGregDate = this.dateFormatterService.GetTodayGregorian()
  typeDateBinding: any
  datafromBinding: any
  dataToBinding: any
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  hijri: boolean = false;
  milady: boolean = false;
  // cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedIndex = 0;
  studentListFilterRequestModel: IAdminStudentTabFilterRequest = { studName: '' }
  studentList: IAdminStudentTabFilterResponse[] = [];
  errorMessage?: string;
  langEnum = LanguageEnum;

  constructor(
    public translate: TranslateService,
    private dateFormatterService: DateFormatterService,
    private adminStudentTabService: AdminStudentTabService

  ) { }

  ngOnInit(): void {
    this.getAllStudentList()

  }

  getAllStudentList() {
    this.adminStudentTabService.getStudentManagement(this.studentListFilterRequestModel || {}).subscribe(res => {

      if (res.isSuccess) {
        console.log("res", res)
        this.studentList = res.data as IAdminStudentTabFilterResponse[];
        let firstId = this.studentList[0].usrId;
        console.log("firstId", firstId)
        let UserModel: ITeacherStudentViewModel = { progName: '', usrId: firstId };
        this.userId.emit(UserModel);
        // this.teachersList?.forEach(function (item) {
        // });

      }
      else {
        this.errorMessage = res.message;
      }
    },
      error => {
        console.log(error);
      });
  }





  ToggelAdvancSearch() {
    this.advancedSearch = !this.advancedSearch
  }
  loadProgramMaterial(id?: string) {
    let UserModel: ITeacherStudentViewModel = { progName: '', usrId: id };
    this.userId.emit(UserModel);

  }
  submitSearch() { }
  resetSearch() { }
  SendDatafrom(data: any) {
    //
    // // console.log("data 777sent", data)
    // this.typeDateBinding = data.selectedDateType
    // data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // // console.log("Hijri date", data.date)
    // this.datafromBinding = data.selectedDateValue
    // this.teacherFilterAdvancedSearch.fromDate = this.datafromBinding
    // this.selectedDateType = data.selectedDateType;
    // // console.log("this.selectedDateType",this.selectedDateType);
    // // this.filter.fromDate?.setDate(data.selectedDateValue);

  }
  SendDataTo(data: any) {
    // // console.log("data 777sent", data)
    // this.typeDateBinding = data.selectedDateType
    // data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    // // console.log("Hijri date", data.date)
    // this.dataToBinding = data.selectedDateValue
    // this.teacherFilterAdvancedSearch.toDate = this.dataToBinding
    // this.selectedDateType = data.selectedDateType;
    // // console.log("this.selectedDateType",this.selectedDateType);
    // // this.filter.toDate?.setDate(data.selectedDateValue);

  }

}
