import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quesion-bank-view',
  templateUrl: './quesion-bank-view.component.html',
  styleUrls: ['./quesion-bank-view.component.scss']
})
export class QuesionBankViewComponent implements OnInit {
  selectedQuestionId:string | undefined;
  selectedCategoryId:any;
  showAddQuiestion?:boolean=false;
  @Input() isViewAdd?:boolean; 
  valueLang = "nameAr";
  showAddQuestionForm = false;
  submitSuccess:any;
  constructor(public translate: TranslateService) {
    this.valueLang = this.translate.currentLang == 'en-US' ? 'nameEn' : 'nameAr';
   }

  ngOnInit(): void {
  }

  addNew(){
    this.selectedQuestionId = '';
    this.showAddQuiestion=true;
  }
  loadSelectedQuesion(event:any){
   this.selectedQuestionId = event.id;
   this.showAddQuiestion= event.show;
   this.showAddQuestionForm =true;
   // console.log(event);
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
