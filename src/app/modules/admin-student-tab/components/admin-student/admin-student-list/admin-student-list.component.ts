import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { BaseSelectedDateModel } from 'src/app/core/ng-model/base-selected-date-model';

@Component({
  selector: 'app-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss']
})
export class AdminStudentListComponent implements OnInit {
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
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedIndex = 0;

  constructor(
    public translate: TranslateService,
    private dateFormatterService: DateFormatterService

  ) { }

  ngOnInit(): void {
  }

  ToggelAdvancSearch() {
    this.advancedSearch = !this.advancedSearch
  }
  loadProgramMaterial() { }
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
