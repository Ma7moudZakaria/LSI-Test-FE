import { Observable } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DateFormatterService, DateType } from 'ngx-hijri-gregorian-datepicker';
import { NgbModal, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
@Component({
  selector: 'app-milady-hijri-calendar',
  templateUrl: './milady-hijri-calendar.component.html',
  styleUrls: ['./milady-hijri-calendar.component.scss'],
})
export class MiladyHijriCalendarComponent implements OnInit {

  // dateFrom!: NgbDateStruct;
  @Input() dateTo!: NgbDateStruct;

  selectedDateType_Melady = DateType.Gregorian;  // or DateType.Gregorian
  selectedDateType_Hijri = DateType.Hijri;

  dateFromString: string = '';
  maxGreg!: NgbDateStruct;
  maxHijri!: NgbDateStruct;
  // minHijri!: NgbDateStruct;

  isSubmit = false;
  GregLabel = 'ميلادي';
  hijriLabel = 'هجري';

  @Input() hijri: boolean = false;
  @Input() milady: boolean = false;

  @Output() sendDate = new EventEmitter;

  //  @Input() item: { title: string, state: boolean };
  constructor(public translate: TranslateService , public languageService: LanguageService,
    private dateFormatterService: DateFormatterService) { }

  ngOnInit(): void {
    // this.minHijri = Date.now() || 2020;
    this.setCurrentLang();
    this.setHijri();
  }

  setHijri() {
    // this.selectedDateType = DateType.Hijri;
    this.maxHijri = this.dateFormatterService.GetTodayHijri();
    console.log(this.maxHijri);
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
    console.log(data)
    // let DateNow = Date.now();

    // // let YearDate = DateNow.toString("yyyy mm dd");

    // if(data > DateNow){
    //   this.sendDate.emit(data)      
    // }
    

    this.sendDate.emit(data)
  }



}

