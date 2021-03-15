import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quesion-bank-view',
  templateUrl: './quesion-bank-view.component.html',
  styleUrls: ['./quesion-bank-view.component.scss']
})
export class QuesionBankViewComponent implements OnInit {
  selectedQuestionId:string | undefined;
  selectedCategoryId:string|undefined;
  @Input() isViewAdd?:boolean; 
  showAddQuestionForm = false;
  submitSuccess:any;
  constructor(public translate: TranslateService) {
   }

  ngOnInit(): void {
  }

  addNew(){
    this.selectedQuestionId = '';
  }
  loadSelectedQuesion(event:any){
   this.selectedQuestionId = event;
   this.showAddQuestionForm =true;
  }

  setSelectedCategory(event:any){
    this.selectedCategoryId = event;
  }
  closeAddQuestionForm(){
    this.showAddQuestionForm = false;
  }
  closeAddQuestionFormAfterSave(event:any){
    this.submitSuccess = event; 
    this.showAddQuestionForm = !event;

  }

}
