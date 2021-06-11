import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Input() isPub:boolean = false;;

  constructor() { }

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
}
