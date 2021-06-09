import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IFeelingsDetailsModel } from 'src/app/core/interfaces/feeling-interfaces/ifeelings-details-model';

@Component({
  selector: 'app-card-feelings',
  templateUrl: './card-feelings.component.html',
  styleUrls: ['./card-feelings.component.scss']
})
export class CardFeelingsComponent implements OnInit {

  @Input() FeelingsDetailsModel: IFeelingsDetailsModel = {};
  @Output() deleteFeeling = new EventEmitter<string>();
  @Output() cancelFeeling = new EventEmitter<string>();
  @Output() publishList = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  DeleteFeelingCard() {
    this.deleteFeeling.emit(this.FeelingsDetailsModel.feelId);
  }
  cancelFeelingCard() {
    this.cancelFeeling.emit(this.FeelingsDetailsModel.feelId);

  }
  goPublishList() {
    this.publishList.emit(this.FeelingsDetailsModel.isPub);
  }
}
