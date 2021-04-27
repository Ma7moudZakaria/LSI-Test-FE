import { Observable } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

  selectedDateType_Melady = DateType.Gregorian;  // or DateType.Gregorian
  selectedDateType_Hijri = DateType.Hijri;

  dateFromString: string = '';
  maxGreg!: NgbDateStruct;
  maxHijri!: NgbDateStruct;

  isSubmit = false;
  GregLabel = 'ميلادي';
  hijriLabel = 'هجري';

  @Input() hijri: boolean = false;
  @Input() milady: boolean = false;

  @Output() sendDate = new EventEmitter;

  //  @Input() item: { title: string, state: boolean };
  constructor() { }

  ngOnInit(): void {
  }


  emitData(data: any) {
    console.log(data)
    this.sendDate.emit(data)
  }



}

