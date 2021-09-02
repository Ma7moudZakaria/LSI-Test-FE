/* tslint:disable */
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {DateFormatterService} from 'ngx-hijri-gregorian-datepicker';
import {BaseSelectedDateModel} from '../../../../core/ng-model/base-selected-date-model';
import {AdminTeacherTabFilterModel} from '../../../../core/interfaces/teacher-interfaces/admin-teacher-tab-filter-model';
import {AdminTeacherTabService} from '../../../../core/services/admin-teacher-tab-services/admin-teacher-tab.service';
import {BaseResponseModel} from '../../../../core/ng-model/base-response-model';
import {IAdminTeacherTabModel} from '../../../../core/interfaces/teacher-interfaces/iadmin-teacher-tab-model';
import {LanguageEnum} from '../../../../core/enums/language-enum.enum';
import {ITeacherStudentViewModel} from '../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';

@Component({
  selector: 'app-admin-teacher-list',
  templateUrl: './admin-teacher-list.component.html',
  styleUrls: ['./admin-teacher-list.component.scss']
})
export class AdminTeacherListComponent implements OnInit {
  @Output() userId = new EventEmitter<ITeacherStudentViewModel>();
  advancedSearch: boolean = true;
  starsSelected = 0;
  maxGregDate = this.dateFormatterService.GetTodayGregorian()
  datafromBinding: any
  dataToBinding: any
  langEnum = LanguageEnum;
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  selectedDateType: any;
  hijri: boolean = false;
  milady: boolean = false;
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedIndex = 0;
  teachersList :IAdminTeacherTabModel[] =[];
  teacherListFilterRequestModel: AdminTeacherTabFilterModel = { techName: '' };
  errorMessage?: string;
  constructor(
    public translate: TranslateService,
    private dateFormatterService: DateFormatterService,
    private adminTeacherTabService :AdminTeacherTabService

  ) { }

  ngOnInit(): void {
    this.getAllTeachersList()
  }



  getAllTeachersList(){
     this.adminTeacherTabService.getTeacherManagement(this.teacherListFilterRequestModel || {}).subscribe(res=>{
         var response = <BaseResponseModel>res;
         if (response.isSuccess) {
           this.teachersList = res.data as IAdminTeacherTabModel[];
           let firstId=  this.teachersList[0].usrId;
           let UserModel:ITeacherStudentViewModel ={progName : '',usrId:firstId};
           this.userId.emit(UserModel);
           // this.totalCount = this.teacherProgramSubscriptionList.length > 0 ? this.teacherProgramSubscriptionList[0].totalRows : 0;
           this.teachersList?.forEach(function (item) {
             // item.requestDate = item.requestDate ? new Date(item.requestDate).toDateString(): '';
           });

         }
         else {
           this.errorMessage = response.message;
         }
       },
       error => {
         console.log(error);
       });
     }

  ToggelAdvancSearch() {
    this.advancedSearch = !this.advancedSearch
  }
  loadProgramMaterial(id?:string) {
    let UserModel:ITeacherStudentViewModel ={progName : '',usrId:id};
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
