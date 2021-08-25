import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DateFormatterService, DateType} from 'ngx-hijri-gregorian-datepicker';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from 'src/app/core/enums/language-enum.enum';
import {LanguageService} from 'src/app/core/services/language-services/language.service';
import {BaseSelectedDateModel} from '../../../core/ng-model/base-selected-date-model';

@Component({
  selector: 'app-milady-hijri-calendar',
  templateUrl: './milady-hijri-calendar.component.html',
  styleUrls: ['./milady-hijri-calendar.component.scss'],
})
export class MiladyHijriCalendarComponent implements OnInit {

  @ViewChild('hijGeo') hijGeoChildComp: any | undefined; //any instead ElementReg to can access property
  // dateFrom!: NgbDateStruct;
  @Input() dateTo!: NgbDateStruct;

  selectedDateType_Melady = DateType.Gregorian;  // or DateType.Gregorian
  selectedDateType_Hijri = DateType.Hijri;
  calenderType:any;
  dateFromString: string = '';
  // maxGreg!: NgbDateStruct;
  // maxHijri!: NgbDateStruct;
  // minHijri!: NgbDateStruct;

  isSubmit = false;
  GregLabel = 'ميلادي';
  hijriLabel = 'هجري';

  @Input() hijri: boolean = false;
  @Input() milady: boolean = false;
  @Input() maxHijri: any ;
  @Input() maxGreg: any ;
  @Input() minHijri: any ;
  @Input() minGreg: any ;
  @Output() sendDate = new EventEmitter;
  @Input() vacationStartDate: any ;


  dataSend : BaseSelectedDateModel = new BaseSelectedDateModel();
  //  @Input() item: { title: string, state: boolean };
  @Input() editcalenderType: any;
  constructor(public translate: TranslateService , public languageService: LanguageService,
    private dateFormatterService: DateFormatterService) {

  }

  ngOnInit(): void {
    // this.minHijri = Date.now() || 2020;
    this.setCurrentLang();
    // this.setHijri();
    if (this.editcalenderType){
      this.calenderType = this.editcalenderType.selectedDateType;
      console.log("this.calenderType",this.editcalenderType);
    }

  }

  setHijri() {
    // this.selectedDateType = DateType.Hijri;
    // toDayHijriDate.day=toDayHijriDate.day - 4 ;
    this.maxHijri = this.dateFormatterService.GetTodayHijri();
    this.minHijri = this.dateFormatterService.GetTodayHijri();
    console.log("this.maxHijri",this.maxHijri);
  }

  setCurrentLang() {
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.changeHijri();
    });
  }

  changeHijri() {
    if (this.translate.currentLang === LanguageEnum.en) {
      this.GregLabel = 'Melady';
      this.hijriLabel = 'Hijri';
    }
    else{
      this.GregLabel = 'ميلادي';
      this.hijriLabel = 'هجري';
    }
  }

  emitData(data: any) {
    // console.log(this.hijGeoChildComp.selectedDateType);
    // let DateNow = Date.now();

    // // let YearDate = DateNow.toString("yyyy mm dd");

    // if(data > DateNow){
    //   this.sendDate.emit(data)
    // }
    this.dataSend.selectedDateValue = data;
    this.dataSend.selectedDateType = this.hijGeoChildComp.selectedDateType;
   // this.dataSend.selectedDateType == 1? this.dataSend.calendarType = this.selectedDateType_Hijri : this.dataSend.calendarType = this.selectedDateType_Melady;
   //  console.log("this.dataSend", this.dataSend)
    this.sendDate.emit(this.dataSend)
  }
}

