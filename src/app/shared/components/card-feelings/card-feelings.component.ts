import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IFeelingsDetailsModel } from 'src/app/core/interfaces/feeling-interfaces/ifeelings-details-model';

@Component({
  selector: 'app-card-feelings',
  templateUrl: './card-feelings.component.html',
  styleUrls: ['./card-feelings.component.scss']
})
export class CardFeelingsComponent implements OnInit {

  @Input() feelingsDetailsModel: IFeelingsDetailsModel | undefined ;
  @Output() deleteFeeling = new EventEmitter<IFeelingsDetailsModel>();
  @Output() cancelFeeling = new EventEmitter<IFeelingsDetailsModel>();
  @Output() approveCancelFeeling = new EventEmitter<IFeelingsDetailsModel>();
  @Output() swapUpEvent = new EventEmitter<IFeelingsDetailsModel>();
  @Output() swapDownEvent = new EventEmitter<IFeelingsDetailsModel>();

  langEnum = LanguageEnum

  @Input() isPub:boolean = false;;

  constructor(public translate: TranslateService ) { }

  ngOnInit(): void {
  }

  deleteFeelingCard() {
    this.deleteFeeling.emit(this.feelingsDetailsModel);
  }

  cancelFeelingItem() {
    this.cancelFeeling.emit(this.feelingsDetailsModel);
  }

  publishFeelingItem() {
    this.approveCancelFeeling.emit(this.feelingsDetailsModel);
  }

  swapUp(){
    this.swapUpEvent.emit(this.feelingsDetailsModel);
  }

  swapDown(){
    this.swapDownEvent.emit(this.feelingsDetailsModel);
  }
}
