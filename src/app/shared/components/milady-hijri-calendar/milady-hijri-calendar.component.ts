import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { DateType } from 'ngx-hijri-gregorian-datepicker';
import { NgbModal, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-milady-hijri-calendar',
  templateUrl: './milady-hijri-calendar.component.html',
  styleUrls: ['./milady-hijri-calendar.component.scss'],
})
export class MiladyHijriCalendarComponent implements OnInit {

  dateFrom!: NgbDateStruct;
  dateTo!: NgbDateStruct;

  selectedDateType = DateType.Gregorian;  // or DateType.Gregorian
  selectedDateType_Hijri = DateType.Hijri;  // or DateType.Gregorian

  dateFromString: string = '';
  maxGreg!: NgbDateStruct;
  maxHijri!: NgbDateStruct;

  isSubmit = false;
  GregLabel = 'ميلادي';
  hijriLabel = 'هجري';

  @Input() hijri: boolean = false;
  @Input() milady: boolean = false;

  //  @Input() item: { title: string, state: boolean };
  constructor() { }

  ngOnInit(): void {
  }





}

